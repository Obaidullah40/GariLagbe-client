import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { FaTrashAlt, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDates, setNewDates] = useState({ start: "", end: "" });

  // Load bookings with car details
  useEffect(() => {
    if (!user?.email) return;

    axios.get(`http://localhost:3000/bookings?email=${user.email}`)
      .then(async res => {
        const rawBookings = res.data;

        // enrich each booking with car info
        const enriched = await Promise.all(
          rawBookings.map(async booking => {
            const carRes = await axios.get(`http://localhost:3000/available-cars/${booking.carId}`);
            return {
              ...booking,
              car: carRes.data
            };
          })
        );

        setBookings(enriched);
      });
  }, [user]);

  // Cancel booking
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      await axios.put(`http://localhost:3000/bookings/${id}`, { status: "canceled" });
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status: "canceled" } : b)
      );
      Swal.fire("Canceled!", "Booking has been canceled.", "success");
    }
  };

  // Modify booking
  const handleModifySubmit = async () => {
    await axios.put(`http://localhost:3000/bookings/${selectedBooking._id}`, {
      startDate: newDates.start,
      endDate: newDates.end
    });

    setBookings(prev =>
      prev.map(b =>
        b._id === selectedBooking._id
          ? { ...b, startDate: newDates.start, endDate: newDates.end }
          : b
      )
    );

    Swal.fire("Updated!", "Booking dates updated.", "success");
    document.getElementById("modify_modal").close();
  };

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-300 text-base font-semibold">
            <tr>
              <th>Car</th>
              <th>Model</th>
              <th>Booking Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id} className="hover:bg-base-200">
                <td>
                  <img src={booking.car?.imageUrl} alt="car" className="w-16 h-10 object-cover rounded" />
                </td>
                <td>{booking.car?.model || "Unknown"}</td>
                <td>{format(new Date(booking.bookingDate), "dd-MM-yyyy HH:mm")}</td>
                <td>${booking.totalPrice}</td>
                <td className={`capitalize font-medium ${booking.status === "canceled" ? "text-red-500" : "text-green-600"}`}>
                  {booking.status}
                </td>
                <td className="flex space-x-3">
                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleCancel(booking._id)}
                  >
                    <FaTrashAlt /> Cancel
                  </button>

                  <button
                    className="btn btn-sm btn-info flex items-center gap-1"
                    onClick={() => {
                      setSelectedBooking(booking);
                      document.getElementById("modify_modal").showModal();
                    }}
                  >
                    <FaCalendarAlt /> Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modify Modal */}
      <dialog id="modify_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold mb-4">Modify Booking Date</h3>
          <input
            type="date"
            className="input input-bordered w-full mb-3"
            value={newDates.start}
            onChange={(e) => setNewDates({ ...newDates, start: e.target.value })}
            required
          />
          <input
            type="date"
            className="input input-bordered w-full mb-3"
            value={newDates.end}
            onChange={(e) => setNewDates({ ...newDates, end: e.target.value })}
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary" onClick={handleModifySubmit}>Confirm</button>
            <button type="button" className="btn" onClick={() => document.getElementById("modify_modal").close()}>Cancel</button>
          </div>
        </form>
      </dialog>
    </section>
  );
};

export default MyBookings;
