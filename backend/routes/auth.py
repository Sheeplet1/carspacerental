from flask import Blueprint, request
from ..db import user, db
from .. import helpers

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()    
    email = data["email"]
    password = data["password"]
    first_name = data["first_name"]
    last_name = data["last_name"]

    database = db.get_database()
    user_account = database["UserAccount"]

    if not helpers.is_valid_email(email) or user_account.find_one({"email": email}):
        return {"error": "Invalid email or email already registered"}, 400

    if not password:
        return {"error": "Password is required"}, 400

    if not first_name or not last_name:
        return {"error": "Name is required"}, 400

    id = user.user_register(data)
    return {'user_id': str(id)}, 200

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
        
    user_id = user.user_login(data)
    if user_id:
        return {'user_id': str(user_id)}, 200
    else:
        return {"error": "Invalid email or password"}, 400