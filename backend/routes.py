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

@posts_bp.route('/api/posts', methods=['GET'])
def get_posts_route():
    return controllers.get_posts()

@posts_bp.route('/api/posts/<int:post_id>', methods=['PUT'])
@token_required
def update_post_route(post_id):
    return controllers.update_post(post_id)

@posts_bp.route('/api/posts/<int:post_id>', methods=['DELETE'])
@token_required
def delete_post_route(post_id):
    return controllers.delete_post(post_id)

# ---- SEARCH ROUTE (Developer 5 - SEARCH-BE-01) ----
from flask import Blueprint, request
from controllers import search_posts_controller

search_bp = Blueprint("search_bp", __name__)

@search_bp.route("/posts/search", methods=["GET"])
def search_posts_route():
    return search_posts_controller(request.args)

# ---- SEARCH ROUTE (Developer 5 - SEARCH-BE-01) ----
from flask import Blueprint, request
from controllers import search_posts_controller

search_bp = Blueprint("search_bp", __name__)

@search_bp.route("/posts/search", methods=["GET"])
def search_posts_route():
    return search_posts_controller(request.args)

# ---- SEARCH ROUTE (Developer 5 - SEARCH-BE-01) ----
from flask import Blueprint, request
from controllers import search_posts_controller

search_bp = Blueprint("search_bp", __name__)

@search_bp.route("/posts/search", methods=["GET"])
def search_posts_route():
    return search_posts_controller(request.args)

# ---- SEARCH ROUTE (Developer 5 - SEARCH-BE-01) ----
from flask import Blueprint, request
from controllers import search_posts_controller

search_bp = Blueprint("search_bp", __name__)

@search_bp.route("/posts/search", methods=["GET"])
def search_posts_route():
    return search_posts_controller(request.args)
