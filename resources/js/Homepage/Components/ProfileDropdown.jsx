import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { GrCart, GrDashboard, GrLocation, GrLogin, GrLogout, GrUserAdmin, GrUserSettings } from 'react-icons/gr';
import { FaRegUser } from 'react-icons/fa6';

const ProfileDropdown = ({ auth, hideIcon = false }) => {


    const handleMenuClick = ({ key }) => {
        switch (key) {
            case 'profile':
                location.href = `/profile`;
                break;
            // case 'trackOrder':
            //     location.href = '/track';
            //     break;
            case 'signOut':
                location.href = '/logout';
                break;
            case 'admin_dash':
                location.href = '/dashboard/home';
                break;
            default:
                break;
        }
    };

    const menuItems = [
        {
            key: 'profile',
            icon: <GrUserSettings size={15} />,
            label: auth?.user?.name ?? 'Guest'
        },
        ...(auth?.user?.email == 'admin@autopulse.com' ? [{
            key: 'admin_dash',
            icon: <GrDashboard size={15} />,
            label: 'Dashboard'
        }] : []),
        {
            key: 'trackOrder',
            icon: <GrLocation size={15} />,
            label: 'Track Order'
        },
        auth.user ? {
            key: 'signOut',
            icon: <GrLogout />,
            label: 'Sign Out',
            style: { color: 'red' }
        } : {
            key: 'singIn',
            icon: <GrLogin />,
            label: 'SignIn',
            style: { color: 'green' }
        }
    ];

    return (
        <Dropdown 
            className='p-0' 
            menu={{ 
                items: menuItems,
                onClick: handleMenuClick 
            }} 
            trigger={['click']}
        >
            <Button className='primary-btn' icon={<FaRegUser />} >  </Button>
        </Dropdown>
    );
};

export default ProfileDropdown;
