import Blog from './Blog'

const BlogList = ({
  blogs,
  deleteBlog,
  modifyBlog
}) => {

  return (
    <div>
      {blogs
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