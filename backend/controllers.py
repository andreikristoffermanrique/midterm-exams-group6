
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

def get_posts():
    try:
        posts = PostModel.get_all()
        return success_response("Posts retrieved successfully", {"posts": posts}, 200)
    except Exception as e:
        return error_response("Failed to retrieve posts", {"error": str(e)}, 500)
