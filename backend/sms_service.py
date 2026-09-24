import os

from dotenv import load_dotenv
from twilio.rest import Client


load_dotenv()


TWILIO_ACCOUNT_SID = os.getenv(
    "TWILIO_ACCOUNT_SID"
)

TWILIO_AUTH_TOKEN = os.getenv(
    "TWILIO_AUTH_TOKEN"
)

TWILIO_PHONE_NUMBER = os.getenv(
    "TWILIO_PHONE_NUMBER"
)

OWNER_PHONE_NUMBER = os.getenv(
    "OWNER_PHONE_NUMBER"
)


def format_phone_number(phone: str) -> str:

    phone = phone.strip()

    phone = phone.replace(
        " ",
        ""
    )

    phone = phone.replace(
        "-",
        ""
    )

    if phone.startswith("+"):
        return phone

    if len(phone) == 10:
        return "+91" + phone

    return phone


def get_twilio_client():

    if not TWILIO_ACCOUNT_SID:
        raise ValueError(
            "TWILIO_ACCOUNT_SID is missing"
        )

    if not TWILIO_AUTH_TOKEN:
        raise ValueError(
            "TWILIO_AUTH_TOKEN is missing"
        )

    if not TWILIO_PHONE_NUMBER:
        raise ValueError(
            "TWILIO_PHONE_NUMBER is missing"
        )

    return Client(
        TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN
    )


def send_sms(
    phone_number: str,
    message: str
):

    client = get_twilio_client()

    formatted_number = format_phone_number(
        phone_number
    )

    sms = client.messages.create(
        body=message,
        from_=TWILIO_PHONE_NUMBER,
        to=formatted_number
    )

    return sms.sid


def send_booking_sms(
    customer_name,
    customer_phone,
    booking_id,
    vehicle_brand,
    vehicle_model,
    registration_number,
    services,
    booking_date,
    booking_time,
    total_price
):

    service_names = ", ".join(
        service["name"]
        for service in services
    )


    customer_message = f"""
Sri Siddi Vinayaka Motors

Dear {customer_name},

Your car service booking has been confirmed.

Booking ID: {booking_id}

Vehicle:
{vehicle_brand} {vehicle_model}

Registration:
{registration_number}

Services:
{service_names}

Date:
{booking_date}

Time:
{booking_time}

Total Amount:
Rs.{total_price:.2f}

Thank you for choosing
Sri Siddi Vinayaka Motors.
"""


    owner_message = f"""
NEW SERVICE BOOKING

Booking ID:
{booking_id}

Customer:
{customer_name}

Phone:
{customer_phone}

Vehicle:
{vehicle_brand} {vehicle_model}

Registration:
{registration_number}

Services:
{service_names}

Date:
{booking_date}

Time:
{booking_time}

Total:
Rs.{total_price:.2f}
"""


    customer_sid = None

    owner_sid = None

    customer_error = None

    owner_error = None


    # Customer SMS

    try:

        customer_sid = send_sms(
            customer_phone,
            customer_message
        )

    except Exception as error:

        customer_error = str(error)

        print(
            "Customer SMS Error:",
            error
        )


    # Owner SMS

    try:

        if not OWNER_PHONE_NUMBER:
            raise ValueError(
                "OWNER_PHONE_NUMBER is missing"
            )

        owner_sid = send_sms(
            OWNER_PHONE_NUMBER,
            owner_message
        )

    except Exception as error:

        owner_error = str(error)

        print(
            "Owner SMS Error:",
            error
        )


    return {

        "customer_sms_sent":
            customer_sid is not None,

        "owner_sms_sent":
            owner_sid is not None,

        "customer_sms_sid":
            customer_sid,

        "owner_sms_sid":
            owner_sid,

        "customer_error":
            customer_error,

        "owner_error":
            owner_error

    }