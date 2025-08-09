import React from 'react';
import Banner from './Banner';
import WhyChooseUs from './WhyChooseUs';
import RecentListings from './RecentListings';
import SpecialOffers from './SpecialOffers';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner/>
            <WhyChooseUs />
            <RecentListings />
            <Testimonials/>
            <SpecialOffers/>
        </div>
    );
};

export default Home;