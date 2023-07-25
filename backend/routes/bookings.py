import pymongo
from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.exceptions import Forbidden
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta as rd

from .. import helpers
from ..db import bookings, db

OK = 200
BAD_REQUEST = 400

bp = Blueprint('bookings', __name__, url_prefix='')

@bp.route('/listings/book', methods=['POST'])
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
    
    # check if user is trying to book their own listing
    listing = db.get_database()['Listings'].find_one({'_id': ObjectId(data['listing_id'])})
    if listing['provider'] == consumer:
        return { 'error': 'User cannot book their own listing' }, BAD_REQUEST
    
    resp = check_for_overlaps(data['start_time'], data['end_time'])
    if resp is not None:
        return resp
        
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

    if booking['consumer'] != user_id and not helpers.is_admin(user_id):
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
            
        new_id = bookings.update(booking_id, update_data)
        return { 'booking_id': new_id }, OK
    elif request.method == 'DELETE':
        data = request.get_json()
        bookings.cancel(booking_id, data)
        
    return {}, OK

@bp.route('/profile/completed-bookings', methods=['GET'])
@jwt_required()
def completed():
    user_id = helpers.validate_jwt(get_jwt_identity())

    c_bookings = []
    completed_ids = bookings.get_completed(user_id)
    for b_id in completed_ids:
        c_bookings.append(bookings.get(b_id['_id']))

    return c_bookings, OK

################################### HELPERS ###################################
def check_for_overlaps(new_start: str, new_end: str):
    new_start = dt.fromisoformat(new_start)
    new_end = dt.fromisoformat(new_end)
    
    bookings_db = db.get_database()['Bookings']
    all_bookings = bookings_db.find({
        'end_time': {'$gte': dt.now().isoformat()}
    }).sort('end_time', pymongo.ASCENDING)
            
    for bkn in all_bookings:
        dt_start = dt.fromisoformat(bkn['start_time'])
        end = extract_end_date(bkn['start_time'], bkn['end_time'])
        dt_end = dt.fromisoformat(end)
        
        # get Hour : Minute : Second values
        bkn_stime = dt_start.time()
        bkn_etime = dt_end.time()
        
        if check_date_overlaps(dt_start, dt_end, new_start, new_end):
            return {"error": "Invalid time slot"}, BAD_REQUEST
        
        if bkn['recurring'] == 'daily':            
            # Check exclusions first and see if it coincides with the dates.
            if not check_exclusions(bkn['_id'], bkn['start_time'], bkn['end_time'], new_start, new_end):
                return
            
            new_start_time = new_start.time()
            new_end_time = new_end.time()
            if check_time_overlaps(bkn_stime, bkn_etime, new_start_time, new_end_time):
                return {"error": "Invalid time slot"}, BAD_REQUEST
        
        # For the rest of recurring types, dates are used instead to check.
        elif bkn['recurring'] == 'weekly':
            while dt_start <= new_end:
                dt_start += rd(days=7)
                dt_end += rd(days=7)
                if check_date_overlaps(dt_start, dt_end, new_start, new_end):
                    return {"error": "Invalid time slot"}, BAD_REQUEST
            
        elif bkn['recurring'] == 'biweekly':
            while dt_start <= new_end:
                dt_start += rd(days=14)
                dt_end += rd(days=14)
                if check_date_overlaps(dt_start, dt_end, new_start, new_end):
                    return {"error": "Invalid time slot"}, BAD_REQUEST
            
        elif bkn['recurring'] == 'monthly':
            while dt_start <= new_end:
                dt_start += rd(months=1)
                dt_end += rd(months=1)
                if check_date_overlaps(dt_start, dt_end, new_start, new_end):
                    return {"error": "Invalid time slot"}, BAD_REQUEST


''' check_time_overlaps
    Given an existing booking's start and end times and a new booking's start and
    end times, check if they overlap.
    Returns TRUE if they overlap, otherwise FALSE.
'''
def check_time_overlaps(start_time: dt.time, end_time: dt.time, new_start: dt.time, \
                       new_end: dt.time) -> bool:
    return not (new_start > start_time and new_end > end_time) or \
           not (new_start < start_time and new_end < end_time)

''' check_date_overlaps
    Given an existing booking's start and end dates and a new booking's start and
    end dates, check if they overlap.
    Returns TRUE if overlaps, otherwise FALSE.
'''
def check_date_overlaps(start_time: dt, end_time: dt, new_start: dt, \
                        new_end: dt) -> bool:
    if (start_time > new_start and end_time > new_end) or \
       (start_time < new_start and end_time < new_end):
            return False
    else:
        return True

''' extract_end_date
    Extracts the actual ending date for recurring bookings when given the 
    starting and ending dates. This is because the design for recurring was to 
    set the YEAR to 9998 to symbolise forever.
'''
def extract_end_date(start: dt, end: dt) -> dt:
    start_year = '{:%Y}'.format(dt.strptime(start, '%Y-%m-%dT%H:%M:%S'))
    end = '{:%m-%dT%H:%M:%S}'.format(dt.strptime(end, '%Y-%m-%dT%H:%M:%S'))
    return start_year + '-' + end

''' check_exclusions
    Searches through a parent booking's exclusions (mainly for recurring bookings)
    and checks for overlaps with a booking that is trying to be created. 
    Returns TRUE if there is an overlap, otherwise FALSE.
'''
def check_exclusions(parent_id: ObjectId, parent_start, parent_end, new_start, new_end):
    bookings = db.get_database()['Bookings']
    
    parent = bookings.find_one({'_id': parent_id})
    par_start_date = dt.fromisoformat(parent_start).date()
    par_end_date = dt.fromisoformat(parent_end).date()
    
    new_start_date = new_start.date()
    new_end_date = new_end.date()    
    
    for exc_id in parent['exclusions']:
        exc = bookings.find_one({'_id': exc_id})
        exc_start = dt.strptime(exc['start_time'], '%Y-%m-%dT%H:%M:%S')
        exc_end = dt.strptime(exc['end_time'], '%Y-%m-%dT%H:%M:%S')
        
        exc_start_date = exc_start.date()
        exc_end_date = exc_end.date()
        exc_start_time = exc_start.time()
        exc_end_time = exc_end.time()
        
        # Specific edge case for daily bookings: bookings occur "daily", except
        # for specific exclusions. Therefore, only need to compare an exclusion's
        # dates and match them. If they match, then only need to compare time periods.
        if parent['recurring'] == 'daily':
            if exc_start_date == new_start_date and exc_end_date == new_end_date:
                if check_time_overlaps(exc_start_time, exc_end_time, new_start.time(), new_end.time()):
                    return False
        
        if exc_start_date == par_start_date and exc_end_date == par_end_date:
            if check_time_overlaps(exc_start_time, exc_end_time, new_start.time(), new_end.time()):
                return False
    
    return True