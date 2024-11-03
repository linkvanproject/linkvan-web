import React from 'react'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Layout from 'components/layout'
import NavBar from 'components/nav-bar'
import PageTitle from 'components/page-title'

const AboutUs = () => {
  const { data } = useSWR('/api/home', fetcher)

  return (
    <Layout stats={data?.site_stats}>
      <Head>
        <title>Linkvan | Disclaimer</title>
      </Head>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          <Grid item xs={12}>
            <PageTitle>Disclaimer</PageTitle>
            <p>
              The contents of this app, including without limitation all data,
              directions, images,and descriptions are meant to be used for
              informational purposes only. By using this app, you acknowledge
              that any reliance on information is done at your own risk. While
              we take every effort to ensure accurate information, the data is
              only as accurate as the information provided by service providers.
            </p>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default AboutUs
