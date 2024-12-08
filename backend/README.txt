Currently, the API is not cloud-based, so a connection must be made from your own machine.
In order to test the API and set up the platform, do this:
1. Make sure that you have python installed
2. Go to the 'Backend' directory of this project (cd backend)
3. Run 'pip install firestore-admin flask'
4. Run 'python question_handler.py' (For now. Will change to cloud-based solution)
You can run the API on your local domain (http://127.0.0.1:5000/api/...). I'd recommend postman.

- Also, cannot push secrets to git. On production, we'll change the folder name from 'secret' to '.secret', then place it in the .gitignore.
