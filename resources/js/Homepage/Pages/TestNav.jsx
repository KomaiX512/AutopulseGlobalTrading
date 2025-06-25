import { Badge, Button, Input, Layout, Menu, Dropdown } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { Toaster } from 'react-hot-toast';
import Cart from '../Components/Cart';
import ProductSearch from './ProductSearch';
import { FaFacebook, FaLinkedinIn, FaUserPlus, FaCartShopping, FaSquareInstagram } from 'react-icons/fa';
import { IoLogoWhatsapp, IoLogOutSharp } from 'react-icons/io5';
import { GrTwitter } from 'react-icons/gr';
import { LoginOutlined, SearchOutlined } from '@ant-design/icons';
import ProfileDropdown from '../Components/ProfileDropdown';
import ProdDropdown from './ProdDropdown';

const { Header } = Layout;

const Navbar = ({ auth }) => {
  const [open, setOpen] = useState(false);
  const context = useContext(HomeContext);
  const { state, dispatch, methods } = context;

  useEffect(() => {
    if (auth?.user) {
      methods.loadCart();
    }
  }, [state.loadingCart]);

  const menuItems = [
    { key: '1', label: <a href="/">Home</a> },
    { key: '2', label: <ProdDropdown /> },
    { key: '3', label: <a href="/">Brands</a> },
    { key: '4', label: <a href="/">About Us</a> },
    { key: '5', label: <a href="/">Contact</a> },
  ];

  const socialIcons = (
    <div className="flex gap-4">
      <a href=""><FaFacebook size={20} className="text-gray-500" /></a>
      <a href=""><IoLogoWhatsapp size={20} className="text-gray-500" /></a>
      <a href=""><FaLinkedinIn size={20} className="text-gray-500" /></a>
      <a href=""><FaSquareInstagram size={20} className="text-gray-500" /></a>
      <a href=""><GrTwitter size={20} className="text-gray-500" /></a>
    </div>
  );

  return (
    <div className="bg-dark p-0 relative z-50">
      <Toaster position="top-right" />
      <Cart auth={auth} open={open} onClose={() => setOpen(false)} />
      <Header className="bg-dark flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-4">
          <p className="text-light">Contact Info</p>
          <p className="text-light">Email Address</p>
        </div>
        <div className="flex items-center gap-4">
          {socialIcons}
        </div>
      </Header>
      <Header className="bg-white flex justify-between items-center px-4 py-2">
        <a href="/" className="navbar-brand">
          <img width={100} src="/images/logo.png" alt="Logo" loading='lazy'
          />
        </a>
        <div className="flex items-center gap-4">
          <Input
            className="rounded-lg"
            placeholder="Search products"
            prefix={<SearchOutlined />}
          />
          <Badge count={(state?.cart?.cartItems?.length) ?? 0} size="small">
            <Button type="link" icon={<FaCartShopping />} onClick={() => setOpen(true)} />
          </Badge>
          <a href="#" onClick={() => setOpen(true)} className="text-dark">Cart</a>
          <Button href="/track" type="link" icon={<FaLocationDot />} className="text-dark">Track</Button>
          {!auth.user ? (
            <Button href="/login" type="link" icon={<LoginOutlined />} className="text-dark">Login</Button>
          ) : (
            <Button href="/logout" type="link" icon={<IoLogOutSharp />} className="text-dark">Logout</Button>
          )}
          {!auth.user && <Button href="/register" type="link" icon={<FaUserPlus />} className="text-dark">Register</Button>}
          <ProfileDropdown auth={auth} />
        </div>
      </Header>
      <Header className="bg-dark px-4 py-2 hidden lg:flex">
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
    </div>
  );
};

export default Navbar;
