import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import fetcher from 'utils/fetcher'
import NoticePage from 'components/notice-page'

const Notice = () => {
  const router = useRouter()

  const { data, error } = useSWR(
    router.query.id ? `/api/notices/${router.query.id}` : null,
    fetcher
  )

  return <NoticePage data={data} error={error} />
}

export default Notice
