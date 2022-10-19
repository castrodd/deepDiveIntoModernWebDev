import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)

  if (!blogs.length) {
    return <div>Data not loaded. Navigate from Users tab.</div>
  }

  const blogsByUser = blogs.filter(blog => blog.user.id === id)
  const userName = blogsByUser[0].user.name

  return (
    <div>
      <h3>{userName}</h3>
      <h4>Added Blogs</h4>
      <ul>
        {blogsByUser.map(blog => <li key={blog.title}>{blog.title}</li> )}
      </ul>
    </div>
  )}

export default User
