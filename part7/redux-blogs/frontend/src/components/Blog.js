import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, modifyBlog, deleteBlog }) => {
  const [viewAll, setViewAll] = useState(false)

  const addLike = async (event) => {
    event.preventDefault()
    const blogPayload = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    await modifyBlog(blog._id, blogPayload)
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
    <div className='blog' id='title'>
      <span>Title:</span> {blog.title}
      <button onClick={() => setViewAll(true)}>view</button>
    </div>
  )

  const fullBlog = () => (
    <div className='blog' id='full-blog' style={blogStyle}>
      <span>Title:</span> {blog.title}
      <button id='hide-button' onClick={() => setViewAll(false)}>hide</button><br/>
      <span>By:</span> {blog.author}<br/>
      <span> URL:</span> {blog.url}<br/>
      <span>Likes:</span> {blog.likes}
      <button id='like-button' onClick={addLike}>Like</button><br/>
      <button id='remove-button' onClick={removeBlog}>Remove</button>
    </div>
  )

  return (
    viewAll ? fullBlog() : title()
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  modifyBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog