from flask import jsonify
from werkzeug.exceptions import HTTPException

# ---- STANDARDIZED API RESPONSES (Developer 5 - SEARCH-BE-05) ----
def success_response(message="Success", data=None, status=200):
    if isinstance(message, dict) and data is None:
        data = message
        message = "Success"
    payload = {
        "success": True,
        "message": str(message),
        "data": data if data is not None else {}
    }
    return jsonify(payload), status


def error_response(message="Error", errors=None, status=400):
    if isinstance(errors, int) and status == 400:
        status = errors
        errors = None
    payload = {
        "success": False,
        "message": str(message),
        "errors": errors if errors is not None else {}
    }
    return jsonify(payload), status


# ---- ERROR HANDLING (Developer 5 - SEARCH-BE-04) ----
class APIError(Exception):
    def __init__(self, message="Bad request", errors=None, status=400):
        super().__init__(message)
        self.message = message
        self.errors = errors if errors is not None else {}
        self.status = status


def handle_bad_request(error):
    errors = getattr(error, "errors", None) or {}
    msg = getattr(error, "description", None) or getattr(error, "message", None) or "Bad request"
    return error_response(msg, errors, 400)


def handle_unauthorized(error):
    msg = getattr(error, "description", None) or "Unauthorized"
    return error_response(msg, {"auth": msg}, 401)


def handle_forbidden(error):
    msg = getattr(error, "description", None) or "Forbidden"
    return error_response(msg, {"auth": msg}, 403)


def handle_not_found(error):
    msg = getattr(error, "description", None) or "Resource not found"
    return error_response(msg, {"resource": "Not found"}, 404)


def handle_method_not_allowed(error):
    msg = getattr(error, "description", None) or "Method not allowed"
    return error_response(msg, {"method": msg}, 405)


def handle_server_error(error):
    return error_response("Internal server error", {"server": str(error)}, 500)


def register_error_handlers(app):
    app.register_error_handler(APIError, lambda e: error_response(e.message, e.errors, e.status))
    app.register_error_handler(400, handle_bad_request)
    app.register_error_handler(401, handle_unauthorized)
    app.register_error_handler(403, handle_forbidden)
    app.register_error_handler(404, handle_not_found)
    app.register_error_handler(405, handle_method_not_allowed)
    app.register_error_handler(500, handle_server_error)
    app.register_error_handler(Exception, lambda e: (
        error_response(e.description, {}, e.code) if isinstance(e, HTTPException)
        else error_response("Internal server error", {"server": str(e)}, 500)
    ))
    return app
