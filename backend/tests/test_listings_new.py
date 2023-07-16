from bson import ObjectId
from ..tests import conftest

def test_successful_listing(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/new' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and the listing is created
    """
    listing_stub = conftest.LISTING_STUB.copy()
    
    response = client.post('/listings/new', headers=user_token ,
                           json=listing_stub)
    assert response.status_code == conftest.OK
    assert ObjectId().is_valid(response.json["listing_id"])
    listing = mock_db["Listings"].find_one({
        "_id": ObjectId(response.json["listing_id"])
    })
    assert listing

    assert ObjectId().is_valid(listing.pop("_id"))
    assert ObjectId().is_valid(listing.pop("provider"))
    listing_stub.pop('_id')
    listing_stub.pop('provider')

    assert listing == listing_stub


def test_invalid_token(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with an invalid address (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/listings/new', headers={"Authorization": "invalid"},
                           json=conftest.LISTING_STUB.copy())
    assert response.status_code == conftest.UNAUTHORIZED


def test_missing_address(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing address (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body.pop("address")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid address is required",
    }


def test_missing_hourly_price(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing price (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body.pop('hourly_price')
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid hourly price is required",
    }
    
    
def test_missing_daily_price(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing price (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body.pop("daily_price")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid daily price is required",
    }


def test_invalid_hourly_price(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with an invalid price (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body["hourly_price"] = "invalid price"
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid hourly price is required",
    }


def test_invalid_daily_price(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with an invalid price (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body["daily_price"] = "invalid price"
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid daily price is required",
    }


def test_missing_space_type(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing space_type (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body.pop("space_type")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid car space type is required",
    }


def test_missing_max_size(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing max_size (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body.pop("max_size")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid max vehicle size is required",
    }


def test_missing_description(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing description (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body.pop("description")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid description is required",
    }


def test_missing_access_type(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing access_type (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body.pop("access_type")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid access type is required",
    }


def test_missing_images(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing images (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = conftest.LISTING_STUB.copy().copy()
    test_body.pop("images")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid images are required",
    }
