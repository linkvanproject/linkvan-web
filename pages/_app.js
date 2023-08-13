import React from 'react'
// import Script from 'next/script'
import 'fontsource-roboto'
import '../public/styles.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Google Analytics */}
      {/* <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script> */}
      {/* --------------- */}

      <Component {...pageProps} />
    </>
  )
}
