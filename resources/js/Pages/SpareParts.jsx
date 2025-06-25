import AboutPage from '@/Homepage/Pages/About'
import AllProducts from '@/Homepage/Pages/AllProducts'
import ContactPage from '@/Homepage/Pages/ContactUsPage'
import HomePage from '@/Homepage/Pages/HomePage'
import ProductType from '@/Homepage/Pages/ProductType'
import Track from '@/Homepage/Pages/Track'
import AllBlogs from '@/Homepage/Pages/blogs/AllBlogs'
import SingleBlog from '@/Homepage/Pages/blogs/SingleBlog'
import HomeContextProvider from '@/Homepage/context/HomeContext'
import HomeLayout from '@/Layouts/HomeLayout'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrderSuccess from './OrderSuccess'
import PrivacyPolicy from '@/Homepage/Pages/PrivacyPolicy'
import Login from './Auth/Login'
import Register from './Auth/Register'
import App from '@/Homepage/Pages/Product'
import AllAttachments from '@/Homepage/Pages/AllAttachments'
import AttachmentProductType from '@/Homepage/Pages/AttachmentProductType'

import '../../css/style.css';
import '../Homepage/assets/main';
import '../Homepage/style.scss';


function SpareParts({ auth, laravelVersion, phpVersion }) {
    return (
        <HomeContextProvider auth={auth}>
            <HomeLayout auth={auth}>
                <BrowserRouter basename='parts'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/track' element={<Track />} />
                        <Route path='/about' element={<AboutPage />} />
                        <Route path='/contact' element={<ContactPage />} />
                        <Route path='/products' element={<AllProducts />} />
                        <Route path='/products/attachments' element={<AllAttachments />} />
                        <Route path='/attachments' element={<AttachmentProductType />} />
                        <Route path='/product/:slug' element={< App />} />
                        <Route path='/products/:slug/search' element={< AllProducts />} />
                        <Route path='/products/:slug' element={< ProductType />} />
                        <Route path='/blogs/:slug' element={< SingleBlog />} />
                        <Route path='/blogs' element={< AllBlogs />} />
                        <Route path='/payment/successfull' element={< OrderSuccess />} />
                        <Route path='/privacy-policy' element={< PrivacyPolicy />} />
                        <Route path='/login' element={< Login />} />
                        <Route path='/register' element={< Register />} />
                    </Routes>
                </BrowserRouter>
            </HomeLayout>
        </HomeContextProvider>
    )
}

export default SpareParts
