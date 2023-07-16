from typing import Optional
from bson import ObjectId
from ..db import db

def cx_pay(booking_id: ObjectId) -> Optional['dict']:
    booking_id = ObjectId(booking_id)
    
    database = db.get_database()
    booking = database['Bookings'].find_one({'_id': booking_id })
    listing = database['Listings'].find_one({'_id': booking['listing_id']})
    
    # edge case: if bank acc was not initialised in database yet
    bank_db = database['BankAccount']
    if not bank_db.find_one():
        bank_db.insert_one({
            'name': 'sfcars',
            'balance': 0
        })
    
    # take 15% service fee
    service_fee = booking['price'] * 0.15
    bank_db.find_one_and_update(
        {'name': 'sfcars'},
        {'$inc': {'balance': service_fee}}
    )
    
    # update cx's total revenue made from listings
    db.get_database()['UserAccount'].find_one_and_update( 
        { '_id': listing['provider'] },
        {'$inc': {'revenue': booking['price'] - service_fee}} 
    ) 
    
    return { 'amount_received': booking['price'] - service_fee }