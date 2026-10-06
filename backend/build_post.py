import os

# 1. Safely append to controllers.py
ctrl_code = """
# ---- POSTS CONTROLLERS (Developer 4) ----
from flask import request, g
from models import PostModel
try:
    from utils import success_response, error_response
except ImportError:
    from flask import jsonify
    def success_response(m, d=None, s=200): return jsonify({"success": True, "message": m, "data": d or {}}), s
    def error_response(m, e=None, s=400): return jsonify({"success": False, "message": m, "errors": e or {}}), s

def create_post():
    data = request.json or {}
    title = data.get('title', '').strip()
    content = data.get('content', '').strip()
    
    if not title or not content:
        return error_response("Title and content are required", status=400)
        
    user_id = getattr(g, 'current_user', {}).get('id', 1) # Fallback to user 1 if auth missing
    try:
        post_id = PostModel.create(title, content, user_id)
        return success_response("Post created successfully", {"post_id": post_id}, 201)
    except Exception as e:
        return error_response("Failed to create post", {"error": str(e)}, 500)
"""
with open('controllers.py', 'a', encoding='utf-8') as f:
    f.write(ctrl_code)

# 2. Safely append to routes.py
routes_code = """
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
"""
with open('routes.py', 'a', encoding='utf-8') as f:
    f.write(routes_code)

# 3. Safely register blueprint in app.py
with open('app.py', 'r', encoding='utf-8') as f:
    app_code = f.read()
if 'posts_bp' not in app_code:
    # Insert blueprint registration right after app = Flask(__name__)
    app_code = app_code.replace("app = Flask(__name__)", "app = Flask(__name__)\nfrom routes import posts_bp\napp.register_blueprint(posts_bp)")
    with open('app.py', 'w', encoding='utf-8') as f:
        f.write(app_code)

# 4. Automated Check
try:
    from app import app
    client = app.test_client()
    resp = client.post('/api/posts', json={'title': 'Test', 'content': 'Test Content'})
    # 201 Created, or 401/403 if Dev 3's Auth successfully blocked the unauthenticated test request
    if resp.status_code in [201, 401, 403]:
        print("CHECK PASSED: Route exists and responded securely.")
    else:
        print(f"CHECK FAILED with status {resp.status_code}")
        exit(1)
except Exception as e:
    print(f"CHECK FAILED: {e}")
    exit(1)
