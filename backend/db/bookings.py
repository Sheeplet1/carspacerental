from typing import Optional
from bson.objectid import ObjectId
from . import db
from pymongo import ReturnDocument

def new(data: dict) -> ObjectId:
    bookings = db.get_database()["Bookings"]
    users = db.get_database()["UserAccount"]
    consumer = ObjectId(data["consumer"])
    
    booking_doc = {
        "consumer": consumer,
        "listing_id": ObjectId(data['listing_id']),
        "start_time": data['start_time'],
        "end_time": data['end_time'],
        "price": float(data['price']),
    }
    booking_id = bookings.insert_one(booking_doc).inserted_id
    
    # update user's booking list
    users.find_one_and_update(
        {'_id': consumer},
        {'$push': {'current_bookings': booking_id}},
        return_document=ReturnDocument.AFTER
    )
    
    return booking_id
    
def cancel(booking_id: ObjectId) -> None:
    bookings = db.get_database()["Bookings"]
    users = db.get_database()["UserAccount"]
    
    booking_id = ObjectId(booking_id)
    # get user_id and booking document
    user_id = bookings.find_one({"_id": booking_id})['consumer']
    
    # # delete booking from Bookings and UserAccount
    bookings.delete_one({"_id": booking_id})
    users.find_one_and_update(
        {"_id": user_id},
        {"$pull": {'current_bookings': booking_id}},
        return_document=ReturnDocument.AFTER
    )

def get(booking_id: ObjectId) -> Optional[dict]:
    booking_id = ObjectId(booking_id)
    bookings = db.get_database()['Bookings']
    return bookings.find_one({ '_id': booking_id })

def update(booking_id: ObjectId, body: dict) -> None:
    booking_id = ObjectId(booking_id)
    bookings = db.get_database()['Bookings']
    return bookings.update_one({'_id': booking_id}, {"$set": body})