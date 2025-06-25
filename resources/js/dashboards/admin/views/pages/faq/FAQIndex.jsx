import React from 'react'
import FAQForm from './FAQForm'
import PageContextProvider from '../context/PageContext'

export default function FAQIndex() {
    return (
        <PageContextProvider>
            <FAQForm />
        </PageContextProvider>
    )
}
