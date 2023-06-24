import re
from bson import ObjectId
from werkzeug.datastructures import Headers
from werkzeug.exceptions import Forbidden

def is_valid_email(email: str):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def is_valid_phone_number(phone_number):
    pattern = r"^04(\s?[0-9]{2}\s?)([0-9]{3}\s?[0-9]{3}|[0-9]{2}\s?[0-9]{2}\s?[0-9]{2})$"
    return re.match(pattern, phone_number)

# TODO: Implement Token Authorization
def validate_token(headers: Headers) -> ObjectId:
    if not headers.get('Authorization'):
        raise Forbidden(description="Token does not exist")

    # Validate and Decode JWT Token

    # Return stored user objectid

    # NOTE: Temporary placeholder
    return ObjectId(headers.get('Authorization'))