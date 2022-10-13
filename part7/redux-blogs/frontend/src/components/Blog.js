import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ modifyBlog, deleteBlog }) => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(blog => blog._id === id)[0]

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

  return (
    <div className='blog' id='full-blog' style={blogStyle}>
      <h3>{blog.title}</h3>
      <h4>By: {blog.author}</h4>
      <h4> URL: {blog.url}</h4>
      <h4>Likes: {blog.likes} </h4>
      <button id='like-button' onClick={addLike}>Like</button><br/>
      <button id='remove-button' onClick={removeBlog}>Remove</button>
    </div>
  )
}

Blog.propTypes = {
  modifyBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog