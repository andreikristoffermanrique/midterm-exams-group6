from flask import Flask, jsonify
from flask_cors import CORS
import database
from routes import auth_bp

app = Flask(__name__)
from routes import posts_bp
app.register_blueprint(posts_bp)
CORS(app)
app.config['SECRET_KEY'] = 'super-secret-midterm-key'

# Initialize DB
database.init_db(app)

@app.teardown_appcontext
def teardown_db(exception):
    database.close_connection(exception)

@app.route('/api')
def api_base():
    return jsonify({"success": True, "message": "API is running", "data": {}})

# ---- AUTH (Developer 3) ----
app.register_blueprint(auth_bp, url_prefix='/api')

# ---- POSTS (Developer 4) ----

# ---- SEARCH (Developer 5) ----

if __name__ == '__main__':
    app.run(debug=True, port=5000)
