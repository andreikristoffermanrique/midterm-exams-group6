import sqlite3
import os
os.makedirs('database', exist_ok=True)
conn = sqlite3.connect('database/app.db')
c = conn.cursor()
c.execute('''
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, user_id INTEGER
    )
''')
c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='posts'")
if c.fetchone():
    print("CHECK PASSED: posts table verified.")
else:
    print("CHECK FAILED")
    exit(1)
