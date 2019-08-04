from flask import Blueprint, render_template, jsonify,request

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

@mobile_application.route('/identi-kreate')
def index():
    return render_template('index.html')


@mobile_application.route('/statement')
def statement():
    return render_template('statement.html')


@mobile_application.route('/api/submit',  methods=['POST'])
def submit_statement():
    submission = request.get_json()
    print(submission)
    return jsonify(status="success")

