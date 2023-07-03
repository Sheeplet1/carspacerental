from bson import ObjectId
from ..tests import conftest
from .. import helpers

def test_get_invalid(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/bookings/:booking_id' is called with GET with an invalid id
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    resp = client.get('bookings/invalid_id', headers=user_token)
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Invalid booking id'
    }
    
def test_no_exist(client, user_token):
    """
    GIVEN  a Flask application configured for testing
    WHEN the '/bookings/:booking_id' is called with GET with a valid, but not existing id
    THEN check that a '400' (BAD_REQUEST) status code is returend
    """
    resp = client.get(f'bookings/{conftest.TEST_BID}', headers=user_token)
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': "Booking doesn't exist"
    }
    
def test_get_exists(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/bookings/:booking_id' is called with GET
    THEN check that a '200' (OK) status code is returned and the booking is returned
    """
    stub = helpers.parse_json(conftest.BOOKING_STUB.copy())

    resp = client.post('/listings/book', headers=user_token, json=stub)
    assert resp.status_code == conftest.OK
    
    booking = mock_db['Bookings'].find_one({
        '_id': ObjectId(resp.json['booking_id'])
    })
    assert booking
    
def test_put_invalid_user(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/bookings/:booking_id' is called with PUT from the wrong user
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    resp = client.post('/auth/register', json={
        "email": "randomuser@gmail.com",
        "password": conftest.TEST_PW,
        "first_name": conftest.TEST_FIRST_NAME,
        "last_name": conftest.TEST_LAST_NAME,
        "phone_number": conftest.TEST_PN
    })
    alternate_head = {
        "Authorization": "Bearer " + resp.get_json()['token']
    }
    stub = helpers.parse_json(conftest.BOOKING_STUB.copy())
    resp = client.post('listings/book', headers=alternate_head, json=stub)
    booking_id = resp.json['booking_id']
    
    resp = client.put(f'/bookings/{booking_id}', headers=user_token)
    assert resp.status_code == conftest.FORBIDDEN
    
def test_put_valid(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/bookings/:booking_id' is called with PUT
    THEN check that a '200' (OK) status code is returned
    """
    stub = helpers.parse_json(conftest.BOOKING_STUB.copy())
    resp = client.post('listings/book', headers=user_token, json=stub)
    booking_id = resp.json['booking_id']
    
    assert mock_db['Bookings'].find_one()['price'] == 100
    resp = client.put(f'/bookings/{booking_id}', headers=user_token, json={
        'price': float(200)
    })
    assert resp.status_code == conftest.OK
    assert mock_db['Bookings'].find_one()['price'] == 200
    
def test_put_invalid_key(client, user_token):
    stub = helpers.parse_json(conftest.BOOKING_STUB.copy())
    resp = client.post('listings/book', headers=user_token, json=stub)
    booking_id = resp.json['booking_id']
    
    resp = client.put(f'/bookings/{booking_id}', headers=user_token, json={
        'test': 'invalid!'
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Invalid update key' 
    }

def test_put_invalid_value(client, mock_db, user_token):
    stub = helpers.parse_json(conftest.BOOKING_STUB.copy())
    resp = client.post('listings/book', headers=user_token, json=stub)
    booking_id = resp.json['booking_id']
    
    assert mock_db['Bookings'].find_one()['price'] == 100
    resp = client.put(f'/bookings/{booking_id}', headers=user_token, json={
        'price': 200
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Update value has invalid typing'
    }
    
def test_cancel_booking(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/booking' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and the booking is cancelled
    """
    # insert test user, listing and booking into database
    user_stub = conftest.USER_STUB.copy()
    user_stub['listings'] = [conftest.TEST_LID]
            
    mock_db['UserAccount'].insert_one(user_stub)
    mock_db['Listings'].insert_one(conftest.LISTING_STUB.copy())
    stub = helpers.parse_json(conftest.BOOKING_STUB.copy())
    resp = client.post('/listings/book', headers=user_token, json=stub)
    booking_id = resp.json['booking_id']
    
    assert mock_db['UserAccount'].find_one()['bookings'] == [ObjectId(booking_id)]
    assert mock_db['Bookings'].find_one()
    # post response to cancel booking
    response = client.delete(f'/bookings/{booking_id}', headers=user_token, json={
        "booking_id": str(booking_id)
    })
    assert response.status_code == 200
    
    # check its not in user profile, check its not in database
    assert mock_db['Bookings'].find_one() == None
    assert mock_db['UserAccount'].find_one()['bookings'] == []