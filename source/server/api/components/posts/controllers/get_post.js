import Posts from 'api_models/posts'

async function getPost (request, response) {
  const url = request.params.url
  const posts = new Posts()
  const data = await posts.getFromUrl(url)
  posts.destructor()

  data
    ? response.success({
      ...data
    })
    : response.error({
      errorMessage: 'post not found',
      statusCode: '404'
    })
}

export default getPost
