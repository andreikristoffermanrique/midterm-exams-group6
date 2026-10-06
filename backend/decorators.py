from functools import wraps
from flask import request, current_app, g
import jwt
from utils import error_response

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]
        
        if not token:
            return error_response("Token is missing", status=401)
        
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            g.current_user = data
        except jwt.ExpiredSignatureError:
            return error_response("Token has expired", status=401)
        except jwt.InvalidTokenError:
            return error_response("Token is invalid", status=401)
        
        return f(*args, **kwargs)
    return decorated
