import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/available-cars")
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 bg-base-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        Available Cars for Rent
      </h2>

      {cars.length === 0 ? (
        <p className="text-center text-gray-500">No cars available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cars.map((car) => (
            <div key={car._id} className="card bg-base-200 shadow hover:shadow-lg transition">
              <figure>
                <img src={car.imageUrl} alt={car.model} className="w-full h-52 object-cover" />
              </figure>
              <div className="card-body space-y-2">
                <h3 className="text-xl font-bold text-primary">{car.model}</h3>
                {/* <p className="text-gray-600">{car.description.slice(0, 100)}...</p> */}
                <p className="text-sm text-gray-500">Location: {car.location}</p>
                <p className="text-sm text-gray-500">Price: ${car.dailyPrice}/day</p>
                <Link to={`/car/${car._id}`}>
                  <button className="btn btn-primary btn-sm">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableCars;
