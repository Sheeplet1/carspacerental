from bson import ObjectId
from ..db import db

def new(user_id: ObjectId, data: dict) -> ObjectId:
    id = ObjectId()
    listing_doc = {
        "_id": id,
        "provider": user_id,
        "address": data["address"],
        "price": float(data["price"]),
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
