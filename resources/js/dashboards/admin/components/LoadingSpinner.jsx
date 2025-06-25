import { Spin } from 'antd'
import React from 'react'

function LoadingSpinner({ size = 'large', message = 'Loading Data...' }) {
    return (
        <div className='spinner-loader'>
            <div className="flex  flex-col" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Spin size={size} style={{ zIndex: '1000000' }} />
                <p className='bg-white tex-bold'>
                    {message}
                </p>
            </div>

        </div>
    )
}

export default LoadingSpinner
