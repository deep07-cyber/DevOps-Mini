from flask import Flask, request, jsonify, render_template
import pandas as pd
import os
from datetime import datetime
from flask_cors import CORS
from flask import send_from_directory



app = Flask(__name__)
CORS(app)  # allow frontend hosted on another port or domain

CSV_FILE = 'submissions.csv'

# Create CSV with headers if it doesn't exist
if not os.path.exists(CSV_FILE):
    df = pd.DataFrame(columns=['Name', 'Email', 'Message', 'Date'])
    df.to_csv(CSV_FILE, index=False)

@app.route('/',methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json(silent=True)

    if data is None:
        data = {
            'name': request.form.get('name'),
            'email': request.form.get('email'),
            'message': request.form.get('message'),
        }

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'error': 'Please fill all fields'}), 400

    # Append submission to CSV
    df = pd.DataFrame([{
        'Name': name,
        'Email': email,
        'Message': message,
        'Date': datetime.now().isoformat()
    }])
    df.to_csv(CSV_FILE, mode='a', header=False, index=False)
    return jsonify({'success': True, 'message': 'Message saved to CSV!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
