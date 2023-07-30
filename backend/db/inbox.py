from bson import ObjectId
from typing import Optional
from datetime import datetime

from ..helpers import db

def create(data: dict) -> ObjectId:    
    id = ObjectId()
    message_doc = {
        '_id': id,
        'sender': ObjectId(data['sender']),
        'recipient': ObjectId(data['recipient']),
        'subject': data['subject'],
        'body': data['body'],
        'timestamp': datetime.now().isoformat()
    }
    
    # push message to user's inbox
    db.get_database()['UserAccount'].update_one(
        { '_id': ObjectId(data['recipient']) },
        { '$push': { 'inbox': message_doc } }
    )
    
def delete(user_id: ObjectId, message_id: ObjectId) -> None:
    # find user in database and delete message from inbox
    user_id = ObjectId(user_id)
    message_id = [ObjectId(x) for x in message_id]
    
    db.get_database()['UserAccount'].update_one(
        { '_id': user_id },
        { '$pull': { 'inbox': { '_id': { '$in': message_id } } } }
    )


def get(user_id: ObjectId, message_id: ObjectId) -> Optional[dict]:
    user_id = ObjectId(user_id)
    message_id = ObjectId(message_id)
    
    user = db.get_database()['UserAccount'].find_one(
        {'_id': user_id }
    )
    
    for message in user['inbox']:
        if message['_id'] == message_id:
            return message
    
    return {}

def get_all(user_id: ObjectId) -> Optional[dict]:
    user_id = ObjectId(user_id)
    user = db.get_database()['UserAccount'].find_one( {'_id': user_id })
    return user['inbox']