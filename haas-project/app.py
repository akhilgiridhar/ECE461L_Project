import os

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from cipher import encrypt, decrypt

uri = "mongodb+srv://team2:GhwJULPvVeLVTvme@haas-project.tt8xdg9.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
userDb = client['Users']
userColl = userDb["users"]
projectsDb = client['Projects']
projectsColl = projectsDb["projects"]
hardware = projectsDb["hardware"]

app = Flask(__name__, static_folder='./buildhw', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/getProjects/<userid>")
@cross_origin()
def getProjects(userid):
    data = list(projectsColl.find())
    sets = hardware.find_one({"name": "Hardware Sets"})
    HW1 = sets.get("HW1")
    HW2 = sets.get("HW2")

    sentToDb = []

    for i in data:
        if userid in i['users']:
            i['_id'] = str(i['_id'])
            i['joined'] = userid in i['users']
            sentToDb.append(i)

    if len(sentToDb) == 0:
        sentToDb = None
        
    successM = {
        "HW1": f"{HW1[0]}/{HW1[1]}",
        "HW2": f"{HW2[0]}/{HW2[1]}",
        "projects": sentToDb,
        "code": 200
    }

    return jsonify(successM), 200


@app.route("/createProject")
@cross_origin()
def createProject():
    name = request.args.get("name")
    description = request.args.get("description")
    projectId = request.args.get("projectId")
    userid = request.args.get("userId")
    userName = request.args.get("userName")

    project1 = projectsColl.find_one({"projectId": projectId})

    if project1 is not None:
        successM = {
            "isAuthenticated": False,
            "code": 200
        }
    else:
        users = []
        names = []
        users.append(userid)
        names.append(userName)
        project = {
            "name": name,
            "projectId": projectId,
            "description": description,
            "users": users,
            "names": names,
            "checkedOut": [0, 0]
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

    # set N = 5 and D = 1 for standard encrypt/decrypt purposes
    encrypted_username = encrypt(userid, 5, 1)
    encrypted_password = encrypt(password, 5, 1)

    user = userColl.find_one(
        {"username": encrypted_username, "password": encrypted_password})

    if user is not None:
        stored_password = user.get("password")
        # set N = 5 and D = 1 for standard encrypt/decrypt purposes
        decrypted_password = decrypt(stored_password, 5, 1)

        if decrypted_password == password:
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

    # set N = 5 and D = 1 for standard encrypt/decrypt purposes
    encrypted_username = encrypt(userid, 5, 1)
    encrypted_password = encrypt(password, 5, 1)

    user1 = userColl.find_one(
        {"username": encrypted_username, "password": encrypted_password})
    user2 = userColl.find_one({"username": encrypted_username})

    if user1 is not None or user2 is not None:
        successM = {
            "isAuthenticated": False,
            "name": None,
            "username": None,
            "code": 200
        }
    else:
        user = {
            "username": encrypted_username,  # store encrypted username
            "password": encrypted_password,  # store encrypted password
            "name": name
        }
        successM = {
            "isAuthenticated": True,
            "name": name,
            "username": userid,  # return the original username
            "code": 200
        }
        userColl.insert_one(user)

    return jsonify(successM), 200


@app.route('/joinProject')
@cross_origin()
def joinProject():
    projectid = request.args.get("projectid")
    username = request.args.get("username")
    name = request.args.get("name")

    project = projectsColl.find_one({"projectId": projectid})

    if project is not None and username not in project.get("users"):
        update = {"$push": {"users": username,
                            "names": name}}

        projectsColl.update_one({"projectId": projectid}, update)

        project = projectsColl.find_one({"projectId": projectid})

        message = "Joined " + projectid
        successM = {"message": message,
                    "users": project["names"],
                    "joined": True,
                    "code": 200}
    elif username in project.get("users"):
        message = "Already joined project"
        successM = {"message": message,
                    "users": None,
                    "joined": False,
                    "code": 200}
    else:
        message = "Project with id " + projectid + " not found"
        successM = {"message": message,
                    "users": None,
                    "joined": False,
                    "code": 200}

    return jsonify(successM), 200


@app.route('/leaveProject')
@cross_origin()
def leaveProject():
    projectid = request.args.get("projectid")
    username = request.args.get("username")
    name = request.args.get("name")

    update = {"$pull": {"users": username,
                        "names": name}}

    projectsColl.update_one({"projectId": projectid}, update)

    project = projectsColl.find_one({"projectId": projectid})

    message = "Left " + projectid
    successM = {"message": message,
                "users": project["names"],
                "code": 200}
    return jsonify(successM), 200


@app.route('/checkin')
@cross_origin()
def checkIn_hardware():
    projectid = request.args.get('projectid')
    qty = int(request.args.get('qty'))
    name = request.args.get("name")
    project = projectsColl.find_one({"projectId": projectid})
    sets = hardware.find_one({"name": "Hardware Sets"})
    checkedOut = project.get("checkedOut")

    idx = 0 if name == "HW1" else 1

    fromDb = sets.get(name)

    amount = list(map(int, fromDb))

    if qty > 0:
        if qty > int(checkedOut[idx]):
            qty = checkedOut[idx]
            amount[0] = checkedOut[idx] + amount[0]
            checkedOut[idx] = 0

        else:
            checkedOut[idx] = checkedOut[idx] - qty
            amount[0] = amount[0] + qty

        projectsColl.update_one({"projectId": projectid}, {
                                "$set": {"checkedOut": checkedOut}})
        hardware.update_one({"name": "Hardware Sets"},
                            {"$set": {name: amount}})

        message = f"{qty} hardware checked in"
        successM = {"checkedin": True,
                    "message": message,
                    "code": 200}
    else:
        message = f"Invalid Amount"
        successM = {"checkedin": False,
                    "message": message,
                    "code": 200}

    return jsonify(successM), 200


@app.route('/checkout')
@cross_origin()
def checkOut_hardware():
    projectid = request.args.get('projectid')
    qty = int(request.args.get('qty'))
    name = request.args.get("name")
    project = projectsColl.find_one({"projectId": projectid})
    sets = hardware.find_one({"name": "Hardware Sets"})
    checkedOut = project.get("checkedOut")

    idx = 0 if name == "HW1" else 1

    fromDb = sets.get(name)

    amount = list(map(int, fromDb))

    if qty > 0:
        if amount[0] < qty:
            qty = amount[0]
            checkedOut[idx] = checkedOut[idx] + amount[0]
            amount[0] = 0
            projectsColl.update_one({"projectId": projectid}, {
                                    "$set": {"checkedOut": checkedOut}})
            hardware.update_one({"name": "Hardware Sets"},
                                {"$set": {name: amount}})
        else:
            checkedOut[idx] = checkedOut[idx] + qty
            amount[0] = amount[0] - qty
            projectsColl.update_one({"projectId": projectid}, {
                                    "$set": {"checkedOut": checkedOut}})
            hardware.update_one({"name": "Hardware Sets"},
                                {"$set": {name: amount}})

        message = f"{qty} hardware checked out"
        successM = {"checkedout": True,
                    "message": message,
                    "code": 200}
    else:
        message = f"Invalid Amount"
        successM = {"checkedout": False,
                    "message": message,
                    "code": 200}
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
