from flask import Blueprint, request, current_app
from models import User
from utils import hash_password, verify_password, success_response, error_response
import sqlite3
import jwt
import datetime

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

@auth_bp.route('/users/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return error_response("Username and password are required")

    user_row = User.get_by_username(username)
    if not user_row or not verify_password(password, user_row['password']):
        return error_response("Invalid credentials", status=401)

    token = jwt.encode({
        "id": user_row['id'],
        "username": user_row['username'],
        "role": "user",
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=2)
    }, current_app.config['SECRET_KEY'], algorithm="HS256")

    return success_response("Login successful", {
        "token": token,
        "user": {"id": user_row['id'], "username": user_row['username']}
    })

# ---- POSTS (Developer 4) ----

# ---- SEARCH (Developer 5) ----

# ---- POSTS ROUTES (Developer 4) ----
from flask import Blueprint
import controllers
try:
    from decorators import token_required
except ImportError:
    def token_required(f): return f

posts_bp = Blueprint('posts_bp', __name__)

@posts_bp.route('/api/posts', methods=['POST'])
@token_required
def add_post():
    return controllers.create_post()
