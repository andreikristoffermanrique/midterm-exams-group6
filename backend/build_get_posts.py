import os

# 1. Safely append to controllers.py
ctrl_code = """
def get_posts():
    try:
        posts = PostModel.get_all()
        return success_response("Posts retrieved successfully", {"posts": posts}, 200)
    except Exception as e:
        return error_response("Failed to retrieve posts", {"error": str(e)}, 500)
"""
with open('controllers.py', 'a', encoding='utf-8') as f:
    f.write(ctrl_code)

# 2. Safely append to routes.py
routes_code = """
@posts_bp.route('/api/posts', methods=['GET'])
def get_posts_route():
    return controllers.get_posts()
"""
with open('routes.py', 'a', encoding='utf-8') as f:
    f.write(routes_code)

# 3. Automated Check
try:
    from app import app
    client = app.test_client()
    resp = client.get('/api/posts')
    if resp.status_code == 200:
        print("CHECK PASSED: GET /api/posts is accessible and returning data.")
    else:
        print(f"CHECK FAILED with status {resp.status_code}")
        exit(1)
except Exception as e:
    print(f"CHECK FAILED: {e}")
    exit(1)
