
export  async function fetchSearch(request) {
  const searchParams = new URLSearchParams({
    key: KEY,
    q: `${request}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const response = await axios.get(`${BASE_URL}?${searchParams}`)
    // .then(resp => {
    //   if (!resp.ok) {
    //     throw new Error(
    //       Notiflix.Notify.failure('Oops, there is no country with that name')
    //     );
    //   }
      return response.data;
//     })
//     .catch(err => console.error(err));
}