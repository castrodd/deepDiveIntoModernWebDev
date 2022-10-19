import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {

  const sortableBlogs = [...blogs]

  return (
    <div>
      {sortableBlogs
        .sort((x, y) => y.likes - x.likes)
        .map(blog =>
          <div className='blogs' key={blog.title}>
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
