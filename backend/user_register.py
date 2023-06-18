from bson import ObjectId
from backend.get_database import get_database
from backend import helpers

def user_register(email: str, password: str, db=get_database()) -> bool:
    collection = db["users"]
    if not helpers.is_valid_email(email) or collection.find_one({"email": email}):
        return False
    
    if not password:
        return False
    
    userDoc = {
        "_id": ObjectId(),
        "email": email,
        "password": password
    }
    
    collection.insert_one(userDoc)
    return True

user_register("spam123@gmail.com", "passowrd1")