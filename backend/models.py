from database import get_db

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
