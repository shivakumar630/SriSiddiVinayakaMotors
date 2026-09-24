const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://srisiddivinayakamotors.onrender.com";


export async function createBooking(
  bookingData
) {

  const response = await fetch(
    `${API_URL}/api/bookings`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body:
        JSON.stringify(bookingData)
    }
  );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Unable to create booking"
    );

  }


  return data;
}


export async function getBookings() {

  const response = await fetch(
    `${API_URL}/api/bookings`
  );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Unable to load bookings"
    );

  }


  return data;
}


export async function getBooking(
  bookingId
) {

  const response = await fetch(
    `${API_URL}/api/bookings/${bookingId}`
  );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Booking not found"
    );

  }


  return data;
}


export async function testBackend() {

  const response =
    await fetch(
      `${API_URL}/`
    );


  return response.json();
}


export async function testDatabase() {

  const response =
    await fetch(
      `${API_URL}/api/test-db`
    );


  return response.json();
}