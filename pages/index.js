import React from 'react'
import Head from 'next/head'
import Layout from '../components/layout'

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Linkvan</title>
      </Head>
      <h3>What service are you looking for?</h3>
      <p>
        <a href="/">
          <span>Category Item</span>
        </a>
      </p>
      <p>
        <a href="/">
          <span>Category Item</span>
        </a>
      </p>
      <hr />
      <p>
        <a href="/">
          <span>Category Item</span>
        </a>
      </p>
      <p>
        <a href="/">
          <span>Category Item</span>
        </a>
      </p>
      <p>
        <a href="/">
          <span>Category Item</span>
        </a>
      </p>
      <p>
        <a href="/">
          <span>Category Item</span>
        </a>
      </p>
    </Layout>
  )
}

export default Home
