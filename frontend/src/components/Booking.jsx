import React, {
  useMemo,
  useState
} from "react";

import {
  createBooking,
  getBookings
} from "../api";


const SERVICES = [

  {
    id: 1,
    name: "Oil Change",
    price: 2000,
    icon: "🛢️",
    description:
      "Premium engine oil service"
  },

  {
    id: 2,
    name: "Car Wash",
    price: 500,
    icon: "🚿",
    description:
      "Complete exterior cleaning"
  },

  {
    id: 3,
    name: "Engine Repair",
    price: 8000,
    icon: "🔧",
    description:
      "Engine inspection and repair"
  },

  {
    id: 4,
    name: "Battery Check",
    price: 1500,
    icon: "🔋",
    description:
      "Battery health inspection"
  },

  {
    id: 5,
    name: "Ceramic Coating",
    price: 12000,
    icon: "✨",
    description:
      "Premium paint protection"
  }

];


const BRANDS = [

  "BMW",
  "Audi",
  "Mercedes-Benz",
  "Toyota",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Other"

];


const TIMES = [

  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM"

];


function Booking() {

  const [step, setStep] =
    useState(1);


  const [form, setForm] = useState({

    customerName: "",

    phone: "",

    vehicleBrand: "",

    vehicleModel: "",

    registrationNumber: "",

    bookingDate: "",

    bookingTime: "",

    notes: ""

  });


  const [
    selectedServices,
    setSelectedServices
  ] = useState([]);


  const [bookingId, setBookingId] =
    useState("");


  const [smsStatus, setSmsStatus] =
    useState(null);


  const [bookings, setBookings] =
    useState([]);


  const [showBookings, setShowBookings] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const [success, setSuccess] =
    useState("");


  const totalPrice = useMemo(

    () =>

      selectedServices.reduce(
        (total, service) =>
          total + service.price,
        0
      ),

    [selectedServices]

  );


  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const updateForm = (
    field,
    value
  ) => {

    setForm(
      (current) => ({
        ...current,
        [field]: value
      })
    );

  };


  const toggleService = (
    service
  ) => {

    setSelectedServices(
      (current) => {

        const exists =
          current.some(
            (item) =>
              item.id === service.id
          );


        if (exists) {

          return current.filter(
            (item) =>
              item.id !== service.id
          );

        }


        return [
          ...current,
          service
        ];

      }
    );

  };


  const validateStep = () => {

    setError("");


    if (step === 1) {

      if (!form.customerName.trim()) {

        setError(
          "Please enter your full name."
        );

        return false;

      }


      if (
        !/^[0-9]{10}$/.test(
          form.phone
        )
      ) {

        setError(
          "Please enter a valid 10-digit mobile number."
        );

        return false;

      }

    }


    if (step === 2) {

      if (!form.vehicleBrand) {

        setError(
          "Please select your vehicle brand."
        );

        return false;

      }


      if (!form.vehicleModel.trim()) {

        setError(
          "Please enter your vehicle model."
        );

        return false;

      }


      if (
        !form.registrationNumber.trim()
      ) {

        setError(
          "Please enter your registration number."
        );

        return false;

      }

    }


    if (step === 3) {

      if (
        selectedServices.length === 0
      ) {

        setError(
          "Please select at least one service."
        );

        return false;

      }

    }


    if (step === 4) {

      if (!form.bookingDate) {

        setError(
          "Please select a service date."
        );

        return false;

      }


      if (!form.bookingTime) {

        setError(
          "Please select a service time."
        );

        return false;

      }

    }


    return true;

  };


  const nextStep = () => {

    if (!validateStep()) {
      return;
    }


    setStep(
      (current) =>
        Math.min(current + 1, 5)
    );

  };


  const previousStep = () => {

    setError("");

    setStep(
      (current) =>
        Math.max(current - 1, 1)
    );

  };


  const submitBooking = async () => {

    if (!validateStep()) {
      return;
    }


    setLoading(true);

    setError("");

    setSuccess("");


    try {

      const bookingData = {

        customer_name:
          form.customerName,

        phone:
          form.phone,

        vehicle_brand:
          form.vehicleBrand,

        vehicle_model:
          form.vehicleModel,

        registration_number:
          form.registrationNumber,

        services:
          selectedServices.map(
            (service) => ({

              name:
                service.name,

              price:
                service.price

            })
          ),

        booking_date:
          form.bookingDate,

        booking_time:
          form.bookingTime,

        total_price:
          totalPrice,

        notes:
          form.notes

      };


      const result =
        await createBooking(
          bookingData
        );


      setBookingId(
        result.booking_id
      );


      setSmsStatus(
        result.sms_status
      );


      setSuccess(
        "Your booking has been successfully confirmed."
      );


      setStep(6);


    } catch (bookingError) {

      setError(
        bookingError.message
      );

    } finally {

      setLoading(false);

    }

  };


  const loadBookings = async () => {

    setLoading(true);

    setError("");


    try {

      const result =
        await getBookings();


      setBookings(
        result.bookings || []
      );


      setShowBookings(true);


    } catch (bookingError) {

      setError(
        bookingError.message
      );

    } finally {

      setLoading(false);

    }

  };


  const resetBooking = () => {

    setForm({

      customerName: "",

      phone: "",

      vehicleBrand: "",

      vehicleModel: "",

      registrationNumber: "",

      bookingDate: "",

      bookingTime: "",

      notes: ""

    });


    setSelectedServices([]);

    setBookingId("");

    setSmsStatus(null);

    setError("");

    setSuccess("");

    setStep(1);

  };


  const formatCurrency = (
    amount
  ) => {

    return `₹${Number(amount).toLocaleString(
      "en-IN"
    )}`;

  };


  return (

    <section
      id="booking"
      className="booking-section"
    >


      <div className="section-heading">

        <div className="section-label">
          SERVICE APPOINTMENT
        </div>

        <h2>
          Book Your Car Service
        </h2>

        <p>
          Choose multiple services, select
          your preferred date and time,
          and confirm your appointment.
        </p>

      </div>


      <div className="booking-container">


        {step < 6 && (

          <div className="booking-progress">

            {[
              "Customer",
              "Vehicle",
              "Services",
              "Schedule",
              "Review"
            ].map(
              (label, index) => {

                const number =
                  index + 1;


                return (

                  <div
                    className={
                      number <= step
                        ? "progress-step active"
                        : "progress-step"
                    }
                    key={label}
                  >

                    <div className="progress-circle">

                      {number < step
                        ? "✓"
                        : number}

                    </div>

                    <span>
                      {label}
                    </span>

                  </div>

                );

              }
            )}

          </div>

        )}


        <div className="booking-card">


          {/* ==========================================
              STEP 1
          ========================================== */}

          {step === 1 && (

            <div className="booking-step">

              <div className="booking-step-title">

                <span>
                  STEP 01
                </span>

                <h3>
                  Customer Information
                </h3>

                <p>
                  Tell us who will be bringing
                  the vehicle.
                </p>

              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Full Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={
                      form.customerName
                    }
                    onChange={(event) =>
                      updateForm(
                        "customerName",
                        event.target.value
                      )
                    }
                  />

                </div>


                <div className="form-group">

                  <label>
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(event) =>
                      updateForm(
                        "phone",
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                  />

                </div>

              </div>


              <div className="booking-info-box">

                <span>
                  📱
                </span>

                <p>
                  Booking confirmation and
                  service notification will be
                  sent to this mobile number.
                </p>

              </div>


              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}


              <div className="booking-actions">

                <button
                  className="primary-button"
                  onClick={nextStep}
                >
                  Continue →
                </button>

              </div>

            </div>

          )}


          {/* ==========================================
              STEP 2
          ========================================== */}

          {step === 2 && (

            <div className="booking-step">

              <div className="booking-step-title">

                <span>
                  STEP 02
                </span>

                <h3>
                  Vehicle Information
                </h3>

                <p>
                  Tell us about your vehicle.
                </p>

              </div>


              <div className="form-grid">


                <div className="form-group">

                  <label>
                    Vehicle Brand *
                  </label>

                  <select
                    value={
                      form.vehicleBrand
                    }
                    onChange={(event) =>
                      updateForm(
                        "vehicleBrand",
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Vehicle Brand
                    </option>

                    {BRANDS.map(
                      (brand) => (

                        <option
                          key={brand}
                          value={brand}
                        >
                          {brand}
                        </option>

                      )
                    )}

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Vehicle Model *
                  </label>

                  <input
                    type="text"
                    placeholder="Example: Creta"
                    value={
                      form.vehicleModel
                    }
                    onChange={(event) =>
                      updateForm(
                        "vehicleModel",
                        event.target.value
                      )
                    }
                  />

                </div>


                <div className="form-group full-width">

                  <label>
                    Registration Number *
                  </label>

                  <input
                    type="text"
                    placeholder="Example: TS08AB1234"
                    value={
                      form.registrationNumber
                    }
                    onChange={(event) =>
                      updateForm(
                        "registrationNumber",
                        event.target.value.toUpperCase()
                      )
                    }
                  />

                </div>

              </div>


              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}


              <div className="booking-actions">

                <button
                  className="secondary-button"
                  onClick={previousStep}
                >
                  ← Back
                </button>

                <button
                  className="primary-button"
                  onClick={nextStep}
                >
                  Continue →
                </button>

              </div>

            </div>

          )}


          {/* ==========================================
              STEP 3 - MULTIPLE SERVICES
          ========================================== */}

          {step === 3 && (

            <div className="booking-step">

              <div className="booking-step-title">

                <span>
                  STEP 03
                </span>

                <h3>
                  Select Services
                </h3>

                <p>
                  Select one or multiple services.
                </p>

              </div>


              <div className="booking-services-grid">

                {SERVICES.map(
                  (service) => {

                    const selected =
                      selectedServices.some(
                        (item) =>
                          item.id === service.id
                      );


                    return (

                      <button
                        type="button"
                        key={service.id}
                        className={
                          selected
                            ? "booking-service selected"
                            : "booking-service"
                        }
                        onClick={() =>
                          toggleService(
                            service
                          )
                        }
                      >

                        <div className="booking-service-header">

                          <div className="booking-service-icon">
                            {service.icon}
                          </div>


                          <div
                            className={
                              selected
                                ? "service-check checked"
                                : "service-check"
                            }
                          >
                            {selected
                              ? "✓"
                              : ""}
                          </div>

                        </div>


                        <h4>
                          {service.name}
                        </h4>

                        <p>
                          {service.description}
                        </p>


                        <div className="booking-service-footer">

                          <strong>
                            {formatCurrency(
                              service.price
                            )}
                          </strong>

                          <span>
                            {selected
                              ? "Selected"
                              : "Select"}
                          </span>

                        </div>

                      </button>

                    );

                  }
                )}

              </div>


              {selectedServices.length > 0 && (

                <div className="selected-summary">

                  <div className="summary-heading">

                    <div>
                      Selected Services
                    </div>

                    <span>
                      {selectedServices.length}
                      {" "}
                      selected
                    </span>

                  </div>


                  {selectedServices.map(
                    (service) => (

                      <div
                        className="summary-row"
                        key={service.id}
                      >

                        <span>
                          {service.name}
                        </span>

                        <strong>
                          {formatCurrency(
                            service.price
                          )}
                        </strong>

                      </div>

                    )
                  )}


                  <div className="summary-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      {formatCurrency(
                        totalPrice
                      )}
                    </strong>

                  </div>

                </div>

              )}


              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}


              <div className="booking-actions">

                <button
                  className="secondary-button"
                  onClick={previousStep}
                >
                  ← Back
                </button>

                <button
                  className="primary-button"
                  onClick={nextStep}
                >
                  Continue →
                </button>

              </div>

            </div>

          )}


          {/* ==========================================
              STEP 4
          ========================================== */}

          {step === 4 && (

            <div className="booking-step">

              <div className="booking-step-title">

                <span>
                  STEP 04
                </span>

                <h3>
                  Choose Date & Time
                </h3>

                <p>
                  Select your preferred appointment.
                </p>

              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Service Date *
                  </label>

                  <input
                    type="date"
                    min={today}
                    value={
                      form.bookingDate
                    }
                    onChange={(event) =>
                      updateForm(
                        "bookingDate",
                        event.target.value
                      )
                    }
                  />

                </div>


                <div className="form-group">

                  <label>
                    Service Time *
                  </label>

                  <select
                    value={
                      form.bookingTime
                    }
                    onChange={(event) =>
                      updateForm(
                        "bookingTime",
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Time
                    </option>

                    {TIMES.map(
                      (time) => (

                        <option
                          key={time}
                          value={time}
                        >
                          {time}
                        </option>

                      )
                    )}

                  </select>

                </div>


                <div className="form-group full-width">

                  <label>
                    Additional Notes
                  </label>

                  <textarea
                    placeholder="Tell us about any issue or special request..."
                    value={
                      form.notes
                    }
                    onChange={(event) =>
                      updateForm(
                        "notes",
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>


              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}


              <div className="booking-actions">

                <button
                  className="secondary-button"
                  onClick={previousStep}
                >
                  ← Back
                </button>

                <button
                  className="primary-button"
                  onClick={nextStep}
                >
                  Review Booking →
                </button>

              </div>

            </div>

          )}


          {/* ==========================================
              STEP 5
          ========================================== */}

          {step === 5 && (

            <div className="booking-step">

              <div className="booking-step-title">

                <span>
                  STEP 05
                </span>

                <h3>
                  Review Your Booking
                </h3>

                <p>
                  Check all details before confirming.
                </p>

              </div>


              <div className="review-grid">


                <div className="review-box">

                  <span>
                    CUSTOMER
                  </span>

                  <strong>
                    {form.customerName}
                  </strong>

                  <p>
                    📱 {form.phone}
                  </p>

                </div>


                <div className="review-box">

                  <span>
                    VEHICLE
                  </span>

                  <strong>
                    {form.vehicleBrand}
                    {" "}
                    {form.vehicleModel}
                  </strong>

                  <p>
                    {form.registrationNumber}
                  </p>

                </div>


                <div className="review-box">

                  <span>
                    APPOINTMENT
                  </span>

                  <strong>
                    {form.bookingDate}
                  </strong>

                  <p>
                    {form.bookingTime}
                  </p>

                </div>

              </div>


              <div className="review-services">

                <h4>
                  Selected Services
                </h4>


                {selectedServices.map(
                  (service) => (

                    <div
                      className="review-service-row"
                      key={service.id}
                    >

                      <span>
                        {service.name}
                      </span>

                      <strong>
                        {formatCurrency(
                          service.price
                        )}
                      </strong>

                    </div>

                  )
                )}


                <div className="review-total">

                  <span>
                    Grand Total
                  </span>

                  <strong>
                    {formatCurrency(
                      totalPrice
                    )}
                  </strong>

                </div>

              </div>


              {form.notes && (

                <div className="review-notes">

                  <strong>
                    Notes
                  </strong>

                  <p>
                    {form.notes}
                  </p>

                </div>

              )}


              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}


              <div className="booking-actions">

                <button
                  className="secondary-button"
                  onClick={previousStep}
                >
                  ← Back
                </button>

                <button
                  className="primary-button"
                  onClick={submitBooking}
                  disabled={loading}
                >

                  {loading
                    ? "Confirming..."
                    : "Confirm Booking ✓"}

                </button>

              </div>

            </div>

          )}


          {/* ==========================================
              STEP 6
          ========================================== */}

          {step === 6 && (

            <div className="confirmation">

              <div className="success-icon">
                ✓
              </div>


              <span className="confirmation-label">
                BOOKING CONFIRMED
              </span>


              <h3>
                Your Service is Booked!
              </h3>


              <p>
                Thank you, {form.customerName}.
                Your service appointment has been
                successfully created.
              </p>


              <div className="booking-id">

                <span>
                  BOOKING ID
                </span>

                <strong>
                  {bookingId}
                </strong>

              </div>


              {smsStatus && (

                <div className="sms-status">

                  <h4>
                    📱 SMS Notification
                  </h4>


                  <div>

                    <span>
                      Customer SMS
                    </span>

                    <strong
                      className={
                        smsStatus.customer_sms_sent
                          ? "sms-success"
                          : "sms-failed"
                      }
                    >
                      {smsStatus.customer_sms_sent
                        ? "✓ Sent"
                        : "✕ Failed"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Owner SMS
                    </span>

                    <strong
                      className={
                        smsStatus.owner_sms_sent
                          ? "sms-success"
                          : "sms-failed"
                      }
                    >
                      {smsStatus.owner_sms_sent
                        ? "✓ Sent"
                        : "✕ Failed"}
                    </strong>

                  </div>

                </div>

              )}


              <div className="confirmation-actions">

                <button
                  className="primary-button"
                  onClick={loadBookings}
                >
                  📋 View Bookings
                </button>


                <button
                  className="secondary-button"
                  onClick={resetBooking}
                >
                  + New Booking
                </button>

              </div>

            </div>

          )}

        </div>


        {/* ==========================================
            VIEW BOOKINGS
        ========================================== */}

        <div className="booking-history-section">

          <button
            className="history-toggle"
            onClick={loadBookings}
            disabled={loading}
          >

            📋

            <span>
              {loading
                ? "Loading..."
                : "View Existing Bookings"}
            </span>

            <span>
              →
            </span>

          </button>


          {showBookings && (

            <div className="booking-history">

              <div className="history-header">

                <div>

                  <span>
                    BOOKING HISTORY
                  </span>

                  <h3>
                    Service Bookings
                  </h3>

                </div>


                <button
                  onClick={() =>
                    setShowBookings(false)
                  }
                >
                  ×
                </button>

              </div>


              {bookings.length === 0 ? (

                <div className="empty-history">

                  <div>
                    📋
                  </div>

                  <h4>
                    No bookings found
                  </h4>

                  <p>
                    Booking history will appear here.
                  </p>

                </div>

              ) : (

                <div className="history-list">

                  {bookings.map(
                    (booking) => (

                      <div
                        className="history-card"
                        key={booking.booking_id}
                      >

                        <div className="history-card-top">

                          <div>

                            <span>
                              BOOKING ID
                            </span>

                            <strong>
                              {booking.booking_id}
                            </strong>

                          </div>


                          <div className="status-badge">
                            Confirmed
                          </div>

                        </div>


                        <div className="history-details">


                          <div>

                            <span>
                              Customer
                            </span>

                            <strong>
                              {booking.customer_name}
                            </strong>

                          </div>


                          <div>

                            <span>
                              Vehicle
                            </span>

                            <strong>
                              {booking.vehicle_brand}
                              {" "}
                              {booking.vehicle_model}
                            </strong>

                          </div>


                          <div>

                            <span>
                              Date
                            </span>

                            <strong>
                              {booking.booking_date}
                            </strong>

                          </div>


                          <div>

                            <span>
                              Time
                            </span>

                            <strong>
                              {booking.booking_time}
                            </strong>

                          </div>


                          <div>

                            <span>
                              Phone
                            </span>

                            <strong>
                              {booking.phone}
                            </strong>

                          </div>


                          <div>

                            <span>
                              Total
                            </span>

                            <strong>
                              {formatCurrency(
                                booking.total_price
                              )}
                            </strong>

                          </div>


                        </div>


                        <div className="history-services">

                          {booking.services?.map(
                            (service) => (

                              <span
                                key={service.name}
                              >
                                {service.name}
                              </span>

                            )
                          )}

                        </div>


                        {booking.sms_status && (

                          <div className="history-sms">

                            <span>

                              Customer SMS:

                              {" "}

                              {booking
                                .sms_status
                                .customer_sms_sent
                                ? "✓ Sent"
                                : "✕ Failed"}

                            </span>


                            <span>

                              Owner SMS:

                              {" "}

                              {booking
                                .sms_status
                                .owner_sms_sent
                                ? "✓ Sent"
                                : "✕ Failed"}

                            </span>

                          </div>

                        )}

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </section>

  );
}


export default Booking;