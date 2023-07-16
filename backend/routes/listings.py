from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.exceptions import Forbidden

from ..helpers import validate_jwt
from ..db import listings as listings_db

bp = Blueprint('listings', __name__, url_prefix='/listings')

@bp.route('', methods=['GET'])
def get_all():
    listings = listings_db.all()
    for listing in listings:
        listing["_id"] = listing["_id"]
        listing["provider"] = listing["provider"]
    return { "listings": listings }, 200

@bp.route('/new', methods=['POST'])
@jwt_required()
def new():
    user_id = validate_jwt(get_jwt_identity())

    data = request.get_json()

    # TODO: VALIDATE ADDRESS PROPERLY
    if "address" not in data:
        return { "error": "Valid address is required" }, 400

    if "hourly_price" not in data or not str(data["hourly_price"]).replace('.', '', 1).isdigit():
        return { "error": "Valid hourly price is required" }, 400

    if "daily_price" not in data or not str(data["daily_price"]).replace('.', '', 1).isdigit():
        return { "error": "Valid daily price is required" }, 400

    if "space_type" not in data:
        return { "error": "Valid car space type is required" }, 400

    if "max_size" not in data:
        return { "error": "Valid max vehicle size is required" }, 400

    if "description" not in data:
        return { "error": "Valid description is required" }, 400

    if "access_type" not in data:
        return { "error": "Valid access type is required" }, 400

    if "images" not in data:
        return { "error": "Valid images are required" }, 400

    listing_id = listings_db.new(user_id, data)

    response = { "listing_id": listing_id }
    return response, 200

@bp.route('/<listing_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required(optional=True)
def info(listing_id):

    if not ObjectId.is_valid(listing_id):
        return { "error": "Invalid listing id" }, 400

    listing_id = ObjectId(listing_id)
    listing = listings_db.get(listing_id)

    if not listing:
        return { "error": "Invalid listing id" }, 400

    if request.method == "GET":
        listing["_id"] = listing["_id"]
        listing["provider"] = listing["provider"]
        return listing, 200

    user_id = validate_jwt(get_jwt_identity())

    # TODO: Allow Admin to bypass this
    if listing["provider"] != user_id:
        raise Forbidden

    if request.method == "PUT":
        update_data = request.get_json()

        if "_id" in update_data:
            return { "error": "Cannot update id" }, 400

        for key, val in update_data.items():
            if key not in listing.keys():
                return { "error": "Invalid update key" }, 400
            if not isinstance(val, type(listing[key])):
                return { "error": "Update value has invalid type" }, 400

        listings_db.update_listing(listing_id, update_data)

    elif request.method == "DELETE":
        listings_db.remove_listing(listing_id)

    return {}, 200

