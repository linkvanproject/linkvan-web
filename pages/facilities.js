import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import styled from 'styled-components'
import haversine from 'haversine-distance'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Stack from 'stack-styled'
import Layout from 'components/layout'
import HR from 'components/hr'
import NavBar from 'components/nav-bar'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Box from '@material-ui/core/Box'
import ListItem from 'components/list-item'

const FilterBar = styled.div`
  display: flex;
  justify-content: space-around;
`

const FilterOption = styled(ToggleButton)`
  width: 65px;
  padding: 6px;
`

const addDistance = (list = [], location) => {
  if (!location) return list

  const startPoint = { latitude: location.lat, longitude: location.lng }

  const formattedList = list.map((item) => ({
    ...item,
    distance: haversine(startPoint, {
      latitude: Number(item.lat),
      longitude: Number(item.long)
    })
  }))

  return formattedList
}

const sortList = (sort, data) =>
  sort === 'near' ? sortNear(data) : sortAlphabetic(data)

const sortNear = (list) => {
  const sortedList = [...list].sort((a, b) => {
    const distanceA = a.distance
    const distanceB = b.distance
    if (distanceA < distanceB) return -1
    if (distanceA > distanceB) return 1
    return 0
  })

  return sortedList
}

const sortAlphabetic = (list = []) => {
  const sortedList = [...list].sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

  return sortedList
}

const Facilities = () => {
  const router = useRouter()
  const [listSort, setListSort] = useState('near')
  const [listFilter, setListFilter] = useState('open')
  const [userLocation, setUserLacation] = useState(undefined)
  const [facilities, setFacilities] = useState([])

  /* Request user location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLacation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  /* Fetch facilities */
  let apiKey = '/api/facilities'
  if (router.query.service) {
    apiKey = `/api/facilities?service=${router.query.service}`
  } else if (router.query.search) {
    apiKey = `/api/facilities?search=${router.query.search}`
  }
  const { data, error } = useSWR(apiKey, fetcher)

  /* Handle subsequent data sorting */
  const handleSorting = (sort) => {
    if (sort) {
      setListSort(sort)
      setFacilities(sortList(sort, facilities))
    }
  }
  /* Handle initial data sorting */
  useEffect(() => {
    const formattedFacilities = addDistance(data?.facilities, userLocation)
    setFacilities(sortList(listSort, formattedFacilities))
  }, [data, userLocation])

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
              onChange={(_, value) => handleSorting(value)}
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
              onChange={(_, value) => value && setListFilter(value)}
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
            {facilities?.map((facility) => (
              <ListItem
                key={facility.id}
                data={facility}
                filter={listFilter}
                location={userLocation}
              />
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
