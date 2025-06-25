import React from 'react'

import QuriesList from './QuriesList'
import QuriesContextProvider from './context/QuriesContext'


function QueryIndex() {
    return (
        <div>
            <QuriesContextProvider>
                <QuriesList />

            </QuriesContextProvider>
        </div>
    )
}

export default QueryIndex
