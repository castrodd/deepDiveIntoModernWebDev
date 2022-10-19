import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      author: author,
      title: title,
      url: url
    }
    createBlog(blog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={addBlog}>
        <div>
          author:
          <input
            type='text'
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title:
          <input
            type='text'
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-blog' type='submit'>submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm