from flask import Flask
from flask_swagger_ui import get_swaggerui_blueprint

from .routes import auth

def create_app():
    app = Flask(__name__)

    app.register_blueprint(auth.bp)

    swaggerui_blueprint = get_swaggerui_blueprint(
        '/docs',
        '/static/swagger.json',
    )

    app.register_blueprint(swaggerui_blueprint)

    return app
