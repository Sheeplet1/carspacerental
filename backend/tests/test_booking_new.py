from ..tests import conftest
from .. import helpers

def test_successful_booking(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listing/booking' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and booking is added
         to the user's acc and the listing
    """
    # register Provider and insert listing into mock_db
    user_stub = conftest.USER_STUB.copy()
    user_stub['listings'] = [conftest.TEST_LID]

    mock_db['UserAccount'].insert_one(user_stub)
    mock_db['Listings'].insert_one(conftest.LISTING_STUB.copy())
    
    stub = conftest.BOOKING_STUB.copy()
    # create booking
    response = client.post('/listings/book', headers=user_token, json=stub)
    assert response.status_code == conftest.OK
    id = mock_db['Bookings'].find_one()['_id']
    assert response.json == {
        'booking_id': str(id)
    }

    # check booking was inserted into database
    booking = mock_db['Bookings'].find_one()
    assert booking is not None
    assert booking["listing_id"] == conftest.TEST_LID
    assert booking["start_time"] == conftest.TEST_START
    assert booking["end_time"] == conftest.TEST_END
    assert booking["price"] == 100

    # check booking was added to user account
    acc = mock_db['UserAccount'].find_one()
    assert acc is not None
    assert acc['_id'] == booking['consumer']
    assert acc['bookings'] == [id]

def test_overlapping_bookings(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listing/booking' is posted with an invalid time slot (POST)
    THEN check that a '400' (BAD_REQUEST) and suitable message is returned
    """
    # register user one and insert listing into mock_db
    user_stub = conftest.USER_STUB.copy()
    user_stub['listings'] = [conftest.TEST_LID]

    mock_db['UserAccount'].insert_one(user_stub)
    mock_db['Listings'].insert_one(conftest.LISTING_STUB.copy())
    
    stub = conftest.BOOKING_STUB.copy()
    stub['start_time'] = '2022-01-01T00:00:00'
    stub['end_time'] = '2024-01-01T00:00:00'
    # create and insert booking
    response = client.post('/listings/book', headers=user_token, json=stub)
    assert response.status_code == conftest.OK
    id = mock_db['Bookings'].find_one()['_id']
    assert response.json == {
        'booking_id': str(id)
    }

    # create another booking which exists in the overlap of an existing booking
    booking_stub = conftest.BOOKING_STUB.copy()
    response = client.post('listings/book', headers=user_token, json=booking_stub)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Invalid time slot"
    }

def test_insert_between(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listing/booking' is posted with an valid time slot beetween two
         existing bookings (POST)
    THEN check that a '200' (OK) and booking is created
    """
    user_stub = conftest.USER_STUB.copy()
    user_stub['listings'] = [conftest.TEST_LID]

    mock_db['UserAccount'].insert_one(user_stub)
    mock_db['Listings'].insert_one(conftest.LISTING_STUB.copy())

    # Booking #1
    booking_1 = conftest.BOOKING_STUB.copy()
    booking_1['end_time'] = '2022-01-08T00:00:00'

    # Booking #2
    booking_2 = conftest.BOOKING_STUB.copy()
    booking_2['start_time'] = '2022-01-12T00:00:00'
    booking_2['end_time'] = '2022-01-16T00:00:00'

    client.post('/listings/book', headers=user_token, json=booking_1)
    client.post('/listings/book', headers=user_token, json=booking_2)

    # Inserting Booking #3 in between #1 and #2
    booking_3 = conftest.BOOKING_STUB.copy()
    booking_3['start_time'] = '2022-01-09T00:00:00'
    booking_3['end_time'] = '2022-01-11T00:00:00'
    response = client.post('/listings/book', headers=user_token, json=booking_3)

    id = mock_db['Bookings'].find_one({'start_time': '2022-01-09T00:00:00'})['_id']
    assert response.status_code == conftest.OK
    assert response.json == {
        'booking_id': str(id)
    }

def test_invalid_token(client, mock_db):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/book' is posted with a invalid token (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    user_stub = conftest.USER_STUB.copy()
    user_stub['listings'] = [conftest.TEST_LID]

    mock_db['UserAccount'].insert_one(user_stub)
    mock_db['Listings'].insert_one(conftest.LISTING_STUB.copy())
    stub = conftest.BOOKING_STUB.copy()
    response = client.post('/listings/book', headers={"Authorization": "invalid"},
                           json=stub)
    assert response.status_code == conftest.UNAUTHORIZED

def test_missing_listing(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/book' is posted with a missing listing (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    booking_stub = conftest.BOOKING_STUB.copy()
    booking_stub.pop('listing_id')
    response = client.post('/listings/book', headers=user_token, json=booking_stub)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid listing id is required"
    }

def test_missing_price(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/book' is posted with a missing price (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    booking_stub = conftest.BOOKING_STUB.copy()
    booking_stub.pop('price')
    response = client.post('/listings/book', headers=user_token, json=booking_stub)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid pricing is required"
    }

def test_invalid_price(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/book' is posted with a invalid price (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    booking_stub = conftest.BOOKING_STUB.copy()
    booking_stub.pop('price')
    booking_stub['price'] = "invalid_price"
    response = client.post('/listings/book', headers=user_token, json=booking_stub)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid pricing is required"
    }

def test_missing_start_time(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/book' is posted with a missing start time (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    booking_stub = conftest.BOOKING_STUB.copy()
    booking_stub.pop('start_time')
    response = client.post('/listings/book', headers=user_token, json=booking_stub)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid starting time is required"
    }

def test_missing_end_time(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/book' is posted with a missing end time (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    booking_stub = conftest.BOOKING_STUB.copy()
    booking_stub.pop('end_time')
    response = client.post('/listings/book', headers=user_token, json=booking_stub)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid end time is required"
    }
    
def test_user_books_own_listing(client, user_token, mock_db):
    exist_user = mock_db['UserAccount'].find_one()
    
    exist_user['listings'] = [conftest.TEST_LID]
    
    listing_stub = conftest.LISTING_STUB.copy()
    listing_stub['provider'] = exist_user['_id']
    mock_db['Listings'].insert_one(listing_stub)
        
    stub = conftest.BOOKING_STUB.copy()
    resp = client.post('/listings/book', headers=user_token, json=stub)
    assert resp.status_code == conftest.BAD_REQUEST