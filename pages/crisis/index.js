import React from 'react'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from 'components/stack'
import Layout from 'components/layout'
import NavBar from 'components/nav-bar'
import Lines from 'components/lines'
import PageTitle from 'components/page-title'

const lines = [
  {
    title: 'Vancouver Child and Youth Mental Health Referral Intake',
    description:
      'For suicidal children and youth (18 & under) at risk to suicide.',
    phones: [
      {
        number: '+16047094111',
        label: '604-709-4111'
      }
    ]
  },
  {
    title: 'VictimLink BC',
    description:
      'A toll-free, confidential, multilingual telephone service available across BC and Yukon 24 hours a day, 7 days a week. It provides information and referral services to all victims of crime and immediate crisis support to victims of family and sexual violence, including victims of human trafficking exploited for labour or sexual services.',
    phones: [
      {
        number: '+18005630808',
        label: '1-800-563-0808'
      }
    ]
  },
  {
    title: 'Province Wide Suicide Line Crisis 24 hours',
    description:
      'The Crisis Centre has been providing emotional support to youth, adults and seniors in distress since 1969. As a safe place to turn when there seems to be no hope, the Crisis Centre is operated by 450+ frontline volunteers and a small team of professional staff who support and empower individuals to see their own strengths and options, 24 hours a day, 7 days a week. We work at the community level to provide education and training aimed at fostering resiliency and building capacity to respond to crisis and suicide.',
    phones: [
      {
        number: '+18007842433',
        label: '1-800-SUICIDE (1-800-784-2433)'
      }
    ]
  },
  {
    title: '310 Mental Health Support Line (province wide) Crisis 24 hours',
    description:
      'For emotional support, information and resources specific to mental health.',
    phones: [
      {
        number: '+13106789',
        label: '310-6789'
      }
    ]
  },
  {
    title:
      'Crisis Intervention & Suicide Prevention Centre of BC Crisis 24 hours',
    description:
      'Serves Vancouver, North Vancouver city & district, Bowen Island, West Vancouver, Burnaby',
    address: '763 East Broadway, Vancouver, BC V5T 1X8',
    websites: [
      {
        link: 'http://www.youthinbc.com/',
        description: 'Also has online chat for youth'
      }
    ],
    phones: [
      {
        number: '+16048723311',
        label: '604-872-3311',
        description: ''
      },
      {
        number: '+16048720113',
        label: '604-872-0113',
        description: 'TTY'
      }
    ]
  },
  {
    title: 'WAVAW (Women Against Violence Against Women) 24-Hour Crisis Line',
    description:
      'WAVAW provides immediate emotional support 24 hours a day, 7 days a week, 365 days a year through our 24-Hour Crisis Line. Our toll-free, confidential Crisis Line is answered by empathetic and skilled support workers. Crisis Line support workers are there to listen, to provide non-judgmental support and if needed, to provide information on available counselling services or referrals to other community programs and organizations. All services are free and confidential.',
    phones: [
      {
        number: '+16042556344',
        label: '604-255-6344',
        description: ''
      },
      {
        number: '+18773927583',
        label: '1-877-392-7583',
        description: 'Toll Free'
      }
    ]
  },
  {
    title: 'Trans Lifeline',
    description:
      'This line is primarily for transgender people experiencing a crisis. This includes people who may be struggling with their gender identity and are not sure that they are transgender. While our goal is to prevent self-harm, we welcome the call of any transgender person in need. We will do our very best to connect them with services that can help them meet that need. If you are not sure whether you should call or not, then please call us.',
    phones: [
      {
        number: '+18773306366',
        label: '1-877-330-6366',
        description: 'Toll Free Anywhere in Canada'
      }
    ]
  },
  {
    title: 'Vancouver Recovery Club',
    description:
      'The Vancouver Recovery Club offers help, hope and services to alcoholics and addicts seeking relief and recovery from their addiction and disease. The Vancouver Recovery Club is open 24 hours a day, 7 days a week. Addiction never sleeps. We are always available.',
    address: '2775 Sophia Street, Vancouver, BC V5T 3L1',
    websites: [
      {
        link: 'http://vancouverrecoveryclub.com'
      }
    ],
    phones: [
      {
        number: '+16047089955',
        label: '604-708-9955'
      }
    ]
  }
]

const Crisis = () => {
  const { data } = useSWR('/api/home', fetcher)

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
          <Grid item xs={12}>
            <PageTitle>Crisis Lines</PageTitle>
            <Stack gridGap={3}>
              {lines.map((line) => (
                <Lines key={line.title} data={line} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Crisis
