from typing import List, Optional

from pydantic import BaseModel, Field


class ServiceItem(BaseModel):

    name: str

    price: float = Field(
        ge=0
    )


class Booking(BaseModel):

    customer_name: str = Field(
        min_length=2,
        max_length=100
    )

    phone: str = Field(
        min_length=10,
        max_length=20
    )

    vehicle_brand: str = Field(
        min_length=1
    )

    vehicle_model: str = Field(
        min_length=1,
        max_length=100
    )

    registration_number: str = Field(
        min_length=3,
        max_length=30
    )

    services: List[ServiceItem] = Field(
        min_length=1
    )

    booking_date: str

    booking_time: str

    total_price: float = Field(
        ge=0
    )

    notes: Optional[str] = ""