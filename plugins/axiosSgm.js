export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const axiosSgm = $axios.create({
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  })
  // Set baseURL to something different
  axiosSgm.setBaseURL(process.env.SgmUrlBase)

  // Inject to context as $api
  inject('axiosSgm', axiosSgm)
}
