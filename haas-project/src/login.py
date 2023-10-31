from flask import Flask, request, jsonify
from pymongo import MongoClient
from cipher import encrypt, decrypt
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# MongoDB configuration
mongo_client = MongoClient('mongodb+srv://team2:team2@haas-project.tt8xdg9.mongodb.net/?retryWrites=true&w=majority')
db = mongo_client['Users']
users_collection = db['users']

# Registration endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Encrypt the password before storing it
    encrypted_password = encrypt(password, 5, 1)
    
    user_data = {
        'username': username,
        'password': encrypted_password
    }
    
    # Check if the user already exists
    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'User already exists'}), 400
    
    # Insert the new user
    users_collection.insert_one(user_data)
    
    return jsonify({'message': 'Registration successful'}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Retrieve the user's encrypted password from the database
    user = users_collection.find_one({'username': username})
    
    if user:
        stored_password = user['password']
        
        # Decrypt the stored password for comparison
        decrypted_password = decrypt(stored_password, 5, 1)
        
        if decrypted_password == password:
            return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)
