from datetime import datetime
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import (
    bookings_collection,
    client
)

from models import Booking

from sms_service import (
    send_booking_sms
)


app = FastAPI(
    title="Sri Siddi Vinayaka Motors API",
    description="Premium Car Garage Booking API",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# =========================================================
# SERVICE PRICE MASTER
# =========================================================

SERVICE_PRICES = {

    "Oil Change": 2000,

    "Car Wash": 500,

    "Engine Repair": 8000,

    "Battery Check": 1500,

    "Ceramic Coating": 12000

}


# =========================================================
# BOOKING ID
# =========================================================

def generate_booking_id():

    random_part = uuid4().hex[:6].upper()

    return f"SVM-{random_part}"


# =========================================================
# HOME API
# =========================================================

@app.get("/")
def root():

    return {

        "success": True,

        "message":
            "Sri Siddi Vinayaka Motors API is running",

        "status":
            "online"

    }


# =========================================================
# TEST MONGODB
# =========================================================

@app.get("/api/test-db")
def test_database():

    try:

        client.admin.command(
            "ping"
        )

        return {

            "success": True,

            "message":
                "MongoDB connected successfully"

        }

    except Exception:

        raise HTTPException(

            status_code=500,

            detail=
                "MongoDB connection failed"

        )


# =========================================================
# CREATE BOOKING
# =========================================================

@app.post("/api/bookings")
def create_booking(
    booking: Booking
):

    try:

        # -------------------------------------------------
        # Validate services and calculate total on server
        # -------------------------------------------------

        final_services = []

        calculated_total = 0


        for service in booking.services:

            if service.name not in SERVICE_PRICES:

                raise HTTPException(

                    status_code=400,

                    detail=
                        f"Invalid service: {service.name}"

                )


            official_price = SERVICE_PRICES[
                service.name
            ]


            final_services.append({

                "name":
                    service.name,

                "price":
                    official_price

            })


            calculated_total += official_price


        # -------------------------------------------------
        # Generate booking ID
        # -------------------------------------------------

        booking_id = generate_booking_id()


        # -------------------------------------------------
        # Prepare MongoDB document
        # -------------------------------------------------

        booking_document = {

            "booking_id":
                booking_id,

            "customer_name":
                booking.customer_name,

            "phone":
                booking.phone,

            "vehicle_brand":
                booking.vehicle_brand,

            "vehicle_model":
                booking.vehicle_model,

            "registration_number":
                booking.registration_number,

            "services":
                final_services,

            "booking_date":
                booking.booking_date,

            "booking_time":
                booking.booking_time,

            "total_price":
                calculated_total,

            "notes":
                booking.notes,

            "created_at":
                datetime.now().isoformat(),

            "sms_status": {

                "customer_sms_sent":
                    False,

                "owner_sms_sent":
                    False

            }

        }


        # -------------------------------------------------
        # Save to MongoDB
        # -------------------------------------------------

        result = bookings_collection.insert_one(
            booking_document
        )


        # -------------------------------------------------
        # Send SMS
        # -------------------------------------------------

        sms_result = send_booking_sms(

            customer_name=
                booking.customer_name,

            customer_phone=
                booking.phone,

            booking_id=
                booking_id,

            vehicle_brand=
                booking.vehicle_brand,

            vehicle_model=
                booking.vehicle_model,

            registration_number=
                booking.registration_number,

            services=
                final_services,

            booking_date=
                booking.booking_date,

            booking_time=
                booking.booking_time,

            total_price=
                calculated_total

        )


        # -------------------------------------------------
        # Update SMS status
        # -------------------------------------------------

        bookings_collection.update_one(

            {
                "_id":
                    result.inserted_id
            },

            {
                "$set": {

                    "sms_status":
                        sms_result

                }
            }

        )


        return {

            "success": True,

            "message":
                "Booking created successfully",

            "booking_id":
                booking_id,

            "total_price":
                calculated_total,

            "sms_status":
                sms_result

        }


    except HTTPException:

        raise


    except Exception as error:

        print(
            "Booking Error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail=
                "Unable to create booking"

        )


# =========================================================
# GET ALL BOOKINGS
# =========================================================

@app.get("/api/bookings")
def get_bookings():

    try:

        bookings = list(

            bookings_collection.find(

                {},

                {
                    "_id": 0
                }

            ).sort(

                "created_at",

                -1

            )

        )


        return {

            "success": True,

            "count":
                len(bookings),

            "bookings":
                bookings

        }


    except Exception as error:

        print(
            "Get Bookings Error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail=
                "Unable to load bookings"

        )


# =========================================================
# GET SINGLE BOOKING
# =========================================================

@app.get(
    "/api/bookings/{booking_id}"
)
def get_single_booking(
    booking_id: str
):

    try:

        booking = bookings_collection.find_one(

            {
                "booking_id":
                    booking_id
            },

            {
                "_id": 0
            }

        )


        if not booking:

            raise HTTPException(

                status_code=404,

                detail=
                    "Booking not found"

            )


        return {

            "success": True,

            "booking":
                booking

        }


    except HTTPException:

        raise


    except Exception:

        raise HTTPException(

            status_code=500,

            detail=
                "Unable to find booking"

        )