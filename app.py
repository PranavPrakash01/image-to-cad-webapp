from flask import Flask, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/')
def index():
    return '<h1>Welcome To Project Server</h1><h3>Server is Running</h3>'

@app.route('/upload', methods=['POST'])
def upload_file():
    # Get the first file from the request
    file = next(iter(request.files.values()), None)

    # Check if a file was received
    if file is None:
        return 'No file received'

    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return 'No selected file'

    # Save the file to the input_images directory
    file.save(os.path.join('input_images', file.filename))
    
    return 'File uploaded successfully'

if __name__ == '__main__':
    app.run(debug=True)
