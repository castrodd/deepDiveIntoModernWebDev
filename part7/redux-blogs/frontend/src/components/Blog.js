import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ modifyBlog, deleteBlog }) => {
  const id = useParams().id
  const navigate = useNavigate()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(blog => blog._id === id)[0]

  const addLike = async (event) => {
    event.preventDefault()
    const blogPayload = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      comments: blog.comments
    }
    await modifyBlog(blog._id, blogPayload)
  }

  const addComment = async (event) => {
    event.preventDefault()
    const newComments = [...blog.comments, event.target['comment'].value]
    const blogPayload = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id,
      comments: newComments
    }
    await modifyBlog(blog._id, blogPayload)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    navigate('/')
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
      <p>By: {blog.author}</p>
      <p> URL: {blog.url}</p>
      <p>Likes: {blog.likes}
        <button id='like-button' onClick={addLike}>Like</button><br />
      </p>
      <p>Added by {blog.user.name ?? 'Unknown'}</p>
      <button id='remove-button' onClick={removeBlog}>Remove</button>

      <h3>Comments</h3>
      <div>
        <form onSubmit={addComment}>
          <input
            type='text'
            id='comment'
          />
          <button id='submit' type='submit'>Add comment</button>
        </form>
      </div>

      {blog.comments.length > 0 &&
        < div >
          <ul>
            {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
          </ul>
        </div>
      }

      {blog.comments.length === 0 && <div>No comments posted yet.</div>}
    </div >
  )
}

Blog.propTypes = {
  modifyBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog