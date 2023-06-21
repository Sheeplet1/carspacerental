import pytest
import mongomock
import os
from flask import Flask
from unittest.mock import patch
from bson import ObjectId

from ..routes.auth import bp

TEST_ID = ObjectId()
TEST_EMAIL = "spam123@gmail.com"
TEST_PW = "password123"
TEST_FIRST_NAME = "John"
TEST_LAST_NAME = "Doe"
TEST_PN = "0416 123 980"

OK = 200
BAD_REQUEST = 400


@pytest.fixture
def client():
    # create test flask client
    app = Flask(__name__)
    app.register_blueprint(bp)
    os.environ["CONFIG_TYPE"] = 'config.TestingConfig'
    client = app.test_client()
    
    # create mock mongodb database
    mock_db = mongomock.MongoClient().db
    
    # insert mock user into database
    userDoc = {
        "_id": TEST_ID,
        "email": TEST_EMAIL,
        "password": TEST_PW,
    }
    mock_db['UserAccount'].insert_one(userDoc)
    
    with patch('backend.db.db.get_database', return_value=mock_db):
        client.db = mock_db
        yield client
            
            
def test_successful_login(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'auth/login' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and user is registered
    """
    response = client.post('/auth/login', data={"email": TEST_EMAIL, "password": TEST_PW})
    assert response.status_code == OK
    assert response.json == {
        "success": True,
        "message": "Login successful",
        'user_id': str(TEST_ID)
    }
    
    
def test_invalid_email(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'auth/login' is posted with an invalid email (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/auth/login', data={"email": "testing@gmail.com", "password": TEST_PW})
    assert response.status_code == BAD_REQUEST
    assert response.json == {
        "success": False,
        "message": "Invalid email or password",
    }
    
    
def test_empty_email(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'auth/login' is posted with an empty email (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/auth/login', data={"email": "", "password": TEST_PW})
    assert response.status_code == BAD_REQUEST
    assert response.json == {
        "success": False,
        "message": "Invalid email or password",
    }
    
    
def test_invalid_password(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'auth/login' is posted with an invalid password (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/auth/login', data={"email": TEST_EMAIL, "password": "notcorrect"})
    assert response.status_code == BAD_REQUEST
    assert response.json == {
        "success": False,
        "message": "Invalid email or password",
    }
    
    
def test_empty_password(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'auth/login' is posted with an empty password (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/auth/login', data={"email": TEST_EMAIL, "password": ""})
    assert response.status_code == BAD_REQUEST
    assert response.json == {
        "success": False,
        "message": "Invalid email or password",
    }