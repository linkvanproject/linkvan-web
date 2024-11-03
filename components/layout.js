import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import formatDate from 'utils/format-date'
import theme from '../theme'

import { GoogleAnalytics } from '@next/third-parties/google'

const Header = styled.div`
  background: #f8f8f8;
  border-bottom: 2px solid #ccc;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
  margin-bottom: ${({ customCSS }) => customCSS?.marginBottom ?? '20px'};
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

const Footer = styled.footer`
  margin: 30px 0;
  text-align: center;
`

const Separator = styled.span`
  margin: 0 12px;
  border-right: 1px solid #ddd;
`

const LastUpdated = styled(Typography)`
  color: grey;
`

const Layout = ({ stats, children, headerStyle }) => {
  const router = useRouter()

  const handleSearch = (event) => {
    event.preventDefault()
    const keyword = event.target.search.value
    if (keyword) {
      window.location.href = `/facilities?search=${keyword}`;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      <CssBaseline />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Header customCSS={headerStyle}>
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
                <form noValidate autoComplete="off" onSubmit={handleSearch}>
                  <SearchBox>
                    <TextField
                      label="Search Facilities"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="search"
                    />
                    <SearchButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      disableElevation
                    >
                      Search
                    </SearchButton>
                  </SearchBox>
                </form>
              </Grid>
              <Grid item xs={12}>
                <LastUpdated variant="caption">
                  Last updated: {formatDate(stats.last_updated)}
                </LastUpdated>
              </Grid>
            </Grid>
          </Nav>
        </Container>
      </Header>
      {children}
      <Footer>
        <Link href="/disclaimer">Disclaimer</Link>
        <Separator />
        <Link href="/about-us">About us</Link>
      </Footer>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  stats: PropTypes.object,
  headerStyle: PropTypes.object
}

Layout.defaultProps = {
  children: null,
  stats: {},
  headerStyle: null
}

export default Layout
