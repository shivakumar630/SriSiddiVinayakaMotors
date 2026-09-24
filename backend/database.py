import os

from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()


MONGODB_URL = os.getenv("MONGODB_URL")


if not MONGODB_URL:
    raise ValueError(
        "MONGODB_URL is missing. Please add it to backend/.env"
    )


client = MongoClient(
    MONGODB_URL,
    serverSelectionTimeoutMS=5000
)


database = client["siddivinayakamotors"]


bookings_collection = database["bookings"]