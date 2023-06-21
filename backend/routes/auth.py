from flask import Blueprint, request, jsonify
from ..db import user, db
from .. import helpers

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    email = request.form.get("email")
    password = request.form.get("password")
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    phone_number = request.form.get("phone_number")

    data = db.get_database()
    collection = data["UserAccount"]

    if not helpers.is_valid_email(email) or collection.find_one({"email": email}):
        response = {"success": False, "message": "Invalid email or email already registered"}
        return jsonify(response), 400

    if not password:
        response = {"success": False, "message": "Password is required"}
        return jsonify(response), 400

    if not first_name or not last_name:
        response = {"success": False, "message": "Name is required"}
        return jsonify(response), 400

    if not helpers.is_valid_phone_number(phone_number):
        response = {"success": False, "message": "Phone number is required"}
        return jsonify(response), 400

    id = user.user_register(email, password)
    user.user_create_profile(id, email, password, first_name, last_name, phone_number)
    response = {"success": True, "message": "User registered successfully"}
    return jsonify(response), 200
