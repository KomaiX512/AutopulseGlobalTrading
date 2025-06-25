import React, { useState } from 'react';
import { Button, Drawer, Space, Menu, Dropdown } from 'antd';
import { GrBike, GrCar, GrCaretDown, GrCaretNext, GrCircleInformation, GrClose, GrConnect, GrHome, GrInfo, GrMenu, GrPhone, GrProjects, GrServices } from 'react-icons/gr';
import { FaCogs, FaCar, FaBicycle } from 'react-icons/fa';

const App = ({ position = 'left' }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    // const productsMenu = (
    //     <Menu>
    //         <Menu.Item key="1" icon={<FaCogs />}>
    //             <a href="/products/machine">Machines</a>
    //         </Menu.Item>
    //         <Menu.Item key="2" icon={<FaCar />}>
    //             <a href="/products/electric-vehicles">Vehicles</a>
    //         </Menu.Item>
    //         <Menu.Item key="3" icon={<FaBicycle />}>
    //             <a href="/products/electric-bikes">Bikes</a>
    //         </Menu.Item>
    //     </Menu>
    // );

    return (
        <>
            <a onClick={showDrawer}>
                <Space className='text-light' style={{ color: 'white', cursor: 'pointer', fontWeight: '500' }}>
                    <GrMenu size={20} color='white' />
                </Space>
            </a>
            <Drawer
                title=
                {<div className='flex justify-between '>
                    <h4>Menu</h4>
                    <GrClose onClick={onClose} />
                </div>}
                placement={position}
                closable={false}
                onClose={onClose}
                open={open}
                width={200}
                className='text-light'
                style={{ background: '#1F2937' }}
            >
                <ul className='flex flex-col gap-2 text-dark'>
                    <li>
                        <a className='flex items-center gap-2 p-1' href="">
                            <span className='text-light font-normal'>Home</span>
                        </a>
                    </li>
                    <li>

                        <a className='flex flex-col gap-1' href="">
                            <div className="flex items-center gap-2  p-1">
                                <span className='text-light font-normal'>Products</span>
                            </div>
                            <ul className='flex flex-col gap-1 p-2 border-l'>
                                <li>
                                    <a className='flex items-center gap-2  p-1' href="/products/machine">
                                        <GrServices color='#ceaa4d' size={15} /> <small className='text-light text-bold'>Machines</small>
                                    </a>
                                </li>
                                <li>
                                    <a className='flex items-center gap-2  p-1' href="/products/electric-vehicles">
                                        <GrCar color='#ceaa4d' size={15} /> <small className='text-light text-bold'>Vehicles</small>
                                    </a>
                                </li>
                                <li>
                                    <a className='flex items-center gap-2  p-1' href="/products/electric-bikes">
                                        <GrBike color='#ceaa4d' size={15} /> <small className='text-light text-bold'>Electric Bikes</small>
                                    </a>
                                </li>
                            </ul>
                        </a>
                    </li>
                    <li>
                        <a  className='flex items-center gap-2  p-1' href="/about">
                        <span  className='text-light font-normal'>About</span>
                        </a>
                    </li>
                    <li>
                        <a className='flex items-center gap-2  p-1' href="/contact">
                        <span  className='text-light font-normal'>Contact</span>
                        </a>
                    </li>
                </ul>
            </Drawer>
        </>
    );
};

export default App;
