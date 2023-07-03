from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.exceptions import Forbidden

from .. import helpers
from ..db import bookings, db

OK = 200
BAD_REQUEST = 400

bp = Blueprint('bookings', __name__, url_prefix='')

@bp.route('listings/book', methods=['POST'])
@jwt_required()
def new():
    # get user_id from token
    consumer = helpers.validate_jwt(get_jwt_identity())
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
    
    for bkn in all_bookings:
        # if start and end are further ahead
        if (data['start_time'] > bkn['end_time'] and data['end_time'] > bkn['end_time']) or \
           (data['start_time'] < bkn['start_time'] and data['end_time'] < bkn['start_time']):
            continue
        else:
            return {"error": "Invalid time slot"}, BAD_REQUEST
        
    # create booking
    data['consumer'] = consumer
    booking_id = bookings.new(data)
    response = {
        "booking_id": booking_id
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
        booking['_id'] = booking['_id']
        booking['consumer'] = booking['consumer']
        booking['listing_id'] = booking['listing_id']
        return booking, OK
    
    user_id = helpers.validate_jwt(get_jwt_identity())
    
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

@bp.route('profile/completed-bookings', methods=['GET'])
@jwt_required()
def completed():
    user_id = helpers.validate_jwt(get_jwt_identity())
    
    c_bookings = []
    completed_ids = bookings.get_completed(user_id)
    for b_id in completed_ids:
        c_bookings.append(bookings.get(b_id['_id']))
    
    return c_bookings, OK