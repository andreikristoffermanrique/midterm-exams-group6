from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify

def hash_password(password):
    return generate_password_hash(password)

def verify_password(password, hashed):
    return check_password_hash(hashed, password)

def success_response(message, data=None, status=200):
    return jsonify({"success": True, "message": message, "data": data or {}}), status

def error_response(message, errors=None, status=400):
    return jsonify({"success": False, "message": message, "errors": errors or {}}), status
