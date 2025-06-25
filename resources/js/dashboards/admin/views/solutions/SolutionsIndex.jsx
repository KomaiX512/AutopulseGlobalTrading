import React from 'react'
import { Outlet } from 'react-router-dom'
import { SolutionsProvider } from './context/SolutionsContext'

const SolutionsIndex = () => {
  return (
    <SolutionsProvider>
      <div style={{ height: 'auto', minHeight: '100vh' }}>
        <Outlet />
      </div>
    </SolutionsProvider>
  )
}

export default SolutionsIndex 