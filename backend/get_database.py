import pymongo

# TODO: Replace this with our proper database -> this is mine for testing
CONNECTION_STRING = "mongodb+srv://ado5632:FmY4tRWgbT58DF15@test.nqmouii.mongodb.net/?retryWrites=true&w=majority"

def get_database():
    client = pymongo.MongoClient(CONNECTION_STRING)
    return client["sfcars"]

if __name__ == "__main__":
    db = get_database()