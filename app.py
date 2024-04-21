from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import os
import time

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

@app.route('/convert', methods=['GET', 'POST'])
def convert_to_3d():
    print('Convert button clicked')  # Print statement for checking server-side
    print('Converting...')
    imageName = request.args.get('imageName')

    time.sleep(5)  # Simulate a 5-second delay (replace with actual conversion process)

    stl_filename = f"{imageName.split('.')[0]}.stl"
    stl_path = os.path.join('output_stl', stl_filename)

    if os.path.exists(stl_path):
        return send_from_directory('output_stl', stl_filename)
    

if __name__ == '__main__':
    app.run(debug=True)
