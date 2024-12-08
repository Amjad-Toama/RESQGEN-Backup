import os
import firebase_admin
from firebase_admin import credentials, firestore


def initialize_firebase():
    # Set up the path to the service account key
    cdir = os.path.dirname(__file__)
    filepath = os.path.join(cdir, '.secret/resqgen-be-key.json')

    # Initialise Firebase Admin SDK
    cred = credentials.Certificate(filepath)
    firebase_admin.initialize_app(cred)

    # Initialise Firestore and return it
    return firestore.client()


# Attach DB to API
db = initialize_firebase()
