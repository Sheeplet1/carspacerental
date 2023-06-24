from flask import Flask
from flask_jwt_extended import JWTManager
from flask_swagger_ui import get_swaggerui_blueprint

from . import config
from .routes import auth, listings

def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY
    JWTManager(app)

    app.register_blueprint(auth.bp)
    app.register_blueprint(listings.bp)

    swaggerui_blueprint = get_swaggerui_blueprint(
        '/docs',
        '/static/swagger.json',
    )

    app.register_blueprint(swaggerui_blueprint)

    return app

