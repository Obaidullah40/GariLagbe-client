import { motion } from "framer-motion";
import { FaCarSide, FaUsers, FaHandshake, FaStar, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router";

const testimonials = [
  {
    name: "John Doe",
    review: "Fantastic service! Easy booking, great cars, and amazing support. Highly recommended!",
    img: "https://sosafe-awareness.com/sosafe-files/uploads/2022/08/author-profile-picture.png",
    rating: 5,
  },
  {
    name: "Sarah Ahmed",
    review: "Loved the transparency in pricing. The car was clean and exactly as described.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    name: "Michael Smith",
    review: "Best rental experience I’ve had. Friendly staff and great customer service.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
  })
};

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:w-1/2 space-y-5"
          >
            <h1 className="text-5xl font-extrabold leading-tight">
              About <span className="text-yellow-300">GariLagbe</span>
            </h1>
            <p className="text-lg opacity-90">
              Your trusted platform for car rentals. Affordable, transparent, and easy-to-use —
              whether it’s for a day, a week, or a month, we’ve got the perfect ride for you.
            </p>
            <Link to="/available-cars">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn bg-yellow-300 text-primary border-none font-bold"
              >
                Explore Cars
              </motion.button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <img
              src="https://images.unsplash.com/photo-1704340142770-b52988e5b6eb?q=80&w=1700&auto=format&fit=crop"
              alt="Car rental"
              className="rounded-3xl shadow-2xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-11/12 mx-auto py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-14"
        >
          Our Core Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <FaCarSide className="text-6xl text-primary mx-auto mb-4" />,
              title: "Quality Cars",
              desc: "Every car is maintained to the highest standards."
            },
            {
              icon: <FaUsers className="text-6xl text-primary mx-auto mb-4" />,
              title: "Customer First",
              desc: "Your comfort and satisfaction is our top priority."
            },
            {
              icon: <FaHandshake className="text-6xl text-primary mx-auto mb-4" />,
              title: "Trusted Service",
              desc: "Transparent pricing & zero hidden charges."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl text-center border border-gray-100"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-base-200 py-20">
        <div className="w-11/12 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-14"
          >
            Why Choose <span className="text-primary">Us?</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10">
            <motion.ul
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white rounded-2xl shadow-md list-disc list-inside space-y-2 text-gray-700"
            >
              <li>Affordable rental packages for all budgets</li>
              <li>Wide selection of cars</li>
              <li>Hassle-free booking</li>
              <li>24/7 customer support</li>
            </motion.ul>
            <motion.ul
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white rounded-2xl shadow-md list-disc list-inside space-y-2 text-gray-700"
            >
              <li>Transparent pricing policy</li>
              <li>Well-maintained vehicles</li>
              <li>Flexible rental periods</li>
              <li>5,000+ happy customers</li>
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
        <section className="relative py-20 bg-gradient-to-br from-base-200 to-base-100 overflow-hidden">
      <div className="w-11/12 mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center mb-14"
        >
          What Our Customers Say
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl shadow-lg backdrop-blur-lg bg-white/80 border border-white/30 hover:scale-105 transform transition-all duration-300"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="absolute top-6 left-6 text-primary text-3xl opacity-20" />

              {/* Avatar */}
              <div className="flex justify-center -mt-14 mb-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 rounded-full border-4 border-primary shadow-md"
                />
              </div>

              {/* Name */}
              <h4 className="text-lg font-bold text-center">{t.name}</h4>

              {/* Rating */}
              <div className="flex justify-center gap-1 my-2">
                {[...Array(t.rating)].map((_, idx) => (
                  <FaStar key={idx} className="text-yellow-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 text-center italic leading-relaxed">
                {t.review}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="w-11/12 mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Book Your Ride?
          </motion.h2>
          <p className="mb-6 opacity-90">
            Discover comfort, affordability, and trust — all in one platform.
          </p>
          <Link to="/available-cars">
            <motion.button
              whileHover={{ scale: 1.08 }}
              className="btn bg-yellow-300 text-primary font-bold border-none"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
