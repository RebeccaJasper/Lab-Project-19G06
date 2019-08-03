from flask import Blueprint, render_template

mobile_application = Blueprint('mobile_application', __name__)


@mobile_application.route('/')
def home():
    return render_template('home.html')


@mobile_application.route('/explanation')
def explain():
    return render_template('explanation.html')


@mobile_application.route('/consent-form')
def consent():
    return render_template('consent.html')