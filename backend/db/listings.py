from typing import Optional
from bson import ObjectId
from ..db import db

def all() -> list:
    listings = db.get_database()["Listings"]
    return list(listings.find())

def new(user_id: ObjectId, data: dict) -> ObjectId:
    id = ObjectId()
    listing_doc = {
        "_id": id,
        "provider": user_id,
        "address": data["address"],
        "hourly_rate": float(data['hourly_rate']) if "hourly_rate" in data else None,
        "monthly_rate": float(data['monthly_rate']) if 'monthly_rate' in data else None,
        "listing_type": data["listing_type"],
        "max_vehicle_size": data["max_vehicle_size"],
        "description": data["description"],
        "access_type": data["access_type"],
        "photos": data["photos"],
        "amenities": [] if "amenities" not in data else list(data["amenities"]),
        "safety_features": [] if "safety_features" not in data else list(data["safety_features"]),
        "availability": data["availability"],
        "instructions": data["instructions"],
        "electric_charging": data["electric_charging"],
        "rating": None,
    }

    collection = db.get_database()["Listings"]
    collection.insert_one(listing_doc)

    db.get_database()['UserAccount'].update_one(
        {"_id": user_id},
        {"$push": {"listings": id}}
    )

    return id

def get(listing_id: ObjectId) -> Optional[dict]:
    listings = db.get_database()["Listings"]
    return listings.find_one({ "_id": listing_id })

def update_listing(listing_id: ObjectId, body: dict) -> None:
    listings = db.get_database()["Listings"]
    listings.update_one({ "_id": listing_id }, {"$set":body})

def remove_listing(listing_id: ObjectId) -> None:
    listings = db.get_database()["Listings"]

    # delete listing from user's profile
    listing = listings.find_one({'_id': listing_id})
    user_id = ObjectId(listing['provider'])
    db.get_database()['UserAccount'].find_one_and_update(
        {'_id': user_id},
        {'$pull': {'listings': listing_id}}
    )

    listings.delete_one({ "_id": listing_id })
