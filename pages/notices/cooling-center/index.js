import React from 'react'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import NoticePage from 'components/notice-page'

const Notice = () => {
  // first get notices for cooling-center
  const noticesResponse = useSWR(`/api/notices?type=cooling_center`, fetcher)
  // then get the data for the one notice
  const { data, error } = useSWR(
    noticesResponse.data
      ? `/api/notices/${noticesResponse.data.notices[0].slug}`
      : null,
    fetcher
  )

  return <NoticePage data={data} error={error} />
}

export default Notice
