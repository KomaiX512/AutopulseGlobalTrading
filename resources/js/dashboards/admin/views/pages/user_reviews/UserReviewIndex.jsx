import React from 'react'
import ReviewForm from './ReviewForm'
import PageContextProvider from '../context/PageContext'

function UserReviewIndex() {
    return (
        <PageContextProvider>
            <ReviewForm />
        </PageContextProvider>
    )
}

export default UserReviewIndex
