import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styled from '@emotion/styled'
import fetcher from 'utils/fetcher'
import { useTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Stack from 'components/stack'
import Layout from 'components/layout'
import HR from 'components/hr'
import NavBar from 'components/nav-bar'
import { Loading, ChevronRight } from 'components/icons'

const ColumnArrow = styled(Grid)`
  text-align: right;
  align-self: center;
`

const Notices = () => {
  const router = useRouter()
  const theme = useTheme()

  const ColumnOne = styled(Grid)`
    ${theme.breakpoints.up('md')} {
      text-align: left;
    }
  `

  const goTo = (route) => () => router.push(route)

  /* Fetch notices */
  const apiKey = `/api/notices?type=${router.query.type}`
  const { data, error } = useSWR(router.query.type ? apiKey : null, fetcher)

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

    if (data.notices.length <= 0) return <div>No notices found.</div>

    return (
      <Grid item xs={12}>
        <Stack gridGap={2}>
          <HR />
          {data.notices?.map((notice) => (
            <>
              <ButtonBase onClick={goTo(`/notices/${notice.slug}`)}>
                <Grid container>
                  <ColumnOne item xs={11}>
                    <Box fontSize="body1.fontSize" fontWeight="fontWeightBold">
                      {notice.title}
                    </Box>
                  </ColumnOne>
                  <ColumnArrow item xs={1}>
                    <ChevronRight size={20} />
                  </ColumnArrow>
                </Grid>
              </ButtonBase>
              <HR />
            </>
          ))}
        </Stack>
      </Grid>
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

export default Notices
