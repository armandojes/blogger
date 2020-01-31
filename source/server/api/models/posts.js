import Model from 'api_modules/model'

class Post extends Model {
  getFromUrl (url) {
    const Posts = this.connection.table('posts')
    Posts.where('url', url)
    return Posts.fetch_single()
  }
}

export default Post
