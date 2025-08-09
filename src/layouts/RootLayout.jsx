import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/Shared/NavBar';
import Footer from '../pages/Shared/Footer';

const RootLayout = () => {
    return (
        <div className="">
            <NavBar></NavBar>
            <div className='md:w-10/12 mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;