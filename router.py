# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    message = data['message']
    # Process the message with Python
    response = f"Python processed message: {message}"
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
