import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`https://gari-lagbe-server.vercel.app/available-cars/${id}`)
      .then((res) => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;

  if (!car) {
    return <div className="text-center py-20 text-gray-500">Car not found.</div>;
  }

  // Handle Booking Confirmation
  const handleBookingConfirm = async () => {
    const bookingData = {
      carId: car._id,
      userEmail: user?.email,
      userName: user?.displayName,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      totalPrice: parseFloat(car.dailyPrice),
      status: "confirmed",
      bookingDate: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "https://gari-lagbe-server.vercel.app/bookings",
        bookingData
      );
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          title: "✅ Booking Confirmed!",
          text: `You have booked ${car.model}`,
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        document.getElementById("book_modal").close();
      } else {
        throw new Error("Booking failed");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Booking failed. Try again.", "error");
    }
  };

  return (
    <section className="py-12 px-4 md:px-10 max-w-4xl mx-auto bg-base-200 rounded-lg shadow-lg">
      {/* Car Image */}
      <motion.div
        className="mb-6 overflow-hidden rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={car.imageUrl}
          alt={car.model}
          className="w-full h-64 object-cover transform hover:scale-110 transition duration-500"
        />
      </motion.div>

      {/* Car Info */}
      <h2 className="text-3xl font-bold text-primary mb-2">{car.model}</h2>
      <p className="text-gray-600 mb-1">📍 Location: {car.location}</p>
      <p className="text-gray-600 mb-1">💰 Price: ${car.dailyPrice}/day</p>
      <p className="text-gray-600 mb-1">⚙ Features: {car.features}</p>
      <p className="text-gray-600 mb-1">
        🆔 Registration Number: {car.regNumber}
      </p>
      <p className="text-gray-600 mb-1">
        ✅ Available: {car.available ? "Yes" : "No"}
      </p>
      <p className="text-gray-600 mb-4">
        📅 Posted on: {new Date(car.datePosted).toLocaleDateString()}
      </p>

      {/* Description */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Description:</h3>
        <p className="text-gray-700 leading-relaxed">{car.description}</p>
      </div>

      {/* Book Button */}
      <button
        className="btn btn-primary mt-6"
        onClick={() => document.getElementById("book_modal").showModal()}
      >
        🚗 Book This Car
      </button>

      {/* Booking Modal */}
      <dialog id="book_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Booking</h3>
          <p>
            <strong>Model:</strong> {car.model}
          </p>
          <p>
            <strong>Price:</strong> ${car.dailyPrice}/day
          </p>
          <p>
            <strong>Location:</strong> {car.location}
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Do you want to confirm the booking of this car?
          </p>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleBookingConfirm}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("book_modal").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
};

export default CarDetails;
