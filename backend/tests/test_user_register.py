import pytest
import mongomock
from backend.user_register import user_register

TEST_EMAIL = "spam123@gmail.com"
TEST_PW = "password123"


def test_successful_registration():
    users = mongomock.MongoClient().db
    user_register(TEST_EMAIL, TEST_PW, users)
    stored_user = users["users"].find_one({"email": TEST_EMAIL})
    
    if stored_user is None:
        raise ValueError("No user associated with that email")
    
    id = stored_user["_id"]
    userStub = {
        "_id": id,
        "email": TEST_EMAIL,
        "password": TEST_PW
    }
    
    assert stored_user == userStub
    
    
def test_invalid_email():
    users = mongomock.MongoClient().db
    res = user_register("123@.com", TEST_PW, users)
    assert res == False
    
    
def test_invalid_password():
    users = mongomock.MongoClient().db
    res = user_register(TEST_EMAIL, "", users)
    assert res == False