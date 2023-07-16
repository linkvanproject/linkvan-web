import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetcher from 'utils/fetcher'
import convertTo12Hour from 'utils/convert-to-12-hour'
import formatDate from 'utils/format-date'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Layout from 'components/layout'
import NavBar from 'components/nav-bar'
import Map from 'components/map'
import PageTitle from 'components/page-title'
import {
  ChevronRight,
  Male,
  Female,
  Transgender,
  AgeChildren,
  AgeYouth,
  AgeAdult,
  AgeSenior,
  OverdosePrevention,
  Shelter,
  Food,
  Medical,
  Hygiene,
  Technology,
  Legal,
  Learning,
  Phone,
  Call,
  Website,
  Directions,
  Loading
} from 'components/icons'

const StyledPaper = styled(Paper)`
  padding: 12px;
  margin-bottom: 12px;
`

const ServiceNote = styled(Paper)`
  padding: 12px;
  margin-top: 12px;
`

const StyledTableContainer = styled(TableContainer)`
  padding: 0;

  > table > tbody > tr:last-child * {
    border-bottom: 0;
  }
`

const getIcon = (icon, size) => {
  const icons = {
    male: Male,
    female: Female,
    transgender: Transgender,
    children: AgeChildren,
    youth: AgeYouth,
    adult: AgeAdult,
    senior: AgeSenior,
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

  const Icon = icons[icon] || null
  if (icons[icon]) return <Icon key={icon} size={size} />
  return Icon
}

const getLabel = (label) => {
  const labels = {
    male: 'Male',
    female: 'Female',
    transgender: 'Transgender',
    children: 'Children',
    youth: 'Youth',
    adult: 'Adult',
    senior: 'Senior',
    shelter: 'Shelter',
    food: 'Food',
    medical: 'Medical',
    hygiene: 'Hygiene',
    technology: 'Technology',
    legal: 'Legal',
    learning: 'Learning',
    overdose_prevention: 'Overdose Prevention',
    phone: 'Phone'
  }

  return labels[label] || ''
}

const useFacilitySchedule = () => {
  const theme = useTheme()

  const TagDefault = styled(Box)`
    font-weight: bold;
  `

  const TagSuccess = styled(TagDefault)`
    font-weight: bold;
    color: ${theme.palette.success.main};
  `

  const TagError = styled(TagDefault)`
    font-weight: bold;
    color: ${theme.palette.error.main};
  `

  const formatScheduleHour = (schedule = {}) => {
    if (schedule.availability === 'open')
      return <TagSuccess>Open 24HR</TagSuccess>
    if (schedule.availability === 'closed') return <TagError>Closed</TagError>
    if (schedule.availability === 'set_times' && schedule.times?.length > 0) {
      return schedule.times.map((time) => {
        const fromTime = convertTo12Hour(`${time.from_hour}:${time.from_min}`)
        const toTime = convertTo12Hour(`${time.to_hour}:${time.to_min}`)
        return (
          <TagDefault key={`${time.from_hour}${time.to_hour}`}>
            {`${fromTime} - ${toTime}`}
          </TagDefault>
        )
      })
    }
    return '-'
  }

  return {
    formatScheduleHour
  }
}

const Facility = () => {
  const { formatScheduleHour } = useFacilitySchedule()

  const router = useRouter()
  const { data, error } = useSWR(`/api/facilities/${router.query.id}`, fetcher)

  const goTo = (route) => () => router.push(route)

  const SectionTitle = (props) => (
    <Box fontSize="h6.fontSize" color="grey.700" mb={1} {...props} />
  )

  const Subtitle = (props) => (
    <Box fontSize="subtitle1.fontSize" color="grey.700" {...props} />
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

    if (!data.facility) return <div>Facility not found.</div>

    const { facility } = data

    return (
      <>
        <Grid item xs={12}>
          <PageTitle>{facility.name}</PageTitle>
        </Grid>
        <Grid item xs={12}>
          <SectionTitle>Welcomes</SectionTitle>
          <StyledPaper elevation={0} variant="outlined">
            <Box display="flex">
              {facility.welcomes?.map((item) => (
                <Box
                  key={item.key}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  paddingRight="18px"
                >
                  {getIcon(item.key, 32)}
                  <Box fontSize="caption.fontSize" paddingTop="6px">
                    {getLabel(item.key)}
                  </Box>
                </Box>
              ))}
            </Box>
          </StyledPaper>
          <SectionTitle>Services</SectionTitle>
          <StyledPaper elevation={0} variant="outlined">
            <Box display="flex">
              {facility.services?.map((item) => (
                <Box key={item.key} paddingRight="18px">
                  {getIcon(item.key, 32)}
                </Box>
              ))}
            </Box>
            <Box display="flex" flexDirection="column">
              {facility.services?.map(
                (item) =>
                  item.note && (
                    <ServiceNote key={item.key} elevation="2">
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        paddingRight="18px"
                      >
                        {getIcon(item.key, 24)}
                        <Subtitle paddingTop="6px" paddingLeft="9px">
                          {getLabel(item.key)}
                        </Subtitle>
                      </Box>
                      <Box fontSize="caption.fontSize" paddingTop="6px">
                        {item.note}
                      </Box>
                    </ServiceNote>
                  )
              )}
            </Box>
          </StyledPaper>
          <SectionTitle>Address</SectionTitle>
          <StyledPaper elevation={0} variant="outlined">
            <Box margin="-12px" marginBottom="12px">
              <Map lat={Number(facility.lat)} lng={Number(facility.long)} />
            </Box>
            <Box marginBottom="12px">{facility.address}</Box>
            <Button
              variant="outlined"
              fullWidth
              onClick={goTo(`/facilities/${router.query.id}/directions`)}
            >
              <Box
                display="flex"
                flex="1"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <Directions size={24} />
                  <Box marginLeft="12px">Directions</Box>
                </Box>
                <ChevronRight size={20} />
              </Box>
            </Button>
          </StyledPaper>
          <StyledTableContainer
            component={StyledPaper}
            elevation={0}
            variant="outlined"
          >
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" width="24px">
                    <Call size={24} />
                  </TableCell>
                  <TableCell>
                    <Link href={`tel:+1${facility.phone}`}>
                      {facility.phone}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Website size={24} />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`https://${facility.website}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {facility.website}
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
          <SectionTitle>Hours</SectionTitle>
          <StyledTableContainer
            component={StyledPaper}
            elevation={0}
            variant="outlined"
          >
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" width="30%">
                    Monday:
                  </TableCell>
                  <TableCell>
                    {formatScheduleHour(facility.schedule?.schedule_monday)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Tuesday:
                  </TableCell>
                  <TableCell>
                    {formatScheduleHour(facility.schedule?.schedule_tuesday)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Wednesday:
                  </TableCell>
                  <TableCell>
                    {formatScheduleHour(facility.schedule?.schedule_wednesday)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Thursday:
                  </TableCell>
                  <TableCell>
                    {formatScheduleHour(facility.schedule?.schedule_thursday)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Friday:
                  </TableCell>
                  <TableCell>
                    {formatScheduleHour(facility.schedule?.schedule_friday)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Saturday:
                  </TableCell>
                  <TableCell>
                    {formatScheduleHour(facility.schedule?.schedule_saturday)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Sunday:
                  </TableCell>
                  <TableCell>
                    {formatScheduleHour(facility.schedule?.schedule_sunday)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
          <SectionTitle>Notes</SectionTitle>
          <StyledPaper elevation={0} variant="outlined">
            {facility.notes}
          </StyledPaper>
          <SectionTitle>Last updated</SectionTitle>
          <StyledPaper elevation={0} variant="outlined">
            {formatDate(facility.updated_at)}
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

export default Facility
