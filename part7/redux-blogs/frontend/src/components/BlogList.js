import Blog from './Blog'

const BlogList = ({
  blogs,
  deleteBlog,
  modifyBlog
}) => {

  const sortableBlogs = [...blogs]

  return (
    <div>
      {sortableBlogs
        .sort((x, y) => y.likes - x.likes)
        .map(blog =>
          <Blog
            key={blog._id}
            blog={blog}
            modifyBlog={modifyBlog}
            deleteBlog={deleteBlog}
          />
        )}
    </div>
  )
}

export default BlogList
