import pytest
import mongomock
import os
from flask import Flask
from unittest.mock import patch


from backend.routes.auth import bp


TEST_EMAIL = "spam123@gmail.com"
TEST_PW = "password123"


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
    
    with patch('backend.routes.auth.get_database', return_value=mock_db), \
         patch('backend.user_register.get_database', return_value=mock_db):
            client.db = mock_db
            yield client


def test_successful_registration(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/auth/register' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and user is registered
    """
    response = client.post('/auth/register', data={'email': TEST_EMAIL, 'password': TEST_PW})    
    assert response.status_code == OK
    assert response.json == {
        "success": True,
        "message": "User registered successfully"
    }
    
    # check if user was inserted into the mock database
    user = client.db['UserAccount'].find_one()
    assert user is not None
    assert user["email"] == TEST_EMAIL
    assert user["password"] == TEST_PW


def test_invalid_email(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'auth/register' is posted with an invalid email (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/auth/register', data={'email': "123@", 'password': TEST_PW})
    assert response.status_code == BAD_REQUEST
    assert response.json == {
        'success': False,
        'message': 'Invalid email or email already registered'
    }


def test_invalid_password(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'auth/register' is posted with an invalid password (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/auth/register', data={'email': TEST_EMAIL, 'password': ""})
    assert response.status_code == BAD_REQUEST
    assert response.json == {
        'success': False,
        'message': 'Password is required'
    }