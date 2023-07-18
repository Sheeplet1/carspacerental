import re
import hashlib
from .db import db
from bson import ObjectId
from bson.errors import InvalidId
from bson.json_util import loads, dumps
from werkzeug.exceptions import Unauthorized

def is_valid_email(email: str):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def is_valid_phone_number(phone_number):
    phone_number = "".join(str(phone_number).split())
    pattern = r"^04([0-9]{8})$"
    return re.match(pattern, phone_number)

def validate_jwt(jwt_identity) -> ObjectId:
    """
    Returns ObjectId from jwt_identity if valid, otherwise raises Unauthorized
    """
    try:
        # attempt to convert jwt_identity to objectid
        id = ObjectId(jwt_identity)
        data = db.get_database()
        # check if user exists in db
        if not data["UserAccount"].find_one({ "_id": id }):
            raise Unauthorized
        return id

    except InvalidId:
        raise Unauthorized

def generate_hash(input: str) -> str:
    return hashlib.sha256(input.encode()).hexdigest()

def parse_json(data):
    return loads(dumps(data))

def is_admin(user_id):
    data = db.get_database()
    user = data["UserAccount"].find_one({ "_id": user_id })
    if not user:
        return False
    return user['is_admin']
