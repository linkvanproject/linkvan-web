import React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

const Title = (props) => (
  <Box fontSize="h6.fontSize" fontWeight="fontWeightBold" mb={2} {...props} />
)

const WebsiteLabel = (props) => (
  <Box component="span" color="grey.700" mb={2} {...props} />
)

const WebsiteLink = ({ url }) => (
  <Link href={url} target="_blank" rel="noopener">
    {url}
  </Link>
)
const PhoneNumber = ({ number, label }) => (
  <Link href={`tel:${number}`}>{label}</Link>
)

const Lines = ({ data }) => {
  const { title, description, address, websites, phones } = data

  return (
    <div>
      <Title>{title}</Title>
      <p>{description}</p>
      {address && <p>{address}</p>}
      {!!websites &&
        websites.map((website) => (
          <p key={website.link}>
            {website.description && (
              <WebsiteLabel>{website.description}: </WebsiteLabel>
            )}
            <WebsiteLink url={website.link} />
          </p>
        ))}
      <ul>
        {phones.map((phone) => (
          <li key={phone.number}>
            {phone.description && `${phone.description}: `}
            <PhoneNumber number={phone.number} label={phone.label} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Lines
