import { useParams } from 'react-router-dom'

const User = ({ blogs }) => {
  const id = useParams().id

  if (!blogs.length) {
    return <div>Data not loaded. Navigate from Users tab.</div>
  }

  const blogsByUser = blogs.filter(blog => blog.user.id === id)
  const userName = blogsByUser[0].user.name

  return (
    <div>
      <h1>{userName}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {blogsByUser.map(blog => <li key={blog.title}>{blog.title}</li> )}
      </ul>
    </div>
  )}

export default User
