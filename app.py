# app.py

from flask import Flask, request, jsonify, send_file
from llm import respond

app = Flask(__name__)

# When you first go to the page, just surface the index.html page
@app.route('/')
def index():
    return send_file('index.html')

# When people send a message, return a response
@app.route('/message', methods=['POST'])
def message():
    # Data is sent along with two parts: text and selectedIndex
    data = request.json
    text = data.get('text')
    selected_index = data.get('selectedIndex')

    # Use the respond function for selectedIndex between 0 and 3
    if selected_index in range(0, 4):
        addition = ""
        if selected_index == 1: # for yapping case
            addition = "..."
        
        # respond() is what calls the LLM
        response_text = respond(selected_index, text) + addition

        # remove "Assistant message: " from response if it's included
        # (this kept happening for some reason)
        if response_text.startswith("Assistant message: "):
            response_text = response_text[19:]
    elif selected_index == 4:
        # Always return handshake emoji for selectedIndex 4 (DapGPT)
        response_text = "🤝"

    return jsonify({'text': response_text})

if __name__ == '__main__':
    app.run(debug=True)
