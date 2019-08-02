from flask import Blueprint, render_template, jsonify,request

mobile_application = Blueprint('mobile_application', __name__)


@mobile_application.route('/')
def index():
    return render_template('index.html')


@mobile_application.route('/statement')
def statement():
    return render_template('statement.html')


@mobile_application.route('/api/submit',  methods=['POST'])
def submit_statement():
    print(request.is_json)
    submission = request.get_json()
    print(submission)
    return jsonify(status="success")
