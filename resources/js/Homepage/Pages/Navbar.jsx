import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { Toaster } from 'react-hot-toast';
import Cart from '../Components/Cart';
import ProductSearch from './ProductSearch';
import { GrCart, GrLocation, GrMail, GrMenu, GrUserAdd } from 'react-icons/gr';
import ProfileDropdown from '../Components/ProfileDropdown';
import ProdDropdown from './ProdDropdown';
import { FaSquareInstagram, FaSquareWhatsapp } from 'react-icons/fa6';
import { MdOutlineLocationOn } from "react-icons/md";
import { Badge, Button, Dropdown, Space, Tooltip } from 'antd';
import { FaFacebookSquare, FaWhatsapp, FaTwitterSquare, FaLinkedin, FaYoutubeSquare } from 'react-icons/fa';

import './nav.scss'
import App from '../Components/Menubar';

const Navbar = ({ auth }) => {


    const [open, setOpen] = useState(false);
    const context = useContext(HomeContext);
    const { state, dispatch, methods } = context;

    const [scrollY, setScrollY] = useState(window.scrollY);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const navFixElement = document.getElementById('nav-fix');
            if (navFixElement) {
                if (window.scrollY >= 40) {
                    navFixElement.style.transform = 'translateY(0)';
                    navFixElement.style.position = 'sticky';
                    navFixElement.style.top = '0';
                    navFixElement.style.width = '100%';
                    navFixElement.style.background = 'transparent';
                    navFixElement.style.borderRadius = '0px';
                    navFixElement.classList.remove('container');
                } else {
                    navFixElement.style.transform = '';
                    navFixElement.style.position = 'static';
                    navFixElement.style.background = '';
                    navFixElement.classList.add('container');
                    navFixElement.style.borderRadius = '30px';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {

        if (auth?.user) {
            methods.loadCart();
        }

    }, [state.loadingCart]);


    const menuItems = [
        { key: '2', label: <a href="/solutions">Solutions</a> },
        { key: '3', label: <a href={`${location.pathname.split('/')[1]=='parts' ? '/parts':''}/blogs`}>Blogs</a> },
        { key: '4', label: <a href={`${location.pathname.split('/')[1]=='parts' ? '/parts':''}/about`}>About Us</a> },
        { key: '5', label: <a href={`${location.pathname.split('/')[1]=='parts' ? '/parts':''}/contact`}>Contact</a> },
    ];

    const socialIcons = (
        <div className="flex gap-4">
            <a href="https://www.facebook.com/autopulseglobaltrading/"><FaFacebookSquare size={20} className="text-light-500" /></a>
            <a href=""><FaSquareWhatsapp size={20} className="text-ligt-500" /></a>
            <a href="https://www.linkedin.com/company/autopulseglobaltrading/"><FaLinkedin size={20} className="text-light-500" /></a>
            <a href="https://www.instagram.com/autopulseglobaltradingg/"><FaSquareInstagram size={20} className="text-light-500" /></a>
            <a href="https://www.youtube.com/@autopulseglobaltrading/"><FaYoutubeSquare size={20} className="text-light-500" /></a>
        </div>
    );


    return (
        <div className="bg-gray-800 p-0 relative z-50 pb-1">
            <Toaster position="top-right" />
            <Cart auth={auth} open={open} onClose={() => setOpen(false)} />
            <div className="nav-up flex justify-between items-center  text-white" style={{ padding: '0.5vw' }}>
                <div style={{ gap: '3vw' }} className="hidden flex items-center  unhide-750 mt-2 mx-1">
                    <App />
                    <a href="/" className="">
                        <img loading="lazy" width={80} src="/images/final_logo.png" alt="Logo" />
                    </a>
                </div>
                <div className="flex items-center gap-4 hide-1200">
                    <Tooltip title={'Phone number'} className="text-sm flex items-center gap-1">
                        <FaWhatsapp size={20} />
                        <a href={`https://wa.me/13072950382?`} style={{ fontWeight: '500' }}>
                            +1307 2950382                        </a>
                    </Tooltip>
                    <Tooltip title={'Email Us'} className="text-sm flex items-center gap-1">
                        <GrMail size={20} />
                        <a style={{ fontWeight: '500' }} href="mailto:autopulsetrading@gmail.com">
                            info@autopulsetrading.com
                        </a>
                    </Tooltip>
                </div>
                <div className="px-4 py-2 lg:flex justify-center d-none">
                    <ProductSearch />
                </div>
                <div id='home-nav-top' className="px-4 py-2  lg:flex justify-center">
                    <nav>
                        <ul className="flex gap-8 text-white">
                            <li >
                                <a className='text-light' style={{ fontWeight: "500" }} href="/">Home</a>
                            </li>
                            <li >
                                <ProdDropdown />
                            </li>
                            {menuItems?.map((item) => (
                                <li key={item.key}>
                                    <a style={{ fontWeight: "500" }} className='text-light' href={item.label.props.href}>{item.label.props.children}</a>
                                </li>
                            ))}

                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-4 hide-750">
                    {socialIcons}
                </div>

                <div className="hidden unhide-1200 flex items-center gap-4 ">
                    <div style={{ gap: '3vw' }} className="hidden flex items-center  icons-container unhide-750 hide-1200 mx-1">

                        {location.pathname.split('/')[1] === 'parts' && <Badge count={state?.cart?.cartItems?.length}
                            className='flex items-center gap-3 hide-750'
                        >
                            <a className='icon-container' onClick={() => setOpen(true)}>
                                <GrCart className="text-xl cursor-pointer" onClick={() => setOpen(true)} />
                                <span>Cart</span>
                            </a>

                        </Badge>
                        }
                        {
                            location.pathname.split('/')[1] === 'parts' && <a href="/track" className="text-gray-800 flex icon-container hide-1200 items-center gap-1">
                                <MdOutlineLocationOn size={20} className="text-lg" />
                                <span>Track</span>
                            </a>
                        }

                        {!auth.user ? (
                            <a href="/login" className="text-light-800 icon-container flex items-center gap-1">
                                <span className='text-light'> Login</span>
                            </a>
                        ) : (
                            <a href="/logout" className="text-light-800 icon-container flex items-center gap-1">
                                <span className='text-light'> Logout</span>
                            </a>
                        )}
                        {!auth.user && (
                            <a href="/register" className="text-gray icon-container flex items-center gap-1">
                                <span className='text-light'>Register</span>
                            </a>
                        )}
                        <div className="hide-1200">
                            <ProfileDropdown auth={auth} />
                        </div>
                    </div>
                    <div className="hidden unhide-1200 hide-750 flex gap-3 items-center">
                        <App position='right' />
                        <ProfileDropdown auth={auth} />

                    </div>

                </div>

            </div>
            <div id='nav-fix' className="container nav-down flex justify-between items-center gap-3 bg-white" style={{ borderRadius: "30px", padding: "1.5vw" }}>
                <a href="/" className='hide-750'>
                    <img loading="lazy" width={150} src="/images/final_logo.png" alt="" />
                </a>


                <div className="flex gap-4 items-center justify-between sm-gap-3" style={{ width: "100%" }}>
                    <div className="w-full flex items-center justify-center">
                        <ProductSearch />
                    </div>
                    <div style={{ marginRight: "3vw" }} className="d-none unhide-750 sm-gap-3 flex gap-4 items-center hide-1200">
                        {location.pathname.split('/')[1] === 'parts' && <Badge count={state?.cart?.cartItems?.length}
                            className='flex items-center gap-3'
                        >
                            <Button className='primary-btn' icon={<GrCart className="text-xl cursor-pointer" />} onClick={() => setOpen(true)}>

                            </Button>

                        </Badge>}

                        <div className="unhide-1200 unhide-750">
                            <ProfileDropdown auth={auth} />
                        </div>

                    </div>

                    <div className="flex items-center gap-4 icons-container hide-750 ">

                        {location.pathname.split('/')[1] === 'parts' && <Badge count={state?.cart?.cartItems?.length}
                            className='flex items-center gap-3'
                        >
                            <a className='icon-container' onClick={() => setOpen(true)}>
                                <GrCart className="text-xl cursor-pointer" onClick={() => setOpen(true)} />
                                <span>Cart</span>
                            </a>

                        </Badge>}

                        {location.pathname.split('/')[1] === 'parts' && <a href="/track" className="text-gray-800 flex icon-container hide-1200 items-center gap-1">
                            <MdOutlineLocationOn size={20} className="text-lg" />
                            <span>Track</span>
                        </a>}


                        {!auth.user ? (
                            <a href="/login" className="text-gray-800 primary-btn icon-container flex items-center gap-1">
                                Login
                            </a>
                        ) : (
                            <a href="/logout" className="primary-btn icon-container flex items-center gap-1">
                                Logout
                            </a>
                        )}
                        {!auth.user && (
                            <a href="/register" className=" primary-btn 
                        text-gray icon-container flex items-center gap-1">
                                Register
                            </a>
                        )}
                        <div className="hide-1200">
                            <ProfileDropdown auth={auth} />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Navbar;
