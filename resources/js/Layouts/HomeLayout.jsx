
// import Navbar from '@/Homepage/Pages/Navbar';
import Footer from '@/Homepage/Pages/Footer';
import Navbar from '@/Homepage/Pages/Navbar';
// import Navbar from '@/Homepage/Pages/TestNav';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function HomeLayout({ auth, header, children }) {

    const { state } = useState();

    return (
        <>
            <div className="min-h-screen " style={{ background: "#fef8f5" }}>
                {state?.contextHolder}
                <Navbar auth={auth} />
                <main id='main' style={{ background: "#fef8f5", minHeight: '200px', }}>{children}</main>
                <Footer />
            </div>
        </>


    );
}
