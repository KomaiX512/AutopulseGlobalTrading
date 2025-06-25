import React from 'react'
import AboutUs from './AboutUs'
import PageContextProvider from '../context/PageContext'

function AboutUsApp() {
    return (
        <PageContextProvider>
            <AboutUs />
        </PageContextProvider>
    )
}

export default AboutUsApp
