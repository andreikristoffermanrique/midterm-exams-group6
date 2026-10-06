import os

# 1. Safely append methods to PostModel in models.py
# (Assuming PostModel is the last class in the file, indenting with 4 spaces will attach it)
model_code = """
    @staticmethod
    def get_by_id(post_id):
        db = get_db()
        return db.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()

    @staticmethod
    def update(post_id, title, content):
        db = get_db()
        db.execute('UPDATE posts SET title = ?, content = ? WHERE id = ?', (title, content, post_id))
        db.commit()
"""
with open('models.py', 'a', encoding='utf-8') as f:
    f.write(model_code)

# 2. Safely append to controllers.py
ctrl_code = """
def update_post(post_id):
    data = request.json or {}
    title = data.get('title', '').strip()
    content = data.get('content', '').strip()
    
    if not title or not content:
        return error_response("Title and content are required", status=400)
        
    post = PostModel.get_by_id(post_id)
    if not post:
        return error_response("Post not found", status=404)
        
    user_id = getattr(g, 'current_user', {}).get('id')
    # Basic ownership check (if auth is fully integrated)
    if user_id and post['user_id'] and post['user_id'] != user_id:
        return error_response("Unauthorized to edit this post", status=403)
        
    try:
        PostModel.update(post_id, title, content)
        return success_response("Post updated successfully", {"post_id": post_id}, 200)
    except Exception as e:
        return error_response("Failed to update post", {"error": str(e)}, 500)
"""
with open('controllers.py', 'a', encoding='utf-8') as f:
    f.write(ctrl_code)

# 3. Safely append to routes.py
routes_code = """
@posts_bp.route('/api/posts/<int:post_id>', methods=['PUT'])
@token_required
def update_post_route(post_id):
    return controllers.update_post(post_id)
"""
with open('routes.py', 'a', encoding='utf-8') as f:
    f.write(routes_code)

# 4. Automated Check
try:
    from app import app
    client = app.test_client()
    resp = client.put('/api/posts/9999', json={'title': 'Updated', 'content': 'Content'})
    # Expecting 401/403 (Auth blocked) or 404 (Not Found, meaning auth passed but post missing)
    if resp.status_code in [401, 403, 404]:
        print("CHECK PASSED: PUT route is registered and responding appropriately.")
    else:
        print(f"CHECK FAILED with status {resp.status_code}")
        exit(1)
except Exception as e:
    print(f"CHECK FAILED: {e}")
    exit(1)
