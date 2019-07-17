from flask import Flask
from rest_api.mobile_application.views import mobile_application


app = Flask(__name__)


app.register_blueprint(mobile_application, url_prefix='/')
