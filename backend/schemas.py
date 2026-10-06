# ---- PREVENT EMPTY POSTS & VALIDATE CONTENT (Developer 5 - SEARCH-BE-03 & SEARCH-BE-02) ----
def prevent_empty_post(data):
    errors = {}
    if not data or not isinstance(data, dict):
        return False, {
            "title": "Title is required and cannot be empty",
            "content": "Content is required and cannot be empty"
        }

    title = data.get("title")
    content = data.get("content")

    if title is None or not isinstance(title, str) or not title.strip():
        errors["title"] = "Title is required and cannot be empty"

    if content is None or not isinstance(content, str) or not content.strip():
        errors["content"] = "Content is required and cannot be empty"

    if errors:
        return False, errors

    return True, {}


def validate_post_content(title, content):
    errors = {}
    if title is not None:
        if not isinstance(title, str):
            errors["title"] = "Title must be a string"
        elif len(title.strip()) > 200:
            errors["title"] = "Title cannot exceed 200 characters"

    if content is not None:
        if not isinstance(content, str):
            errors["content"] = "Content must be a string"
        elif len(content.strip()) > 5000:
            errors["content"] = "Content cannot exceed 5000 characters"

    if errors:
        return False, errors
    return True, {}


def validate_post_payload(data):
    # First check empty/required
    ok, errs = prevent_empty_post(data)
    if not ok:
        return False, errs
    # Then check content constraints (length/type)
    return validate_post_content(data.get("title"), data.get("content"))


def validate_non_empty_post(data):
    return prevent_empty_post(data)


def is_empty_post(data):
    valid, _ = prevent_empty_post(data)
    return not valid
