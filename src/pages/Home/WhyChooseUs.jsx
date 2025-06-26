import React from 'react';
import { FaCarSide, FaMoneyBillWave, FaClock, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
    return (
        <section className="py-16 bg-base-100 text-center px-4 md:px-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">
                Why Choose GariLagbe?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                {/* Feature 1 */}
                <div className="p-6 border rounded-lg hover:shadow-lg transition">
                    <FaCarSide className="text-5xl text-primary mb-4 mx-auto" />
                    <h4 className="text-xl font-semibold mb-2">Wide Variety of Cars</h4>
                    <p className="text-sm text-gray-600">
                        From budget to luxury, we have cars for every journey and occasion.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="p-6 border rounded-lg hover:shadow-lg transition">
                    <FaMoneyBillWave className="text-5xl text-primary mb-4 mx-auto" />
                    <h4 className="text-xl font-semibold mb-2">Affordable Prices</h4>
                    <p className="text-sm text-gray-600">
                        Competitive daily rental rates with no hidden fees.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="p-6 border rounded-lg hover:shadow-lg transition">
                    <FaClock className="text-5xl text-primary mb-4 mx-auto" />
                    <h4 className="text-xl font-semibold mb-2">Easy Booking</h4>
                    <p className="text-sm text-gray-600">
                        Seamless and quick car booking process within a few clicks.
                    </p>
                </div>

                {/* Feature 4 */}
                <div className="p-6 border rounded-lg hover:shadow-lg transition">
                    <FaHeadset className="text-5xl text-primary mb-4 mx-auto" />
                    <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
                    <p className="text-sm text-gray-600">
                        Friendly customer service is always here to help you.
                    </p>
                </div>
            </div>
        </section>
    );
};


export default WhyChooseUs;