import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'

function VendorRootLayout() {
  return (
    <div><Outlet/></div>
  )
}

VendorRootLayout.propTypes = {}

export default VendorRootLayout
