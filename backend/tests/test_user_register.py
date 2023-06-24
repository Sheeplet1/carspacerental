from ..tests import conftest

USER_STUB = conftest.USER_STUB

def test_successful_registration(client, mock_db):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/auth/register' is posted to (POST)
    THEN check that a '200' (OK) status code is returned and user is registered
    """
    response = client.post('/auth/register', json=USER_STUB)
    
    assert response.status_code == conftest.OK
    user = mock_db['UserAccount'].find_one()
    id = user["_id"]
    assert response.json == {
        'user_id': str(id)
    }

    # check if user was inserted into the mock database
    assert user is not None
    assert user["email"] == conftest.TEST_EMAIL
    assert user["password"] == conftest.TEST_PW
    assert user["phone_number"] == [conftest.TEST_PN]
    assert user["payment_information"] == {}
    assert user["current_bookings"] == []
    assert user["completed_bookings"] == []
    assert user["reviews"] == []
    assert user["listings"] == []
    
def test_missing_email(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/auth/register' is posted with an invalid email (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    user = USER_STUB.copy()
    user["email"] = "123"
    response = client.post('/auth/register', json=user)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {"error": "Invalid email or email already registered"}
    
def test_missing_password(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/auth/register' is posted with an invalid password (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    user = USER_STUB.copy()
    user["password"] = ""
    response = client.post('/auth/register', json=user)

    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {"error": "Password is required"}
    
def test_existing_email(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/auth/register' is posted with an existing email (POST)
    THEN check that a '400' (BAD REQUEST) code and suitable message is returned
    """
    response = client.post('/auth/register', json=USER_STUB)
    assert response.status_code == conftest.OK

    response = client.post('/auth/register', json=USER_STUB)
    assert response.status_code == conftest.BAD_REQUEST
    assert response.json == {"error": "Invalid email or email already registered"}