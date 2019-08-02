from flask import Blueprint, render_template, jsonify
from os import path, getcwd

mobile_application = Blueprint('mobile_application', __name__)


@mobile_application.route('/')
def index():
    return render_template('index.html')


@mobile_application.route('/photo')
def picture():
    return render_template('photo.html')


@mobile_application.route('/api/photo', methods=['POST'])
def picture_base64():
    photo_directory = path.join(getcwd(), 'mobile_application\\facial_images\\base64.txt')
    base64_image = open(photo_directory, 'r')
    base64_image_string = base64_image.read()
    return jsonify(img_string=base64_image_string)
