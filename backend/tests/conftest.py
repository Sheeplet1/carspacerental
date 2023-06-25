import pytest
import mongomock
import os
from flask import Flask
from unittest.mock import patch
from bson import ObjectId
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta

from ..routes.auth import bp as auth_bp
from ..routes.listings import bp as listings_bp
from ..routes.user import bp as user_bp
from ..helpers import generate_hash

TEST_JWT_KEY = "testingsecretkey"
TEST_PW_HASH = generate_hash("password123")
TEST_UID = ObjectId()
TEST_LID = ObjectId()
TEST_BID = ObjectId()
TEST_EMAIL = "spam123@gmail.com"
TEST_PW = "password123"
TEST_FIRST_NAME = "John"
TEST_LAST_NAME = "Doe"
TEST_PN = "0416 123 980"
TEST_START = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
TEST_END = (datetime.now() + timedelta(days=4)).strftime("%Y-%m-%d %H:%M:%S")

USER_STUB = {
    "_id": TEST_UID,
    "email": TEST_EMAIL,
    "password": TEST_PW,
    "first_name": TEST_FIRST_NAME,
    "last_name": TEST_LAST_NAME,
    "phone_number": TEST_PN,
}

LISTING_STUB = {
    "_id": TEST_LID,
    "provider": TEST_UID,
    "address": {"street": "unsw"},
    "space_type": "parking lot",
    "max_size": "suv",
    "description": "none",
    "access_type": "key card",
    "images": ["image1", "image2"],
    "features": "ev"
}

BOOKING_STUB = {
    "_id": TEST_BID,
    "consumer": TEST_UID,
    "listing_id": TEST_LID,
    "start_time": TEST_START,
    "end_time": TEST_END,
    "price": 100
}

OK = 200
BAD_REQUEST = 400
UNAUTHORIZED = 401
FORBIDDEN = 403

@pytest.fixture
def mock_db():
    # create mock mongodb database
    mock_db = mongomock.MongoClient().db
    yield mock_db

@pytest.fixture
def client(mock_db):
    # create test flask client
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = TEST_JWT_KEY
    JWTManager(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(listings_bp)
    app.register_blueprint(user_bp)
    os.environ["CONFIG_TYPE"] = 'config.TestingConfig'
    client = app.test_client()

    with patch('backend.db.db.get_database', return_value=mock_db):
        yield client


@pytest.fixture
def user_token(client):
    """
    Registers a user and yields their token
    """
    register_data = {
        "email": "alternatetest@email.com",
        "password": TEST_PW,
        "first_name": TEST_FIRST_NAME,
        "last_name": TEST_LAST_NAME,
        "phone_number": TEST_PN,
    }

    resp = client.post('/auth/register', json=register_data)
    token_head = {
       "Authorization": "Bearer " + resp.get_json()["token"]
    }
    yield token_head
