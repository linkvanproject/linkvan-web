import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
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
  margin: 20px 0;
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
  font-size: ${({ fontSize }) => fontSize}
  font-weight: ${({ fontWeight }) => fontWeight};
`

const IconChevronRight = styled(ChevronRight)`
  flex-grow: 0;
`

const CategoryButton = ({ title, icon }) => {
  const theme = useTheme()

  const {
    typography: { body1, fontWeightBold }
  } = theme

  return (
    <Category>
      <Icon>{icon}</Icon>
      <Title fontSize={body1} fontWeight={fontWeightBold}>
        {title}
      </Title>
      <IconChevronRight size={20} />
    </Category>
  )
}

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Linkvan</title>
      </Head>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <TitleBox>
              <Typography variant="h5">
                What service are you looking for???
              </Typography>
              {/* TODO Shows if has active alert */}
              <AlertButton variant="outlined">
                <AlertContent variant="outlined" severity="warning">
                  Alert
                </AlertContent>
              </AlertButton>
            </TitleBox>
          </Grid>
          <Grid item xs={12}>
            <Stack gridGap={3}>
              {/* TODO Shows if has covid notices */}
              <CategoryButton title="COVID-19" icon={<Virus />} />
              <CategoryButton
                title="Overdose Prevention"
                icon={<OverdosePrevention />}
              />
              {/* TODO Shows if has warming center notices */}
              <CategoryButton
                title="Warming Center"
                icon={<WarmingCooling />}
              />
              {/* TODO Shows if has cooling center notices */}
              <CategoryButton
                title="Cooling Center"
                icon={<WarmingCooling />}
              />
              <HR />
              <CategoryButton title="Shelter" icon={<Shelter />} />
              <CategoryButton title="Food" icon={<Food />} />
              <CategoryButton title="Medical" icon={<Medical />} />
              <CategoryButton title="Hygiene" icon={<Hygiene />} />
              <CategoryButton title="Technology" icon={<Technology />} />
              <CategoryButton title="Legal" icon={<Legal />} />
              <CategoryButton title="Learning" icon={<Learning />} />
              <CategoryButton title="Crisis Lines" icon={<CrisisLines />} />
              <CategoryButton title="Notices" icon={<Notices />} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
