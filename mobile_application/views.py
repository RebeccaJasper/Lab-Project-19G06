from flask import Blueprint, render_template

mobile_application = Blueprint('mobile_application', __name__)


@mobile_application.route('/')
def index():
    return render_template('index.html')


@mobile_application.route('/statement')
def statement():
    return render_template('statement.html')
