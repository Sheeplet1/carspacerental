from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from bson import ObjectId

from ..helpers import validate_jwt
from ..db import inbox
from ..db import user as user_db

OK = 200
BAD_REQUEST = 400

bp = Blueprint('inbox', __name__, url_prefix='/inbox')

@bp.route('/new', methods=['POST'])
@jwt_required()
def create():
    user_id = validate_jwt(get_jwt_identity())
    
    data = request.get_json()
    
    if "recipient" not in data or not ObjectId.is_valid(data['recipient']):
        return { 'error': 'Valid recipient is required' }, BAD_REQUEST
    
    if "subject" not in data or len(data['subject']) <= 0:
        return { 'error': 'Subject line is required' }, BAD_REQUEST
    
    if "body" not in data or len(data['body']) <= 0:
        return { 'error': 'Message body is required' }, BAD_REQUEST
    
    inbox.create({
        'sender': user_id,
        'recipient': data['recipient'],
        'subject': data['subject'],
        'body': data['body']
    })
    
    return {}, OK

@bp.route('', methods=['GET', 'DELETE'])
@jwt_required()
def overview():
    ''' Purpose
        Overview screen of the inbox, allows user to select multiple messages to
        delete mainly 
    '''
    user_id = validate_jwt(get_jwt_identity())
    
    if not ObjectId.is_valid(user_id):
        return { 'error': 'Invalid user id' }, BAD_REQUEST

    data = request.get_json()    

    if 'message_id' in data:
        for id in data['message_id']:
            if not ObjectId.is_valid(id):
                return { 'error': 'Invalid message' }, BAD_REQUEST
    
    user = user_db.get_user(ObjectId(user_id))
    
    if not user:
        return { 'error': 'Invalid user id' }, BAD_REQUEST
    
    if request.method == 'GET':
        return inbox.get_all(user_id), OK
    
    elif request.method == 'DELETE':
        if 'message_id' not in data:
            return { 'error': 'Messages must be selected' }, BAD_REQUEST
        
        ids = data['message_id']
        if not isinstance(ids, list):
             ids = [ids]
                          
        inbox.delete(user_id, ids)
        
    return {}, OK

@bp.route('/<message_id>', methods=['GET', 'DELETE'])
@jwt_required()
def specific_info(message_id):
    
    data = request.get_json()
    
    if 'user_id' not in data or not ObjectId.is_valid(data['user_id']):
        return { 'error': 'Invalid user id' }, BAD_REQUEST
    user_id = ObjectId(data['user_id'])
    
    if not ObjectId.is_valid(message_id):
        return { 'error': 'Invalid message' }, BAD_REQUEST
    
    user = user_db.get_user(ObjectId(user_id))
    
    if not user:
        return { 'error': 'Invalid user id' }, BAD_REQUEST
    
    if request.method == 'GET':
        resp = inbox.get(user_id, message_id)
        if not resp:
            return { 'error': 'Invalid message' }, BAD_REQUEST
        
        return resp, OK
    
    elif request.method == 'DELETE':
        inbox.delete(user_id, [message_id])
    
    return {}, OK