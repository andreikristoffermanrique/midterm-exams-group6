import sqlite3
from database import get_db
from utils import success_response, error_response

# ---- POST SEARCH CONTROLLER (Developer 5 - SEARCH-BE-01) ----
def search_posts_controller(request_args):
    query = request_args.get("q") or request_args.get("search") or ""
    db = get_db()
    cursor = db.cursor()
    
    if query.strip():
        search_pattern = f"%{query.strip()}%"
        cursor.execute(
            "SELECT id, title, content, user_id, author, created_at, updated_at FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY created_at DESC",
            (search_pattern, search_pattern)
        )
    else:
        cursor.execute(
            "SELECT id, title, content, user_id, author, created_at, updated_at FROM posts ORDER BY created_at DESC"
        )
        
    rows = cursor.fetchall()
    posts = []
    for row in rows:
        posts.append({
            "id": row[0],
            "title": row[1],
            "content": row[2],
            "user_id": row[3],
            "author": row[4],
            "created_at": row[5],
            "updated_at": row[6]
        })
        
    return success_response("Posts fetched successfully", {"posts": posts}, 200)
