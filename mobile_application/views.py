from flask import Blueprint, render_template

mobile_application = Blueprint('mobile_application', __name__)

@mobile_application.route('/')
def home():
    return render_template('home.html')