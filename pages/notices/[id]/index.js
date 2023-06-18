import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetcher from 'utils/fetcher'
import formatDate from 'utils/format-date'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Layout from 'components/layout'
import NavBar from 'components/nav-bar'
import PageTitle from 'components/page-title'
import { Loading } from 'components/icons'

const StyledPaper = styled(Paper)`
  padding: 12px;
  margin-bottom: 12px;
`

const Notice = () => {
  const router = useRouter()
  const { data, error } = useSWR(`/api/notices/${router.query.id}`, fetcher)

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
        <title>Linkvan</title>
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

export default Notice
