import React, { PropTypes } from 'react'
import '../styles/core.scss'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// AdminLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function AdminLayout ({ children }) {
  return (
    <div className='admin-container'>
      {children}
    </div>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.element
}

export default AdminLayout
