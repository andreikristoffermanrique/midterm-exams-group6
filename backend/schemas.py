# ---- PREVENT EMPTY POSTS (Developer 5 - SEARCH-BE-03) ----
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


def validate_non_empty_post(data):
    return prevent_empty_post(data)


def is_empty_post(data):
    valid, _ = prevent_empty_post(data)
    return not valid
