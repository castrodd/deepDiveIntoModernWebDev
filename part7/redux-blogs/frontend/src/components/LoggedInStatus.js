import { useSelector } from 'react-redux'

const LoggedInStatus = (handleLogout) => {
  const user = useSelector(state => state.user)

  return (
    <div>
      <h4>Logged in as {user.username}
        <button onClick={handleLogout}>logout</button>
      </h4>
    </div>
  )
}

export default LoggedInStatus