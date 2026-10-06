from flask import Blueprint, request
from models import User
from utils import hash_password, success_response, error_response
import sqlite3

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/users/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return error_response("Username and password are required")

    if User.get_by_username(username):
        return error_response("Username already exists")

    hashed = hash_password(password)
    try:
        user_id = User.create(username, hashed)
        return success_response("Registered successfully", {"id": user_id, "username": username}, 201)
    except sqlite3.IntegrityError:
        return error_response("Username already exists")

# ---- POSTS (Developer 4) ----

# ---- SEARCH (Developer 5) ----
