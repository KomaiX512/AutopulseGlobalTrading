import React, { useState } from 'react';
import { Button, Drawer, Space, Menu, Dropdown } from 'antd';
import { GrBike, GrCar, GrCaretDown, GrCaretNext, GrCircleInformation, GrClose, GrConnect, GrHome, GrInfo, GrMenu, GrPhone, GrProjects, GrServices } from 'react-icons/gr';
import { FaCogs, FaCar, FaBicycle } from 'react-icons/fa';
import { MdConstruction } from 'react-icons/md';

const App = ({ position = 'left' }) => {
    const [open, setOpen] = useState(false);
    
    const showDrawer = () => {
        setOpen(true);
    };
    
    const onClose = () => {
        setOpen(false);
    };

    const handleNavigation = (url) => {
        onClose();
        window.location.href = url;
    };

    return (
        <>
            <button 
                onClick={showDrawer}
                className="mobile-menu-trigger p-2 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Open navigation menu"
            >
                <Space className='text-light' style={{ color: 'white', cursor: 'pointer', fontWeight: '500' }}>
                    <GrMenu size={20} color='white' />
                </Space>
            </button>
            
            <Drawer
                title={
                    <div className='flex justify-between items-center'>
                        <h4 className="text-white text-lg font-semibold m-0">Navigation</h4>
                        <button 
                            onClick={onClose}
                            className="text-white hover:text-gray-300 p-2 rounded-md transition-colors min-w-[44px] min-h-[44px]"
                            aria-label="Close menu"
                        >
                            <GrClose size={18} />
                        </button>
                    </div>
                }
                placement={position}
                closable={false}
                onClose={onClose}
                open={open}
                width={320}
                className='mobile-navigation-drawer'
                style={{ background: '#1F2937' }}
                bodyStyle={{ padding: '0' }}
            >
                <nav className='mobile-navigation-menu'>
                    <ul className='flex flex-col gap-2 text-dark p-4'>
                        <li>
                            <button 
                                className='flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]' 
                                onClick={() => handleNavigation("/")}
                            >
                                <GrHome color='#6B7280' size={20} />
                                <span className='text-white font-medium text-base'>Home</span>
                            </button>
                        </li>
                        
                        <li>
                            <div className='flex flex-col gap-2'>
                                <div className="flex items-center gap-3 p-4 text-white">
                                    <GrServices color='#6B7280' size={20} />
                                    <span className='text-white font-medium text-base'>Products</span>
                                </div>
                                <ul className='flex flex-col gap-1 pl-6 border-l-2 border-gray-600 ml-4'>
                                    <li>
                                        <button 
                                            className='flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]' 
                                            onClick={() => handleNavigation("/products/machine")}
                                        >
                                            <GrServices color='#6B7280' size={18} /> 
                                            <span className='text-white font-normal text-sm'>Heavy Machinery</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className='flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]' 
                                            onClick={() => handleNavigation("/products/attachments")}
                                        >
                                            <MdConstruction color='#6B7280' size={18} /> 
                                            <span className='text-white font-normal text-sm'>Attachments & Accessories</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <button 
                                className='flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]' 
                                onClick={() => handleNavigation("/solutions")}
                            >
                                <GrProjects color='#6B7280' size={20} />
                                <span className='text-white font-medium text-base'>Solutions</span>
                            </button>
                        </li>
                        
                        <li>
                            <button 
                                className='flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]' 
                                onClick={() => handleNavigation("/blogs")}
                            >
                                <GrInfo color='#6B7280' size={20} />
                                <span className='text-white font-medium text-base'>Blogs</span>
                            </button>
                        </li>
                        
                        <li>
                            <button 
                                className='flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]' 
                                onClick={() => handleNavigation("/about")}
                            >
                                <GrCircleInformation color='#6B7280' size={20} />
                                <span className='text-white font-medium text-base'>About Us</span>
                            </button>
                        </li>
                        
                        <li>
                            <button 
                                className='flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]' 
                                onClick={() => handleNavigation("/contact")}
                            >
                                <GrPhone color='#6B7280' size={20} />
                                <span className='text-white font-medium text-base'>Contact</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                
                <style jsx>{`
                    .mobile-navigation-drawer .ant-drawer-header {
                        background: #1F2937;
                        border-bottom: 1px solid #374151;
                        padding: 16px 24px;
                    }
                    
                    .mobile-navigation-drawer .ant-drawer-body {
                        background: #1F2937;
                        padding: 0;
                    }
                    
                    .mobile-navigation-menu {
                        height: 100%;
                        overflow-y: auto;
                    }
                    
                    .mobile-menu-trigger:focus {
                        outline: 2px solid #3B82F6;
                        outline-offset: 2px;
                    }
                    
                    @media (max-width: 480px) {
                        .mobile-navigation-drawer {
                            width: 280px !important;
                        }
                    }
                `}</style>
            </Drawer>
        </>
    );
};

export default App;
