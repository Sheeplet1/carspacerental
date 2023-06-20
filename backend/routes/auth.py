from flask import Blueprint, request, jsonify
from backend.db.user import user_register
from backend.db.db import get_database
from backend.helpers import is_valid_email

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    email = request.form.get("email")
    password = request.form.get("password")
    
    db = get_database()
    collection = db["UserAccount"]
    
    if not is_valid_email(email) or collection.find_one({"email": email}):
        response = {"success": False, "message": "Invalid email or email already registered"}
        return jsonify(response), 400
   
    if not password:
        response = {"success": False, "message": "Password is required"}
        return jsonify(response), 400
    
    user_register(email, password)
    response = {"success": True, "message": "User registered successfully"}
    return jsonify(response), 200
