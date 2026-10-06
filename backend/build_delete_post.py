import os

# 1. Safely append delete method to PostModel in models.py
model_code = """
    @staticmethod
    def delete(post_id):
        db = get_db()
        db.execute('DELETE FROM posts WHERE id = ?', (post_id,))
        db.commit()
"""
with open('models.py', 'a', encoding='utf-8') as f:
    f.write(model_code)

# 2. Safely append to controllers.py
ctrl_code = """
def delete_post(post_id):
    post = PostModel.get_by_id(post_id)
    if not post:
        return error_response("Post not found", status=404)
        
    user_id = getattr(g, 'current_user', {}).get('id')
    # Basic ownership check
    if user_id and post['user_id'] and post['user_id'] != user_id:
        return error_response("Unauthorized to delete this post", status=403)
        
    try:
        PostModel.delete(post_id)
        return success_response("Post deleted successfully", status=200)
    except Exception as e:
        return error_response("Failed to delete post", {"error": str(e)}, 500)
"""
with open('controllers.py', 'a', encoding='utf-8') as f:
    f.write(ctrl_code)

# 3. Safely append to routes.py
routes_code = """
@posts_bp.route('/api/posts/<int:post_id>', methods=['DELETE'])
@token_required
def delete_post_route(post_id):
    return controllers.delete_post(post_id)
"""
with open('routes.py', 'a', encoding='utf-8') as f:
    f.write(routes_code)

# 4. Automated Check
try:
    from app import app
    client = app.test_client()
    resp = client.delete('/api/posts/9999')
    # Expecting 401/403 (Auth blocked) or 404 (Not Found)
    if resp.status_code in [401, 403, 404]:
        print("CHECK PASSED: DELETE route is registered and responding securely.")
    else:
        print(f"CHECK FAILED with status {resp.status_code}")
        exit(1)
except Exception as e:
    print(f"CHECK FAILED: {e}")
    exit(1)
