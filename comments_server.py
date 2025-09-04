# Python Flask backend for comments
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
comments = []

@app.route('/api/comments', methods=['GET'])
def get_comments():
    return jsonify(comments)

@app.route('/api/comments', methods=['POST'])
def post_comment():
    data = request.get_json()
    name = data.get('name')
    comment = data.get('comment')
    if name and comment:
        comments.append({'name': name, 'comment': comment, 'date': str(datetime.datetime.now())})
        return jsonify({'success': True}), 201
    return jsonify({'success': False, 'error': 'Name and comment required.'}), 400

if __name__ == '__main__':
    app.run(port=4000)
