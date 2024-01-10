from flask import Flask, request, jsonify, send_file
from llm import respond

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/message', methods=['POST'])
def message():
    data = request.json
    text = data.get('text')
    selected_index = data.get('selectedIndex')

    if selected_index in range(0, 4):
        # Use the respond function for selectedIndex between 0 and 3
        addition = ""
        if selected_index == 1: # for yapping case
            addition = "..."
        response_text = respond(selected_index, text) + addition
        # remove "Assistant message: " from response if it's included
        if response_text.startswith("Assistant message: "):
            response_text = response_text[19:]
    elif selected_index == 4:
        # Return handshake emoji for selectedIndex 4
        response_text = "🤝"

    return jsonify({'text': response_text})

if __name__ == '__main__':
    app.run(debug=True)
