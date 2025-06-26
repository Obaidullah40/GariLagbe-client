import { motion } from "framer-motion";
import { Link } from "react-router";

const offers = [
  {
    id: 1,
    title: "15% Off for Weekend Rentals",
    description: "Book now and enjoy your weekend trip with an exclusive discount!",
    image: "https://www.enterprise.com/en/car-rental/deals/up-to-15off/_jcr_content/_cq_featuredimage.coreimg.jpeg/1741201624816/n01222-ent-up-to-15-off-us.jpeg",
    cta: "Book Now"
  },
  {
    id: 2,
    title: "Luxury Cars at $99/day",
    description: "This holiday season, drive your dream car at the best rate!",
    image: "https://i.ibb.co/wNXTVG1y/download.jpg",
    cta: "Learn More"
  }
];

const SpecialOffers = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-base-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        Special Offers Just for You!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <img src={offer.image} alt={offer.title} className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-primary">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
              <Link to="/available-cars">
                <button className="btn btn-primary">{offer.cta}</button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
