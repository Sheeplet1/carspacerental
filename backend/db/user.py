from bson import ObjectId
from backend.db.db import get_database


def user_register(email: str, password: str) -> ObjectId:
    db = get_database()
    collection = db["UserAccount"] 
    
    id = ObjectId()
    userDoc = {
        "_id": id,
        "email": email,
        "password": password
    }
    
    collection.insert_one(userDoc)
    return id


def user_create_profile(id, email: str, password: str, first_name: str, 
                        last_name: str, phone_number: str) -> None:
    '''
    full name, car details, contact information, payment information, bookings,
    ratings/reviews, car listings
    '''
    db = get_database()
    collection = db["UserProfile"]
    
    userProfile = {
        "_id": id,
        "email": email,
        "password": password,
        "first_name":  first_name,
        "last_name": last_name,
        "phone_number": [phone_number],
        "payment_information": "",
        "current_bookings": [],
        "completed_bookings": [],
        "reviews": [],
        "listings": []
    }
    
    collection.insert_one(userProfile)