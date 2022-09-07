const BlogForm = ({
  createBlog,
  author,
  title,
  url,
  setAuthor,
  setTitle,
  setUrl
}) => {
  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={createBlog}>
        <div>
          author:
          <input
            type='text'
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title:
          <input
            type='text'
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default BlogForm