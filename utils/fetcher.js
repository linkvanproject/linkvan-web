const fetcher = async (url) => {
  const userLocation = sessionStorage.getItem("userLocation");

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    headers: {
      "User-Location": userLocation
    }
  }).then((res) => 
    res.json()
  )
}

export default fetcher
