import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Stack from 'stack-styled'
import Layout from 'components/layout'
import HR from 'components/hr'
import NavBar from 'components/nav-bar'
import {
  ChevronRight,
  OverdosePrevention,
  Shelter,
  Food,
  Medical,
  Hygiene,
  Technology,
  Legal,
  Learning,
  Phone
} from 'components/icons'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Box from '@material-ui/core/Box'
import getAvailability from 'utils/get-availability'

const FilterBar = styled.div`
  display: flex;
  justify-content: space-around;
`

const FilterOption = styled(ToggleButton)`
  width: 65px;
  padding: 6px;
`

const ColumnArrow = styled(Grid)`
  text-align: right;
  align-self: center;
`

const ListItem = ({ data, filter }) => {
  const theme = useTheme()

  const ColumnTwo = styled(Grid)`
    ${theme.breakpoints.up('md')} {
      text-align: right;
    }
  `

  const TagSuccess = styled.span`
    font-weight: bold;
    color: ${theme.palette.success.main};
  `

  const TagError = styled.span`
    font-weight: bold;
    color: ${theme.palette.error.main};
  `

  const TagWarning = styled.span`
    font-weight: bold;
    color: ${theme.palette.warning.main};
  `

  const getIcon = (icon) => {
    const serviceIcons = {
      shelter: Shelter,
      food: Food,
      medical: Medical,
      hygiene: Hygiene,
      technology: Technology,
      legal: Legal,
      learning: Learning,
      overdose_prevention: OverdosePrevention,
      phone: Phone
    }

    const Icon = serviceIcons[icon]
    const StyledIcon = styled(Icon)`
      margin: 0 5px;
    `
    return <StyledIcon key={icon} size={24} />
  }

  const availability = getAvailability(data.schedule)

  const availabilityLabels = {
    open: <TagSuccess>OPEN</TagSuccess>,
    closed: <TagError>CLOSED</TagError>,
    opening_soon: <TagSuccess>OPENING SOON</TagSuccess>,
    closing_soon: <TagWarning>CLOSING SOON</TagWarning>
  }

  if (filter === 'open' && availability !== 'open') return null

  return (
    <>
      <Grid container>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box fontSize="body1.fontSize" fontWeight="fontWeightBold">
                {data.name}
              </Box>
              <div>
                {availabilityLabels[availability]} {data.services.map(getIcon)}
              </div>
            </Grid>
            <ColumnTwo item xs={12} md={6}>
              <div>{data.phone && `Call: ${data.phone}`}</div>
              {/* TODO: make it clickable */}
              <div>4 minutes walking</div>
              {/* TODO: calculate walking distance */}
            </ColumnTwo>
          </Grid>
        </Grid>
        <ColumnArrow item xs={1}>
          <ChevronRight size={20} />
        </ColumnArrow>
      </Grid>
      <HR />
    </>
  )
}

const Facilities = () => {
  const router = useRouter()
  const [listSort, setListSort] = useState('near')
  const [listFilter, setListFilter] = useState('open')

  let apiKey = '/api/facilities'
  if (router.query.service) {
    apiKey = `/api/facilities?service=${router.query.service}`
  } else if (router.query.search) {
    apiKey = `/api/facilities?search=${router.query.search}`
  }

  const { data, error } = useSWR(apiKey, fetcher)

  const getContent = () => {
    if (error) return <Box textAlign="center">failed to load</Box>

    if (!data) return <Box textAlign="center">loading...</Box>

    if (data.facilities.length <= 0) return <div>No facilities found.</div>

    return (
      <>
        <Grid item xs={12}>
          <FilterBar>
            <ToggleButtonGroup
              value={listSort}
              exclusive
              onChange={(_, value) => setListSort(value)}
            >
              <FilterOption value="near" aria-label="near">
                Near
              </FilterOption>
              <FilterOption value="alphabetic" aria-label="alphabetic">
                A-Z
              </FilterOption>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={listFilter}
              exclusive
              onChange={(_, value) => setListFilter(value)}
            >
              <FilterOption value="open" aria-label="open">
                Open
              </FilterOption>
              <FilterOption value="all" aria-label="all">
                All
              </FilterOption>
            </ToggleButtonGroup>
          </FilterBar>
        </Grid>
        <Grid item xs={12}>
          <Stack gridGap={2}>
            <HR />
            {data.facilities.map((facility) => (
              <ListItem key={facility.id} data={facility} filter={listFilter} />
            ))}
          </Stack>
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

export default Facilities
