from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from bson import ObjectId

from ..helpers import validate_jwt
from ..db import payments, db

OK = 200
BAD_REQUEST = 400

bp = Blueprint('payments', __name__, url_prefix='/pay')

@bp.route('', methods=['POST'])
@jwt_required()
def pay():
    payee = validate_jwt(get_jwt_identity())
    if not db.get_database()['UserAccount'].find_one({'_id': payee}):
        return { 'error': 'User does not exist in system' }, BAD_REQUEST
    
    data = request.get_json()
    
    if "booking_id" not in data:
        return { "error": "Valid booking id is required" }, BAD_REQUEST
    
    b_id = ObjectId(data['booking_id'])
    booking = db.get_database()['Bookings'].find_one({'_id': b_id})
    
    if booking['consumer'] != payee:
        return { 'error': 'Incorrect user is paying' }, BAD_REQUEST
    
    resp = payments.cx_pay(data['booking_id'])
    
    return resp, OK