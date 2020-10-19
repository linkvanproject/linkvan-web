import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import theme from '../theme'

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

const LogoBox = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  @media (min-width: 960px) {
    justify-content: flex-start;
  }
`

const Logo = styled.img`
  max-height: 50px;
`

const Home = styled(Typography)`
  padding-left: 10px;
`

const SearchBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 8px 0 4px;
`

const SearchButton = styled(Button)`
  padding-top: 8px;
  padding-bottom: 8px;
  margin-left: 4px;
`

const SpaceXS = styled.div`
  padding: 6px 0;
`

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
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
              <Grid container>
                <Grid item xs={12} md={6}>
                  <LogoBox href="/">
                    <Logo src="/logo-header.png" alt="Linkvan logo" />
                    <Home variant="h6">| Home</Home>
                  </LogoBox>
                </Grid>
                <Grid item xs={12} md={3}>
                  <SpaceXS />
                </Grid>
                <Grid item xs={12} md={3}>
                  <form noValidate autoComplete="off">
                    <SearchBox>
                      <TextField
                        id="search-facilities"
                        label="Search Facilities"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                      <SearchButton
                        variant="contained"
                        color="primary"
                        disableElevation
                      >
                        Search
                      </SearchButton>
                    </SearchBox>
                  </form>
                </Grid>
              </Grid>
            </Nav>
          </Container>
        </Header>
        <main>{children}</main>
        <footer>
          <a href="/">Sign in</a> |<a href="/">Disclaimer</a> |
          <a href="/">About Us</a> |<a href="/">Sign up</a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

Layout.defaultProps = {
  children: null
}

export default Layout
