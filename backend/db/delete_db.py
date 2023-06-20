from db import get_database

mydb = get_database()
mycol = mydb["UserAccount"]

mycol.delete_many({})