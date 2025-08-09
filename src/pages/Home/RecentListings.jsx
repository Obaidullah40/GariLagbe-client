import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../Shared/Loading";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://gari-lagbe-server.vercel.app/available-cars")
      .then((res) => {
        setCars(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="py-16 px-4 md:px-10 bg-base-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        Recent Listings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="card bg-base-200 shadow-md hover:shadow-xl overflow-hidden group rounded-lg"
          >
            <figure className="relative h-52 w-full overflow-hidden">
              <motion.img
                src={car.imageUrl}
                alt={car.model}
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.1 }}
              />
              {/* Smooth Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
              {/* Text on hover */}
              <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-bold">{car.model}</p>
                <p className="text-sm">${car.dailyPrice} / day</p>
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-bold">{car.model}</h2>
              <p className="text-primary font-semibold">
                ${car.dailyPrice} / day
              </p>
              <p className="text-sm text-gray-500">
                Bookings: {car.bookingCount}
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                <FaCalendarAlt />
                <span>
                  Posted:{" "}
                  {car.datePosted
                    ? new Date(car.datePosted).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              {car.available ? (
                <span className="badge badge-success mt-2">Available</span>
              ) : (
                <span className="badge badge-error mt-2">Not Available</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
