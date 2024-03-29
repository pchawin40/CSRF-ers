import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, emit

from .models import db, User
from .api.user_routes import user_routes
from .api.message_routes import message_routes
from .api.channel_routes import channel_routes
from .api.dmr_routes import dmr_routes
from .api.notification_routes import notification_routes
from .socket import socketio

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        os.environ.get("LIVE_SITE_HTTP"),
        os.environ.get("LIVE_SITE_HTTPS")
    ]
else:
    origins = "*"

# Setup login manager
login = LoginManager(app)
login.login_view = 'users.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(channel_routes, url_prefix='/api/channels')
app.register_blueprint(dmr_routes, url_prefix='/api/dmr')
app.register_blueprint(notification_routes, url_prefix='/api/notifications')
db.init_app(app)
Migrate(app, db)

#init socketio
socketio.init_app(app)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

# initiate flask_socketio
if __name__ == '__main__':
    socketio.run(app)
