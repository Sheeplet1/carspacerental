from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from bson import ObjectId

from ..helpers import validate_jwt
from ..db import user as user_db

bp = Blueprint('user', __name__, url_prefix='/user')

@bp.route('/profile', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def profile():

    user_id = validate_jwt(get_jwt_identity())
    user = user_db.get_user(user_id)

    if request.method == "GET":
        user.pop("password")
        return user, 200

    if request.method == "PUT":
        update_data = request.get_json()

        # Cannot update
        invalid_keys = [
            "_id",
            "password",
            "bookings",
            "reviews",
            "listings",
            "rating"
        ]
        for key in invalid_keys:
            if key in update_data:
                return { "error": "Cannot update " + key }, 400

        for key, val in update_data.items():
            if key not in user.keys():
                return { "error": "Invalid update key" }, 400
            # check that the value has the correct type
            if not isinstance(val, type(user[key])):
                return { "error": "Update value has invalid type" }, 400

        user_db.update_user(user_id, update_data)

    elif request.method == "DELETE":
        user_db.remove_user(user_id)

    return {}, 200

@bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    """
    Used for viewing information on another user
    e.g. listing provider information, booking customer information

    Authorization not required
    """

    if not ObjectId.is_valid(user_id):
        return { "error": "Invalid user id" }, 400

    user = user_db.get_user(ObjectId(user_id))

    if not user:
        return { "error": "Invalid user id" }, 400

    invalid_keys = [
        "password",
        "payment_details",
    ]

    for key in invalid_keys:
        user.pop(key)

    return user, 200
