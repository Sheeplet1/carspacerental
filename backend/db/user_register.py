from bson import ObjectId
from backend.db.db import get_database

def user_register(email: str, password: str) -> None:
    db = get_database()
    collection = db["UserAccount"] 
    print(f"user_register: {collection}")
    
    userDoc = {
        "_id": ObjectId(),
        "email": email,
        "password": password
    }
    
    collection.insert_one(userDoc)
    