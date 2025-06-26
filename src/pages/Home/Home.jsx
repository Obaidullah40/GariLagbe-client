import React from 'react';
import Banner from './Banner';
import WhyChooseUs from './WhyChooseUs';
import RecentListings from './RecentListings';
import SpecialOffers from './SpecialOffers';

const Home = () => {
    return (
        <div>
            <Banner/>
            <WhyChooseUs />
            <RecentListings />
            <SpecialOffers/>
        </div>
    );
};

export default Home;