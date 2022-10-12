import { useParams } from 'react-router-dom'

const User = ({ blogs }) => {
  const id = useParams().id
  const blogsByUser = blogs.filter(blog => blog.user.id === id)
  const userName = blogsByUser[0].user.name
  return (
    <div>
      <h1>{userName}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {blogsByUser.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )}

export default User