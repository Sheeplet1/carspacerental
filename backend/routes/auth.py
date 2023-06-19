from flask import Blueprint

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register')
def register():
    return {'key': 'value'}
