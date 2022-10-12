import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoggedInStatus from './LoggedInStatus'
import { Link } from 'react-router-dom'

const Users = ({ handleLogout }) => {
  const blogs = useSelector(state => state.blogs)
  const [users, setUsers] = useState({})

  useEffect(() => {
    let tempUsers = {}
    blogs.forEach(blog => {
      if (Object.hasOwn(blog, 'user') && blog.user) {
        const currentUser = blog.user
        const userName = currentUser.name
        if (!Object.hasOwn(tempUsers, userName)) {
          tempUsers = { ...tempUsers, [userName]: { count: 1, id: currentUser.id } }
        } else {
          const updatedCount = tempUsers[userName].count + 1
          const updatedUser = { ...tempUsers[userName], count: updatedCount }
          tempUsers = { ...tempUsers, [userName]: updatedUser }
        }
      }
    })
    setUsers(tempUsers)
  }, [blogs])

  return (
    <div>
      <LoggedInStatus handleLogout={handleLogout} />

      <h1>Users</h1>
      <h3>Created by ddc</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(users)
            .sort()
            .map(userName =>
              <tr key={userName}>
                <td><Link to={`/users/${users[userName].id}`}>{userName}</Link></td>
                <td>{users[userName].count}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
