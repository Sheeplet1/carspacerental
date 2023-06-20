from bson import ObjectId
from backend import helpers
from backend.db.db import get_database

def user_register(email: str, password: str, db=get_database()) -> bool:
    collection = db["UserAccount"]
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