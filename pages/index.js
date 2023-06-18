import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Stack from 'stack-styled'
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
  Notices
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

const Category = styled(ButtonBase)`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
`

const Icon = styled.div`
  flex-grow: 0;
  flex-basis: 30px;
`

const Title = styled.div`
  flex-grow: 1;
  text-align: left;
  padding: 0px 12px;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
`

const IconChevronRight = styled(ChevronRight)`
  flex-grow: 0;
`

const CategoryButton = ({ title, icon, onClick }) => {
  const theme = useTheme()

  const {
    typography: { body1, fontWeightBold }
  } = theme

  return (
    <Category onClick={onClick}>
      <Icon>{icon}</Icon>
      <Title fontSize={body1.fontSize} fontWeight={fontWeightBold}>
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

  const goTo = (route) => () => router.push(route)

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
                <CategoryButton title="COVID-19" icon={<Virus />} />
              )}
              <CategoryButton
                title="Overdose Prevention"
                icon={<OverdosePrevention />}
                onClick={goTo('/facilities?service=overdose_prevention')}
              />
              {!!data?.notices?.warming_center && (
                <CategoryButton
                  title="Warming Center"
                  icon={<WarmingCooling />}
                />
              )}
              {!!data?.notices?.cooling_center && (
                <CategoryButton
                  title="Cooling Center"
                  icon={<WarmingCooling />}
                />
              )}
              <HR />
              <CategoryButton
                title="Shelter"
                icon={<Shelter />}
                onClick={goTo('/facilities?service=shelter')}
              />
              <CategoryButton
                title="Food"
                icon={<Food />}
                onClick={goTo('/facilities?service=food')}
              />
              <CategoryButton
                title="Medical"
                icon={<Medical />}
                onClick={goTo('/facilities?service=medical')}
              />
              <CategoryButton
                title="Hygiene"
                icon={<Hygiene />}
                onClick={goTo('/facilities?service=hygiene')}
              />
              <CategoryButton
                title="Technology"
                icon={<Technology />}
                onClick={goTo('/facilities?service=technology')}
              />
              <CategoryButton
                title="Legal"
                icon={<Legal />}
                onClick={goTo('/facilities?service=legal')}
              />
              <CategoryButton
                title="Learning"
                icon={<Learning />}
                onClick={goTo('/facilities?service=learning')}
              />
              <CategoryButton
                title="Crisis Lines"
                icon={<CrisisLines />}
                onClick={goTo('/crisis')}
              />
              <CategoryButton
                title="Notices"
                icon={<Notices />}
                onClick={goTo('/notices')}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
