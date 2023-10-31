import os

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./buildhw', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/joinProject/<projectid>')
@cross_origin()
def joinProject(projectid):
    message = "Joined " + projectid
    successM = {"message": message, "code": 200}
    return jsonify(successM), 200

@app.route('/leaveProject/<projectid>')
@cross_origin()
def leaveProject(projectid):
    message = "Left " + projectid
    successM = {"message": message, "code": 200}
    return jsonify(successM), 200

@app.route('/checkin')
@cross_origin()
def checkIn_hardware():
    projectid = request.args.get('projectid')
    qty = request.args.get('qty')
    message = qty + " hardware checked in"
    successM = {"message": message, "code": 200}
    return jsonify(successM), 200

@app.route('/checkout')
@cross_origin()
def checkOut_hardware():
    projectid = request.args.get('projectid')
    qty = request.args.get('qty')
    message = qty + " hardware checked out"
    successM = {"message": message, "code": 200}
    return jsonify(successM), 200

@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8000)