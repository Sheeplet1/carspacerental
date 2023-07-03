from bson import ObjectId
from ..tests import conftest
from .. import helpers

def test_successful_get(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'profile/completed-bookings' is requested (GET)
    THEN check that a '200' OK status code is returned and info on completed 
         bookings is returned
    """
    # create user
    user_stub = conftest.USER_STUB.copy()
    mock_db['UserAccount'].insert_one(user_stub)
    
    # create 3 bookings and insert into user['bookings']
    base = conftest.BOOKING_STUB.copy()
    booking_stub1 = helpers.parse_json(base)
    resp = client.post('/listings/book', headers=user_token, json=booking_stub1)
    assert resp.status_code == conftest.OK
    
    booking_stub2 = base
    booking_stub2['_id'] = ObjectId()
    booking_stub2['listing_id'] = ObjectId()
    booking_stub2['start_time'] = '2023-01-05T00:00:00'
    booking_stub2['end_time'] = '2023-01-09T00:00:00'
    booking_stub2['price'] = 200
    booking_stub2 = helpers.parse_json(booking_stub2)
    resp = client.post('/listings/book', headers=user_token, json=booking_stub2)
    if resp.status_code == 400:
        print(resp.json)
    assert resp.status_code == conftest.OK
    
    booking_stub3 = base
    booking_stub3['_id'] = ObjectId()
    booking_stub3['listing_id'] = ObjectId()
    booking_stub3['start_time'] = '2023-02-01T10:00:00'
    booking_stub3['end_time'] = '2023-02-02T10:00:00'
    booking_stub3['price'] = 50
    resp = client.post('/listings/book', headers=user_token, json=helpers.parse_json(booking_stub3))
    assert resp.status_code == conftest.OK

    # assert bookings are there
    acc = mock_db['UserAccount'].find_one()
    assert acc is not None
    assert len(acc['bookings']) == 3
    
    # assert completed bookings returns correct amount, no need to assert
    # correct info
    resp = client.get('profile/completed-bookings', headers=user_token)
    assert resp.status_code == conftest.OK
    assert len(resp.json) == 3
    
def test_successful_empty(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'profile/completed-bookings' is requested (GET)
    THEN check that a '200' OK status code is returned and an empty list is 
        returned 
    """
    # create user
    user_stub = conftest.USER_STUB.copy()
    mock_db['UserAccount'].insert_one(user_stub)
    
    resp = client.get('profile/completed-bookings', headers=user_token)
    assert resp.status_code == conftest.OK
    assert resp.json == []