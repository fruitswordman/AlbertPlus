# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from course_extractor import Coursebot

# from chatbot import Chatbot

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

coursebot = Coursebot()


def pathfinder(message, bot=coursebot):
    output = bot.get_info(message)

    return output


@app.route("/send_message", methods=["POST"])
def send_message():
    data = request.json
    message = data["message"]

    processed_message = pathfinder(message)

    # Process the message with Python
    response = f"{processed_message}"
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
