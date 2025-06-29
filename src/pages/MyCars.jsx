import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

const MyCars = () => {
  const { user } = useAuth();
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
        axios.delete(`http://localhost:3000/cars/${id}`).then(() => {
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
      available: form.available.value === "true",
      regNumber: form.regNumber.value,
      features: form.features.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      location: form.location.value,
    };

    axios.put(`http://localhost:3000/cars/${selectedCar._id}`, updated).then(() => {
      Swal.fire("Updated!", "Car info updated.", "success");
      form.reset();
      setSelectedCar(null);
      fetchMyCars();
    });
  };

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary">My Listed Cars</h2>

      {myCars.length === 0 ? (
        <p>
          You haven't added any cars yet.{' '}
          <Link to="/add-car" className="text-blue-500 underline">Add a Car</Link>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Model</th>
                <th>Price</th>
                <th>Bookings</th>
                <th>Available</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img src={car.imageUrl} alt={car.model} className="w-20 h-12 object-cover rounded" />
                  </td>
                  <td>{car.model}</td>
                  <td>${car.dailyPrice}</td>
                  <td>{car.bookingCount || 0}</td>
                  <td>{car.available ? "Yes" : "No"}</td>
                  <td>{new Date(car.datePosted).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        document.getElementById("update_modal").showModal();
                      }}
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
        <dialog id="update_modal" className="modal">
          <form method="dialog" className="modal-box" onSubmit={handleUpdate}>
            <h3 className="font-bold text-lg mb-2">Update Car Info</h3>
            <input name="model" defaultValue={selectedCar.model} className="input input-bordered w-full mb-2" required />
            <input name="dailyPrice" type="number" defaultValue={selectedCar.dailyPrice} className="input input-bordered w-full mb-2" required />
            <select name="available" className="select select-bordered w-full mb-2" defaultValue={selectedCar.available.toString()}>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
            <input name="regNumber" defaultValue={selectedCar.regNumber} className="input input-bordered w-full mb-2" required />
            <input name="features" defaultValue={selectedCar.features} className="input input-bordered w-full mb-2" required />
            <input name="imageUrl" defaultValue={selectedCar.imageUrl} className="input input-bordered w-full mb-2" required />
            <input name="location" defaultValue={selectedCar.location} className="input input-bordered w-full mb-2" required />
            <textarea name="description" defaultValue={selectedCar.description} className="textarea textarea-bordered w-full mb-2" required />

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn" onClick={() => setSelectedCar(null)}>Cancel</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyCars;
