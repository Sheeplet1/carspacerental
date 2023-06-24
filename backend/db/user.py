from bson import ObjectId
from ..db import db


def user_register(data: dict) -> ObjectId:
    user_id = ObjectId()
    user_doc = {
        "_id": user_id,
        "email": data["email"],
        "password": data["password"],
        "first_name":  data["first_name"],
        "last_name": data["last_name"],
        "phone_number": [data["phone_number"]],
        "payment_information": {},
        "current_bookings": [],
        "completed_bookings": [],
        "reviews": [],
        "listings": []
    }

    collection = db.get_database()["UserAccount"]
    collection.insert_one(user_doc)
    return user_id

def user_login(data: dict) -> ObjectId:
    collection = db.get_database()["UserAccount"]
    user = collection.find_one({"email": data["email"], "password": data["password"]})
    id = None
    if user:
        id = user["_id"]
    
    return id 
