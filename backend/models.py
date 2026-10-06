from database import get_db

# ---- USER (Developer 3) ----
class User:
    @staticmethod
    def create(username, password):
        db = get_db()
        cursor = db.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        db.commit()
        return cursor.lastrowid

    @staticmethod
    def get_by_username(username):
        db = get_db()
        return db.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()

    @staticmethod
    def get_by_id(user_id):
        db = get_db()
        return db.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()

# ---- POSTS (Developer 4) ----
class PostModel:
    @staticmethod
    def create(title, content, user_id):
        db = get_db()
        cursor = db.execute(
            'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
            (title, content, user_id)
        )
        db.commit()
        return cursor.lastrowid

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.execute("SELECT * FROM posts")
        return [dict(row) for row in cursor.fetchall()]

    @staticmethod
    def get_by_id(post_id):
        db = get_db()
        return db.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()

    @staticmethod
    def update(post_id, title, content):
        db = get_db()
        db.execute('UPDATE posts SET title = ?, content = ? WHERE id = ?', (title, content, post_id))
        db.commit()

    @staticmethod
    def delete(post_id):
        db = get_db()
        db.execute('DELETE FROM posts WHERE id = ?', (post_id,))
        db.commit()
