import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";


const RecentListings = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Replace with your backend API
        axios.get("http://localhost:3000/cars")
            .then(res => setCars(res.data.slice(0, 6)))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="py-16 px-4 md:px-10 bg-base-100">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
                Recent Listings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {cars.map((car) => (
                    <div
                        key={car._id}
                        className="card bg-base-200 shadow-md hover:shadow-xl transition-transform hover:scale-[1.02]"
                    >
                        <figure>
                            <img src={car.imageUrl} alt={car.model} className="h-52 w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">{car.model}</h2>
                            <p className="text-primary font-semibold">${car.dailyPrice} / day</p>
                            <p className="text-sm text-gray-500">Bookings: {car.bookingCount}</p>
                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                                <FaCalendarAlt />
                                <span>Posted: {car.datePosted || "N/A"}</span>
                            </div>
                            {car.available ? (
                                <span className="badge badge-success mt-2">Available</span>
                            ) : (
                                <span className="badge badge-error mt-2">Not Available</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentListings;