from flask import Flask
from flask_jwt_extended import JWTManager
from . import config
from .routes import auth, listings, user

def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
    JWTManager(app)

    app.register_blueprint(auth.bp)
    app.register_blueprint(listings.bp)
    app.register_blueprint(user.bp)

    return app
  