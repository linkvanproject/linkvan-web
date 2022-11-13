import React from 'react'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import Layout from 'components/layout'
import NavBar from 'components/nav-bar'
import PageTitle from 'components/page-title'
import styled from 'styled-components'

const LogoContainer = styled.div`
  text-align: center;
`

const Logo = styled.img`
  width: 200px;
`

const AboutUs = () => {
  const { data } = useSWR('/api/home', fetcher)

  const theme = useTheme()

  const {
    typography: { body2 }
  } = theme

  const Blockquote = styled.blockquote`
    padding: 10px 20px;
    margin-left: 0;
    margin-right: 0;
    border-left: 5px solid #eee;

    p {
      margin-top: 0;
    }

    footer {
      font-size: ${body2.fontSize};
      color: #777;
    }
  `

  console.log({theme})

  return (
    <Layout stats={data?.site_stats}>
      <Head>
        <title>Linkvan</title>
      </Head>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          <Grid item xs={12}>
            <PageTitle>About Us</PageTitle>
            <LogoContainer>
              <Logo src="/logo.svg" alt="Linkvan logo" />
            </LogoContainer>
            <p>Linkvan.ca is a mobile-optimized website that connects community residents in the Downtown Eastside to nearby resources. Focusing on basic services such as access to shelter, food, medical care, hygiene services, advocacy and technology access, Linkvan.ca was designed with two user groups in mind:</p>
            <ol>
              <li>A growing population of low-income Downtown Eastsiders who rely on mobile technology to meet their basic needs</li>
              <li>Service providers who can use information to direct clients in need.</li>
            </ol>
            <p>Linkvan.ca was created in collaboration with Kevin Tanyag (Programmer), William Booth, Dionne Pelan, Haydn Mellowship, Melissa Kuipers, Roohi Sahajpal, Felix Tso (Programmer), André Souza (Programmer), Geoff McLennan (Programmer), Diane Campbell (Ambassador), Wilson Liang (Ambassador), <a href="https://dteslit.wordpress.com/" target="_blank">DTES Literacy Roundtable</a>, <a href="http://www.learningexchange.ubc.ca/" target="_blank">UBC Learning Exchange</a>, community residents, and service providers, with financial support from the Chapman Innovation Grant through <a href="http://students.ubc.ca/about/centre-community-engaged-learning" target="_blank">UBC’s Centre for Community Engaged Learning</a>. Credit for the initial concept and app design belong to the incredible folks at <a href="http://www.link-sf.com/" target="_blank">link-sf.com</a> who created the original source code made available through <a href="https://github.com/zendesk/linksf" target="_blank">https://github.com/zendesk/linksf</a>. For some background on the open source project click <a href="http://hoodline.com/2015/08/link-sf-helping-more-homeless-find-services" target="_blank">here.</a> LinkVan is free software. Our open source code can be found here: <a href="https://github.com/linkvan/linkvan-web" target="_blank">https://github.com/linkvan/linkvan-web</a></p>
            <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:info@linkvan.ca">info@linkvan.ca</a>. We'd love to hear from you! :)</p>
            <hr />
            <Blockquote>
              <p>Teamwork is the ability to work together toward a common vision. The ability to direct individual accomplishments toward organizational objectives. It is the fuel that allows common people to attain uncommon results.</p>
              <footer>- Andrew Carnegie</footer>
            </Blockquote>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default AboutUs
