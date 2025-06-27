import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const MyCars = () => {
  const { user } = useAuth;
  const [myCars, setMyCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchMyCars = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/cars?email=${user?.email}`);
      setMyCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyCars();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This car will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://your-backend.com/cars/${id}`).then(() => {
          Swal.fire("Deleted!", "Car has been deleted.", "success");
          fetchMyCars();
        });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      model: form.model.value,
      dailyPrice: parseFloat(form.dailyPrice.value),
      location: form.location.value,
    };

    axios.put(`https://your-backend.com/cars/${selectedCar._id}`, updated).then(() => {
      Swal.fire("Updated!", "Car info updated.", "success");
      form.reset();
      fetchMyCars();
    });
  };

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary">My Listed Cars</h2>

      {myCars.length === 0 ? (
        <p>No cars added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Model</th>
                <th>Price</th>
                <th>Location</th>
                <th>Bookings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCars.map((car) => (
                <tr key={car._id}>
                  <td>{car.model}</td>
                  <td>${car.dailyPrice}</td>
                  <td>{car.location}</td>
                  <td>{car.bookingCount}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {selectedCar && (
        <dialog id="update_modal" className="modal modal-open">
          <form method="dialog" className="modal-box" onSubmit={handleUpdate}>
            <h3 className="font-bold text-lg">Update Car Info</h3>
            <input name="model" defaultValue={selectedCar.model} className="input input-bordered w-full my-2" />
            <input name="dailyPrice" type="number" defaultValue={selectedCar.dailyPrice} className="input input-bordered w-full my-2" />
            <input name="location" defaultValue={selectedCar.location} className="input input-bordered w-full my-2" />
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Update</button>
              <button onClick={() => setSelectedCar(null)} className="btn">Close</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyCars;
