# app.py
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    message = data['message']
    # Process the message with Python
    response = f"Python processed message: {message}"
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
