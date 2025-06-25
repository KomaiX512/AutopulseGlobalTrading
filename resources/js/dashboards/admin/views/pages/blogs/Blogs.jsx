import React from 'react'
import PageContextProvider from '../context/PageContext'
import BlogForm from './BlogFrom'

export default function Blogs() {
    return (
        <PageContextProvider>
            <BlogForm />
        </PageContextProvider>
    )
}
