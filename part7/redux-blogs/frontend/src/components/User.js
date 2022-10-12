import { useParams } from 'react-router-dom'

const User = ({ blogs }) => {
  const id = useParams().id
  const blogsByUser = blogs.filter(blog => blog.user.id === id)
  return (
    <div>
      <ul>
        {blogsByUser.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )}

export default User