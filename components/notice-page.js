import React from 'react'
import Head from 'next/head'
import formatDate from 'utils/format-date'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Layout from 'components/layout'
import NavBar from 'components/nav-bar'
import PageTitle from 'components/page-title'
import { Loading } from 'components/icons'

const StyledPaper = styled(Paper)`
  padding: 12px;
  margin-bottom: 12px;
`

const NoticePage = ({ data, error }) => {
  const SectionTitle = (props) => (
    <Box fontSize="h6.fontSize" color="grey.700" mb={1} {...props} />
  )

  const getContent = () => {
    if (error)
      return (
        <Box textAlign="center" flexGrow={1}>
          failed to load
        </Box>
      )

    if (!data)
      return (
        <Box textAlign="center" flexGrow={1}>
          <Loading />
        </Box>
      )

    if (!data.notice) return <div>Notice not found.</div>

    const { notice } = data

    return (
      <>
        <Grid item xs={12}>
          <PageTitle>{notice.title}</PageTitle>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper elevation={0} variant="outlined">
            <div
              dangerouslySetInnerHTML={{
                __html: notice.content_html
              }}
            />
          </StyledPaper>
          <SectionTitle>Last updated</SectionTitle>
          <StyledPaper elevation={0} variant="outlined">
            {formatDate(notice.updated_at)}
          </StyledPaper>
        </Grid>
      </>
    )
  }

  return (
    <Layout stats={data?.site_stats}>
      <Head>
        <title>Linkvan | Notice | {data?.notice?.title}</title>
      </Head>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          {getContent()}
        </Grid>
      </Container>
    </Layout>
  )
}

export default NoticePage
