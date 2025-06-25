import React, { useContext, useEffect, useState } from 'react'
import Slider from '../Components/Slider'
import { HomeContext } from '../context/HomeContext'

function Header() {


    const { state, dispatch, methods } = useContext(HomeContext);

    const [slides, setSlides] = useState([])

    async function fetchSlides() {
        // setSaving(true);
        let slides = await methods.loadSlides('home_slider');
        if (slides) {
            // setSaving(false);
            setSlides(slides);
        }
    }

    useEffect(() => {
        fetchSlides();
    }, []);


    return (
        <div className="container-fluid container  p-0 mb-2">
            <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                <Slider slides={slides} />
            </div>
        </div>
    )
}

export default Header
