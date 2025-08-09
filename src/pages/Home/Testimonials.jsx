import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const feedbacks = [
    {
      name: "Rakib Hasan",
      feedback: "GariLagbe made my trip super easy! Booking was smooth and the car was in perfect condition.",
      location: "Dhaka, Bangladesh",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Nusrat Jahan",
      feedback: "Best car rental service I’ve used so far. Affordable prices and very friendly support team!",
      location: "Chittagong, Bangladesh",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Sazzad Karim",
      feedback: "I needed a luxury car for a wedding, and GariLagbe delivered exactly what I wanted. Highly recommended!",
      location: "Sylhet, Bangladesh",
      img: "https://randomuser.me/api/portraits/men/56.jpg"
    }
  ];

  return (
    <section className="bg-base-200 py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        What Our Customers Say
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {feedbacks.map((fb, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <FaQuoteLeft className="text-primary text-3xl mx-auto mb-4" />
            <p className="text-gray-600 italic mb-4">"{fb.feedback}"</p>
            <img
              src={fb.img}
              alt={fb.name}
              className="w-16 h-16 rounded-full mx-auto border-2 border-primary mb-3"
            />
            <h4 className="font-semibold text-lg">{fb.name}</h4>
            <p className="text-sm text-gray-500">{fb.location}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
