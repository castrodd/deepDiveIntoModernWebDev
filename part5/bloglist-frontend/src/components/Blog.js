import { useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, deleteBlog }) => {
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

  const removeBlog = async (event) => {
    event.preventDefault()
    await deleteBlog(blog)
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
      <button onClick={addLike}>Like</button><br/>
      <button onClick={removeBlog}>Remove</button>
    </div>
  )

  return (
    viewAll
    ? fullBlog()
    : title()
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog