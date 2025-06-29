import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";


const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    axios.get("http://localhost:3000/cars").then((res) => {
      setCars(res.data);
    });
  }, []);

  const sortedCars = [...cars].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.datePosted) - new Date(a.datePosted);
    } else if (sortOption === "oldest") {
      return new Date(a.datePosted) - new Date(b.datePosted);
    } else if (sortOption === "low-price") {
      return a.dailyPrice - b.dailyPrice;
    } else if (sortOption === "high-price") {
      return b.dailyPrice - a.dailyPrice;
    }
    return 0;
  });

  return (
    <section className="py-16 px-4 md:px-10 bg-base-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-primary">Available Cars</h2>

        <div className="flex items-center gap-4">
          <select
            className="select select-bordered"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Date: Newest First</option>
            <option value="oldest">Date: Oldest First</option>
            <option value="low-price">Price: Low to High</option>
            <option value="high-price">Price: High to Low</option>
          </select>

          <button onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="btn btn-sm">
            {view === "grid" ? "List View" : "Grid View"}
          </button>
        </div>
      </div>

      {sortedCars.length === 0 ? (
        <p className="text-center text-gray-500">No cars available.</p>
      ) : (
        <div className={`grid ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "grid-cols-1 gap-4"} max-w-7xl mx-auto`}>
          {sortedCars.map((car) => (
            <div key={car._id} className="card bg-base-200 shadow-md">
              <figure className="h-52 overflow-hidden">
                <img src={car.imageUrl} alt={car.model} className="object-cover w-full h-full" />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-bold text-primary">{car.model}</h2>
                <p className="text-sm text-gray-500">Location: {car.location}</p>
                <p className="text-sm text-gray-500">Price: ${car.dailyPrice}/day</p>
                <p className="text-sm text-gray-500">
                  Posted: {new Date(car.datePosted).toLocaleDateString()}
                </p>
                <Link to={`/car/${car._id}`} className="btn btn-primary btn-sm mt-2">
                  Book Now
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

