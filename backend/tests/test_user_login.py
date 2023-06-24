from ..tests import conftest

USER_DOC = {
    "_id": conftest.TEST_UID,
    "email": conftest.TEST_EMAIL,
    "password": conftest.TEST_PW
}

def test_successful_login(client, mock_db):
    """
    GIVEN a Flask application configured for testing
    WHEN the 'auth/login' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and user is registered
    """
    mock_db["UserAccount"].insert_one(USER_DOC.copy())
    response = client.post('/auth/login', json={
        "email": conftest.TEST_EMAIL,
        "password": conftest.TEST_PW
    })
    assert response.status_code == conftest.OK
    assert response.json == {
        'user_id': str(conftest.TEST_UID)
    }

