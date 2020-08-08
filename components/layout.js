import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

const TopAlert = styled(Alert)`
  justify-content: center;
`

const Header = styled.div`
  background: #f8f8f8;
  border-bottom: 2px solid #ccc;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <div>
        <Header>
          <TopAlert severity="error">
            Please be aware that some services may be impacted due to the
            ongoing COVID-19 response. Last updated: Jun 9, 2020
          </TopAlert>
          <Container>
            <Nav>
              <div>
                <span>Logo here</span>
                <a href="/">Home</a>
              </div>
              <div>
                <input type="text" placeholder="asdasd" />
                <Button variant="contained" color="primary" disableElevation>
                  Search
                </Button>
              </div>
            </Nav>
          </Container>
        </Header>
        <main>{children}</main>
        <footer>
          <a href="/">Sign in</a> |<a href="/">Disclaimer</a> |
          <a href="/">About Us</a> |<a href="/">Sign up</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

Layout.defaultProps = {
  children: null
}

export default Layout
