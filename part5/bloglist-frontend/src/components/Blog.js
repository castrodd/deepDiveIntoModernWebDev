import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [viewAll, setViewAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const addLike = async (event) => {
    event.preventDefault()
    const blogPayload = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: likes + 1,
      user: blog.user.id
    }
    await blogService.create(blogPayload)
    setLikes(likes + 1)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const title = () => (
    <div className="blog">
      <span>Title:</span> {blog.title}
      <button onClick={() => setViewAll(true)}>view</button>
    </div>
  )

  const fullBlog = () => (
    <div className="blog" style={blogStyle}>
      <span>Title:</span> {blog.title}
      <button onClick={() => setViewAll(false)}>hide</button><br/>
      <span>By:</span> {blog.author}<br/>
      <span> URL:</span> {blog.url}<br/>
      <span>Likes:</span> {likes}
      <button onClick={addLike}>Like</button>
    </div>
  )

  return (
    viewAll
    ? fullBlog()
    : title()
  )
}

export default Blog