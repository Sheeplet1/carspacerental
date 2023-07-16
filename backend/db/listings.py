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
        "hourly_price": float(data['hourly_price']),
        "daily_price": float(data['daily_price']) if data['daily_price'] else None,
        "space_type": data["space_type"],
        "max_size": data["max_size"],
        "description": data["description"],
        "access_type": data["access_type"],
        "images": data["images"],
        "features": None if "features" not in data else list(data["features"])
    }

    collection = db.get_database()["Listings"]
    collection.insert_one(listing_doc)
    return id

def get(listing_id: ObjectId) -> Optional[dict]:
    listings = db.get_database()["Listings"]
    return listings.find_one({ "_id": listing_id })

def update_listing(listing_id: ObjectId, body: dict) -> None:
    listings = db.get_database()["Listings"]
    listings.update_one({ "_id": listing_id }, {"$set":body})

def remove_listing(listing_id: ObjectId) -> None:
    listings = db.get_database()["Listings"]
    listings.delete_one({ "_id": listing_id })
