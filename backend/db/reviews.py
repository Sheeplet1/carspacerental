from datetime import datetime
from typing import Optional
from bson import ObjectId
from ..db import bookings, user, db

def new(user_id: ObjectId, booking_id: ObjectId, data: dict) -> ObjectId:
    id = ObjectId()

    listing_id = bookings.get(booking_id)["listing_id"]
    name = user.get_user(user_id)["first_name"]

    review_doc = {
        "_id": id,
        "user_id": user_id,
        "booking_id": booking_id,
        "listing_id": listing_id,
        "name": name,
        "rating": float(data["rating"]),
        "message": data["message"],
        "timestamp": datetime.now().isoformat(),
    }

    collection = db.get_database()["Reviews"]
    collection.insert_one(review_doc)

    all_reviews = get_all(listing_id)
    listing_rating = sum(review["rating"] for review in all_reviews) / len(all_reviews)
    collection = db.get_database()["Listings"]
    collection.update_one({ "_id": listing_id }, { "$set": { "rating": listing_rating } })

    provider_id = collection.find_one({ "_id": listing_id })["provider"]

    provider_listings = list(db.get_database()["Listings"].find({ "provider": provider_id }))
    user_rating = sum(listing["rating"]for listing in provider_listings) / len(provider_listings)

    collection = db.get_database()["UserAccount"]
    collection.update_one({ "_id": provider_id }, { "$set": { "rating": user_rating } })

    return id

def get(booking_id: ObjectId) -> Optional[dict]:
    reviews = db.get_database()["Reviews"]
    return reviews.find_one({ "booking_id": booking_id })

def update(review_id: ObjectId, body: dict) -> None:
    reviews = db.get_database()["Reviews"]
    reviews.update_one({ "_id": review_id }, {"$set":body})
    reviews.update_one({ "_id": review_id }, {"$set": {"timestamp": datetime.now()}})

def delete(review_id: ObjectId) -> None:
    reviews = db.get_database()["Reviews"]
    reviews.delete_one({ "_id": review_id })

def get_all(listing_id: ObjectId) -> list:
    reviews = db.get_database()["Reviews"]
    return list(reviews.find({ "listing_id": listing_id }))
