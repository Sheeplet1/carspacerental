from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from datetime import datetime as dt
from werkzeug.exceptions import Forbidden

from ..helpers import validate_jwt
from ..db import bookings
from ..db import db

OK = 200
BAD_REQUEST = 400

bp = Blueprint('bookings', __name__, url_prefix='')

@bp.route('listings/book', methods=['POST'])
@jwt_required()
def new():
    # get user_id from token
    consumer = validate_jwt(get_jwt_identity())
    data = request.get_json()

    if "listing_id" not in data:
        return { "error": "Valid listing id is required" }, BAD_REQUEST
    
    if "start_time" not in data:
        return { "error": "Valid starting time is required" }, BAD_REQUEST
    
    if "end_time" not in data:
        return { "error": "Valid end time is required" }, BAD_REQUEST
    
    if "price" not in data or not str(data["price"]).replace('.', '', 1).isdigit():
        return { "error": "Valid pricing is required" }, BAD_REQUEST
    
    # check if booking overlaps with existing bookings
    collection = db.get_database()['Bookings']
    all_bookings = collection.find()
    
    new_start = dt.strptime(data['start_time'], '%d %b %Y %H:%M:%S')
    new_end = dt.strptime(data['end_time'], '%d %b %Y %H:%M:%S')
    for bkn in all_bookings:
        exist_s = dt.strptime(bkn['start_time'], '%d %b %Y %H:%M:%S')
        exist_e = dt.strptime(bkn['end_time'], '%d %b %Y %H:%M:%S')
        # if start and end are further ahead
        if (new_start > exist_e and new_end > exist_e) or (new_start < exist_s and new_end < exist_s):
            continue
        else:
            return {"error": "Invalid time slot"}, BAD_REQUEST
        
    # create booking
    data['consumer'] = consumer
    booking_id = bookings.new(data)
    response = {
        "booking_id": str(booking_id)
    }
    return response, OK

@bp.route('/bookings/<booking_id>', methods=['GET', 'DELETE', 'PUT'])
@jwt_required(optional=True)
def info(booking_id):
    if not ObjectId.is_valid(booking_id):
        return { 'error': 'Invalid booking id' }, BAD_REQUEST
    
    booking_id = ObjectId(booking_id)
    booking = bookings.get(booking_id)
    
    if not booking:
        return { 'error': "Booking doesn't exist" }, BAD_REQUEST
    
    if request.method == "GET":
        booking['_id'] = str(booking['_id'])
        booking['consumer'] = str(booking['consumer'])
        booking['listing_id'] = str(booking['listing_id'])
        return booking, OK
    
    user_id = validate_jwt(get_jwt_identity())
    
    # TODO: Allow admins to bypass this
    if booking['consumer'] != user_id:
        raise Forbidden
    
    if request.method == 'PUT':
        update_data = request.get_json()
        
        if '_id' in update_data:
            return { 'error': 'Cannot update id' }, BAD_REQUEST
        
        for key, val in update_data.items():
            if key not in booking.keys():
                return { 'error': 'Invalid update key' }, BAD_REQUEST
            if not isinstance(val, type(booking[key])):
                return { 'error': 'Update value has invalid typing' }, BAD_REQUEST
            
        bookings.update(booking_id, update_data)
        
    elif request.method == 'DELETE':
        bookings.cancel(booking_id)
        
    return {}, OK