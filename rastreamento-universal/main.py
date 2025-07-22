from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/position', methods=['POST'])
def receive_position():
    data = request.json
    print(f"Received position: {data}")
    return jsonify({"status": "Position received", "data": data}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)