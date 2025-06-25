import React from 'react'
import PageContextProvider from '../context/PageContext'
import ContactSettings from './ContactSettings'

function ContactIndex() {
  return (
    <PageContextProvider>
      <ContactSettings />
    </PageContextProvider>
  )
}

export default ContactIndex
