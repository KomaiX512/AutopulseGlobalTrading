import React from 'react'
import HomeSettings from './HomeSettings'
import PageContextProvider from '../context/PageContext'
import AboutSettings from '../about/AboutSettings'

function HomeSettingApp() {
    return (
        <PageContextProvider>
            <HomeSettings />
            <AboutSettings />
        </PageContextProvider>
    )
}

export default HomeSettingApp
