from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.exceptions import Unauthorized

from ..helpers import validate_jwt
from ..db import listings as listings_db

bp = Blueprint('listings', __name__, url_prefix='/listings')

@bp.route('/new', methods=['POST'])
@jwt_required()
def new():
    # Valid token and get user id
    try:
        user_id = validate_jwt(get_jwt_identity())
    except Unauthorized as e:
        return e

    data = request.get_json()

    # TODO: VALIDATE ADDRESS PROPERLY
    if "address" not in data:
        return { "error": "Valid address is required" }, 400

    if "price" not in data or not str(data["price"]).replace('.', '', 1).isdigit():
        return { "error": "Valid price is required" }, 400

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

    response = { "listing_id": str(listing_id) }
    return response, 200
