import { useEffect } from 'react'

import { useSelector } from 'react-redux'

const Users = () => {
  const blogs = useSelector(state => state.blogs)
  const users = {}

  useEffect(() => {
    blogs.forEach(blog => {
      const currentUser = blog.user
      if (currentUser) {
        Object.hasOwn(users, currentUser.name)
          ? blogs[currentUser.name].count += 1
          : blogs[currentUser.name] = { count: 1, id: currentUser.id }
      }
    })
  })

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <td>&nbsp;</td>
          <td>Blogs Created</td>
        </tr>
        {Object.keys(users).map(userName =>
          <tr key={userName}>
            <td>{userName}</td>
            <td>{users[userName].count}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users