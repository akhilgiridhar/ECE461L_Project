import os

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://team2:GhwJULPvVeLVTvme@haas-project.tt8xdg9.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
userDb = client['Users']
userColl = userDb["users"]
projectsDb = client['Projects']
projectsColl = projectsDb["projects"]

app = Flask(__name__, static_folder='./buildhw', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/getProjects/<userid>")
@cross_origin()
def getProjects(userid):
    data = list(projectsColl.find())
    
    for i in data:
        i['_id'] = str(i['_id'])
        i['joined'] = userid in i['users']
    
    return jsonify(data)


@app.route("/createProject")
@cross_origin()
def createProject():
    name = request.args.get("name")
    description = request.args.get("description")
    projectId = request.args.get("projectId")
    userid = request.args.get("userId")
    
    project1 = projectsColl.find_one({"projectId" : projectId})
    project2 = projectsColl.find_one({"name": name})
    
    if project1 is not None or project2 is not None:
        successM = {
            "isAuthenticated": False,
            "code": 200
        }
    else:
        users = []
        users.append(userid)
        project = {
            "name": name,
            "projectId": projectId,
            "description": description,
            "users": users,
            "HW1": 100,
            "Hw2": 100,
        }
        projectsColl.insert_one(project)
        successM = {
            "isAuthenticated": True,
            "code": 200
        }
    
    return jsonify(successM), 200


@app.route("/login")
@cross_origin()
def login():
    userid = request.args.get("userid")
    password = request.args.get("password")
    
    user = userColl.find_one({"username" : userid, "password": password})
    
    if user is not None:
        successM = {
            "isAuthenticated": True,
            "name": user["name"],
            "username": userid,
            "code": 200
        }
    else:
        successM = {
            "isAuthenticated": False,
            "name": None,
            "username": None,
            "code": 200
        }
    
    return jsonify(successM), 200


@app.route('/createUser')
@cross_origin()
def createUser():
    name = request.args.get("name")
    userid = request.args.get("userid")
    password = request.args.get("password")
    
    user1 = userColl.find_one({"username" : userid, "password": password})
    user2 = userColl.find_one({"username" : userid})
    
    if user1 is not None or user2 is not None:
        successM = {
            "isAuthenticated": False,
            "name": None,
            "username": None,
            "code": 200
        }
    else:
        user = {
            "username": userid,
            "password": password,
            "name": name
        }
        successM = {
            "isAuthenticated": True,
            "name": name,
            "username": userid,
            "code": 200
        }
        userColl.insert_one(user)

    return jsonify(successM), 200


@app.route('/joinProject')
@cross_origin()
def joinProject():
    projectid = request.args.get("projectid")
    username = request.args.get("username")
    
    update = { "$push": {"users": username }}
    
    projectsColl.update_one({"projectId": projectid}, update)
    
    project = projectsColl.find_one({"projectId": projectid})
    
    message = "Joined " + projectid
    successM = {"message": message, 
                "users": project["users"],
                "code": 200}
    return jsonify(successM), 200


@app.route('/leaveProject')
@cross_origin()
def leaveProject():
    projectid = request.args.get("projectid")
    username = request.args.get("username")
    
    update = { "$pull": {"users": username }}
    
    projectsColl.update_one({"projectId": projectid}, update)
    
    project = projectsColl.find_one({"projectId": projectid})
    
    message = "Left " + projectid
    successM = {"message": message, 
                "users": project["users"],
                "code": 200}
    return jsonify(successM), 200


@app.route('/checkin')
@cross_origin()
def checkIn_hardware():
    projectid = request.args.get('projectid')
    qty = int(request.args.get('qty'))
    message = f"{qty} hardware checked in"
    projectsColl.update_one({"projectId": projectid}, {"$inc": {"HW1": qty}})
    successM = {"message": message, "code": 200}
    return jsonify(successM), 200


@app.route('/checkout')
@cross_origin()
def checkOut_hardware():
    projectid = request.args.get('projectid')
    qty = int(request.args.get('qty'))
    message = f"{qty} hardware checked out"
    projectsColl.update_one({"projectId": projectid}, {"$inc": {"HW1": -qty}})
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