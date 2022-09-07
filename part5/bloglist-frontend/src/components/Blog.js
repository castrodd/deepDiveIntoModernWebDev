const Blog = ({blog}) => (
  <div className="blog">
    <span>Title:</span> {blog.title}  <span>By:</span> {blog.author}
  </div>  
)

export default Blog