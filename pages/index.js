import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material/styles'
import Alert from '@mui/lab/Alert'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Link from '@mui/material/Link'
import Stack from 'components/stack'
import Layout from 'components/layout'
import HR from 'components/hr'
import {
  ChevronRight,
  Virus,
  OverdosePrevention,
  WarmingCooling,
  Shelter,
  Food,
  Medical,
  Hygiene,
  Technology,
  Legal,
  Learning,
  CrisisLines,
  Notices,
  // WaterFountain
} from 'components/icons'

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`

const AlertButton = styled(ButtonBase)`
  align-self: center;
`

const AlertContent = styled(Alert)`
  padding: 0px 10px;
`

const Category = styled(Link)`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
`

const Icon = styled.div`
  flex-grow: 0;
  flex-basis: 30px;
`

const Title = styled.div`
  flex-grow: 1;
  text-align: left;
  padding: 0px 12px;
`

const IconChevronRight = styled(ChevronRight)`
  flex-grow: 0;
`

const CategoryButton = ({ title, icon, url }) => {
  const theme = useTheme()

  const {
    typography: { body1, fontWeightBold },
    palette: { text }
  } = theme

  return (
    <Category href={url} style={{
      color: text.primary
    }}>
      <Icon>{icon}</Icon>
      <Title style={{
        fontSize: body1.fontSize,
        fontWeight: fontWeightBold,
      }} >
        {title}
      </Title>
      <IconChevronRight size={20} />
    </Category>
  )
}

const Home = () => {
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)

  const { data } = useSWR('/api/home', fetcher)

  const openAlert = () => setShowAlert(true)
  const closeAlert = () => setShowAlert(false)

  return (
    <Layout stats={data?.site_stats}>
      <Head>
        <title>Linkvan</title>
      </Head>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <TitleBox>
              <Typography variant="h5">
                What service are you looking for?
              </Typography>
              {!!data?.alert && (
                <>
                  <AlertButton variant="outlined" onClick={openAlert}>
                    <AlertContent variant="outlined" severity="warning">
                      Alert
                    </AlertContent>
                  </AlertButton>
                  <Dialog
                    open={showAlert}
                    onClose={closeAlert}
                    fullWidth
                    maxWidth="md"
                  >
                    <DialogTitle>{data.alert.title}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.alert.content
                          }}
                        />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={closeAlert} color="primary" autoFocus>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </TitleBox>
          </Grid>
          <Grid item xs={12}>
            <Stack gridGap={3}>
              {!!data?.notices?.covid19 && (
                <CategoryButton
                  title="COVID-19"
                  icon={<Virus />}
                  url="/notices/covid19"
                />
              )}
              <CategoryButton
                title="Overdose Prevention"
                icon={<OverdosePrevention />}
                url="/facilities?service=overdose_prevention"
              />
              {/* TODO: add condition to display button */}
              {/* <CategoryButton
                title="Water Fountains"
                icon={<WaterFountain />}
                url="/facilities?service=water_fountain"
              /> */}
              {!!data?.notices?.warming_center && (
                <CategoryButton
                  title="Warming Center"
                  icon={<WarmingCooling />}
                  url="/notices/warming-center"
                />
              )}
              {!!data?.notices?.cooling_center && (
                <CategoryButton
                  title="Cooling Center"
                  icon={<WarmingCooling />}
                  url="/notices/cooling-center"
                />
              )}
              <HR />
              <CategoryButton
                title="Shelter"
                icon={<Shelter />}
                url="/facilities?service=shelter"
              />
              <CategoryButton
                title="Food"
                icon={<Food />}
                url="/facilities?service=food"
              />
              <CategoryButton
                title="Medical"
                icon={<Medical />}
                url="/facilities?service=medical"
              />
              <CategoryButton
                title="Hygiene"
                icon={<Hygiene />}
                url="/facilities?service=hygiene"
              />
              <CategoryButton
                title="Technology"
                icon={<Technology />}
                url="/facilities?service=technology"
              />
              <CategoryButton
                title="Legal"
                icon={<Legal />}
                url="/facilities?service=legal"
              />
              <CategoryButton
                title="Learning"
                icon={<Learning />}
                url="/facilities?service=learning"
              />
              <CategoryButton
                title="Crisis Lines"
                icon={<CrisisLines />}
                url="/crisis"
              />
              <CategoryButton
                title="Notices"
                icon={<Notices />}
                url="/notices?type=general"
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
