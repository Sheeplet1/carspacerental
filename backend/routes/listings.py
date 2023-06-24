from flask import Blueprint, request
from ..db import listings as listings_db
from .. import helpers
from werkzeug.exceptions import Forbidden

bp = Blueprint('listings', __name__, url_prefix='/listings')

@bp.route('/new', methods=['POST'])
def new():
    # Get user id from token
    try:
        user_id = helpers.validate_token(request.headers)
    except Forbidden as e:
        # return 403 error if invalid token
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
