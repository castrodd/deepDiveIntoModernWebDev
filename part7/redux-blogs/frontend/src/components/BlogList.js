import { Link } from 'react-router-dom'

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
          <div key={blog.title}>
            <Link
              key={blog.title}
              to={`/blogs/${blog._id}`}>
              {blog.title}
            </Link>
          </div>
        )}
    </div>
  )
}

export default BlogList
