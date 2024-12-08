import uuid
from flask import Flask, jsonify, request
from firebase_config import db

app = Flask(__name__)


# Endpoint to add a new question
@app.route('/api/add-question', methods=['POST'])
def add_question():
    """
    Add a question to the 'Questions-General' collection in Firestore.

    Expected JSON payload:
    {
        "title": <<Question title>>,
        "question": <<The actual question>>,
        "answer": <<The answer to the question>>
    }
    """
    try:
        # Extract data from the request
        data = request.json
        title = data.get('title')
        question = data.get('question')
        answer = data.get('answer')

        # Check if required fields are provided
        if not title or not question or not answer:
            return (jsonify({"success": False,
                             "message": "Missing required fields"}),
                    400)

        # Generate a unique question ID, then push
        question_id = str(uuid.uuid4())
        doc_ref = db.collection('Questions-General').document(f'Qu--{question_id}')
        doc_ref.set({
            "title": title,
            "question": question,
            "answer": answer
        })

        return (jsonify({"success": True,
                         "message": "Question added successfully!"}),
                200)

    except Exception as e:
        return (jsonify({"success": False,
                         "error": str(e)}),
                500)


# Endpoint to retrieve a question by its ID
@app.route('/api/get-question', methods=['GET'])
def get_question():
    """
    Retrieve a question from the 'Questions-General' collection using its ID.

    Expected JSON payload:
    {
        "question_id": <<Said question ID>>
    }
    """
    try:
        data = request.json
        question_id = data.get('question_id')

        # Check if the question ID is provided
        if not question_id:
            return (jsonify({"success": False,
                             "message": "No question ID was given."}),
                    400)

        # Retrieve the question document
        doc_ref = db.collection('Questions-General').document(question_id)
        question_data = doc_ref.get().to_dict()

        # Check if the question exists
        if not question_data:
            return (jsonify({"success": False,
                             "message": "Question not found."}),
                    404)

        return (jsonify({"success": True,
                         "message": "Question retrieved successfully!",
                         "content": question_data}),
                200)

    except Exception as e:
        return (jsonify({"success": False,
                         "error": str(e)}),
                500)


# Endpoint to update an existing question
@app.route('/api/update-question', methods=['POST'])
def update_question():
    """
    Update an existing question in the 'Questions-General' collection.

    Expected JSON payload:
    {
        "question_id": <<Said question ID>>,
        "title": <<Updated title (optional)>>,
        "question": <<Updated question (optional)>>,
        "answer": <<Updated answer (optional)>>
    }
    """
    try:
        data = request.json
        question_id = data.get('question_id')
        title = data.get('title')
        question = data.get('question')
        answer = data.get('answer')

        # Check if the question ID is provided
        if not question_id:
            return (jsonify({"success": False,
                             "message": "Question ID is required."}),
                    400)

        # Update the specified fields
        doc_ref = db.collection('Questions-General').document(question_id)
        updates = {}
        if title:
            updates["title"] = title
        if question:
            updates["question"] = question
        if answer:
            updates["answer"] = answer

        if updates:
            doc_ref.update(updates)

        return (jsonify({"success": True,
                         "message": "Question updated successfully!"}),
                200)

    except Exception as e:
        return (jsonify({"success": False,
                         "error": str(e)}),
                500)


# Endpoint to delete a question by its ID
@app.route('/api/delete-question', methods=['DELETE'])
def delete_question():
    """
    Delete a question from the 'Questions-General' collection using its ID.

    Expected JSON payload:
    {
        "question_id": "The ID of the question to delete"
    }
    """
    try:
        data = request.json
        question_id = data.get('question_id')

        # Check if the question ID is provided
        if not question_id:
            return (jsonify({"success": False,
                             "message": "No question ID was given."}),
                    400)

        # Delete the question document
        doc_ref = db.collection('Questions-General').document(question_id)
        print(doc_ref.get().to_dict())

        if not doc_ref.get().to_dict():
            return (jsonify({"success": False,
                             "message": "Question not found."}),
                    404)

        doc_ref.delete()

        return (jsonify({"success": True,
                         "message": "Question deleted successfully!"}),
                200)

    except Exception as e:
        return (jsonify({"success": False,
                         "error": str(e)}),
                500)


if __name__ == '__main__':
    app.run(debug=True)
