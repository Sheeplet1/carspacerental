from bson import ObjectId
from ..tests import conftest

LISTING_BODY = {
    "address": {
        "street": "test street"
    },
    "price": 100,
    "space_type": "Driveway",
    "max_size": "SUV",
    "description": "test description",
    "access_type": "key card",
    "images": ["test base64 image string"],
    "features": ["test feature"]
}


def test_successful_listing(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/listings/new' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and the listing is created
    """
    response = client.post('/listings/new', headers=user_token ,
                           json=LISTING_BODY)
    assert response.status_code == conftest.OK
    assert ObjectId().is_valid(response.json["listing_id"])
    print(user_token)
    print(mock_db["UserAccount"].find_one())
    assert user_token is not None


def test_invalid_token(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with an invalid address (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/listings/new', headers={"Authorization": "invalid"},
                           json=LISTING_BODY)
    assert response.status_code == conftest.FORBIDDEN


def test_missing_address(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing address (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = LISTING_BODY.copy()
    test_body.pop("address")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid address is required",
    }


def test_missing_price(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing price (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = LISTING_BODY.copy()
    test_body.pop("price")
    print(test_body)
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid price is required",
    }


def test_invalid_price(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with an invalid price (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = LISTING_BODY.copy()
    test_body.pop("price")
    test_body["price"] = "invalid price"
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid price is required",
    }


def test_missing_space_type(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'listings/new' is posted with a missing space_type (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    test_body = LISTING_BODY.copy()
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
    test_body = LISTING_BODY.copy()
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
    test_body = LISTING_BODY.copy()
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
    test_body = LISTING_BODY.copy()
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
    test_body = LISTING_BODY.copy()
    test_body.pop("images")
    response = client.post('/listings/new', headers=user_token,
                           json=test_body)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {
        "error": "Valid images are required",
    }
