from flask import Blueprint, render_template, jsonify
from os import path, getcwd
from mobile_application.models import get_random_image
from mobile_application.controller import process_submission_info
from flask import Blueprint, render_template, jsonify, request
from json import loads


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


@mobile_application.route('/instructions')
def instructions():
    return render_template('instructions.html')


@mobile_application.route('/identi-kreate')
def index():
    return render_template('identi-kreate.html')


@mobile_application.route('/photo')
def picture():
    return render_template('photo.html')


@mobile_application.route('/api/photo', methods=['POST'])
def picture_base64():
    (person_id, base64_image_string) = get_random_image()
    return jsonify(img_string=base64_image_string, person_id=person_id)


@mobile_application.route('/statement')
def statement():
    return render_template('statement.html')


@mobile_application.route('/api/submit',  methods=['POST'])
def submit_statement():
    submission = loads(request.get_json())
    process_submission_info(submission["firstName"], submission["surname"], submission["gender"], submission["race"])
    return jsonify(status="success")


@mobile_application.route('/complete')
def complete():
    return render_template('finish.html')