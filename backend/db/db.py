import pymongo
import atexit

CONNECTION_STRING = "mongodb+srv://z5320020:z5320020@comp3900-testing-enviro.h7vby3z.mongodb.net/?retryWrites=true&w=majority"

def get_database():
    client = pymongo.MongoClient(CONNECTION_STRING)
    return client["comp3900"]

@atexit.register
def clear_database():
    client = pymongo.MongoClient(CONNECTION_STRING)
    db = client["comp3900"]

    user_to_keep_email = 'test@example.com'  # email of the user you want to keep

    # Assuming 'users' collection
    user_to_keep = db.users.find_one({'email': user_to_keep_email})

    if user_to_keep:
        db.users.delete_many({'email': {'$ne': user_to_keep_email}})

    # If there are other collections you want to keep related data, you would need to handle them here.

    # For any other collections, just drop them.
    for collection_name in db.list_collection_names():
        if collection_name != 'UserAccount':
            db.drop_collection(collection_name)
    