import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <p>
          Please be aware that some services may be impacted due to the ongoing
          COVID-19 response. Last updated: Jun 9, 2020
        </p>
        <span>Logo here</span>
        <a href="/">Home</a>
        <input type="text" placeholder="asdasd" />
        <button type="button">Search</button>
      </header>
      <main>{children}</main>
      <footer>
        <a href="/">Sign in</a> |<a href="/">Disclaimer</a> |
        <a href="/">About Us</a> |<a href="/">Sign up</a>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

Layout.defaultProps = {
  children: null
}

export default Layout
