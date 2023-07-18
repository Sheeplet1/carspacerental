from bson import ObjectId
from ..tests import conftest
from .. import helpers

def test_successful_pay(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/pay' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and payment is processed
    """
    # register user one and insert listing into mock_db
    user_stub = conftest.USER_STUB.copy()
    user_stub['listings'] = [conftest.TEST_LID]
    
    mock_db['UserAccount'].insert_one(user_stub)
    mock_db['Listings'].insert_one(conftest.LISTING_STUB.copy())
    
    # create booking
    booking_stub = helpers.parse_json(conftest.BOOKING_STUB.copy())
    resp = client.post('/listings/book', headers=user_token, json=booking_stub)
    assert resp.status_code == conftest.OK
    
    # payee is user_token and post payment
    b_id = mock_db['Bookings'].find_one()['_id']
    resp = client.post('/pay', headers=user_token, json={'booking_id': b_id})
    assert resp.status_code == conftest.OK
    
    # assert payment went through and revenue in UserAccount & BankAccount is updated
    user_acc = mock_db['UserAccount'].find_one({'_id': ObjectId(user_stub['_id'])})
    
    assert user_acc['revenue'] == 85
    assert mock_db['BankAccount'].find_one()['balance'] == 15
    
def test_missing_booking_id(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/pay' is posted to with an invalid booking id (POST)
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    resp = client.post('/pay', headers=user_token, json={'none': 'none'})
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Valid booking id is required'
    }
    
def test_incorrect_user_paying(client, user_token, mock_db):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/pay' is posted to with the wrong user paying (POST)
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    # register user one and insert listing into mock_db
    user_stub = conftest.USER_STUB.copy()
    user_stub['listings'] = [conftest.TEST_LID]
    
    mock_db['UserAccount'].insert_one(user_stub)
    mock_db['Listings'].insert_one(conftest.LISTING_STUB.copy())
    
    # create booking
    booking_stub = helpers.parse_json(conftest.BOOKING_STUB.copy())
    resp = client.post('/listings/book', headers=user_token, json=booking_stub)
    assert resp.status_code == conftest.OK
    
    # modify booking to change consumer id
    b_id = mock_db['Bookings'].find_one()['_id']
    mock_db['Bookings'].find_one_and_update(
        {'_id': b_id},
        {'$set': { 'consumer': ObjectId() }}
    )
    resp = client.post('/pay', headers=user_token, json={'booking_id': b_id})
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Incorrect user is paying'
    }
