from flask import Blueprint, jsonify

mobile_application = Blueprint('mobile_application', __name__)


@mobile_application.route('/')
def index():
    return jsonify({"greeting": "Hello, World!"})
