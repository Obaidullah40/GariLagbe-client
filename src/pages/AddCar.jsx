import { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AddCar = () => {
  const { user } = useAuth;

  const handleAddCar = async (e) => {
    e.preventDefault();
    const form = e.target;

   const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add additional fields
    data.salary = parseFloat(data.salary);
    data.datePosted = new Date().toISOString();
    data.status = "open";
    data.postedBy = {
      email: user?.email,
      name: user?.displayName,
    };


    try {
      const res = await axios.post("http://localhost:3000/cars", data)
      if (res.data.insertedId) {
        Swal.fire("Success!", "Car added successfully!", "success");
        form.reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <section className="py-12 px-4 md:px-10 max-w-4xl mx-auto bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Add a New Car</h2>

      <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="model" type="text" placeholder="Car Model" className="input input-bordered w-full" required />
        <input name="dailyPrice" type="number" placeholder="Daily Rental Price" className="input input-bordered w-full" required />
        <input name="features" type="text" placeholder="Features (e.g., AC, GPS)" className="input input-bordered w-full" required />
        <input name="regNumber" type="text" placeholder="Vehicle Registration Number" className="input input-bordered w-full" required />
        <input name="location" type="text" placeholder="Location" className="input input-bordered w-full" required />
        <input name="imageUrl" type="text" placeholder="Image URL" className="input input-bordered w-full" required />
        <select name="available" className="select select-bordered w-full">
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <textarea name="description" className="textarea textarea-bordered w-full md:col-span-2" placeholder="Description" required></textarea>

        <button type="submit" className="btn btn-primary md:col-span-2">Add Car</button>
      </form>
    </section>
  );
};

export default AddCar;
