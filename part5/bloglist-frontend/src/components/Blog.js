import { useState } from "react"

const Blog = ({ blog }) => {
  const [viewAll, setViewAll] = useState(false)

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
      <span>Likes:</span> {blog.likes}
      <button>Like</button>
    </div>
  )

  return (
    viewAll
    ? fullBlog()
    : title()
  )
}

export default Blog