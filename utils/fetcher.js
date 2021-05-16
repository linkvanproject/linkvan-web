const fetcher = (url) =>
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`).then((res) =>
    res.json()
  )

export default fetcher
