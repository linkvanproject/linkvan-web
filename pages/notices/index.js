import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styled from 'styled-components'
import fetcher from 'utils/fetcher'
import { useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Stack from 'stack-styled'
import Layout from 'components/layout'
import HR from 'components/hr'
import NavBar from 'components/nav-bar'
import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
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
  const apiKey = '/api/notices'
  const { data, error } = useSWR(apiKey, fetcher)

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
