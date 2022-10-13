import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationsReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import LoginForm from './LoginForm'
import Toggle from './Toggle'

const LoggedInStatus = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(setUser(null))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target[0].value,
        password: event.target[1].value
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification('notice', 'You are now logged in!', 5))
    } catch (exception) {
      dispatch(setNotification('error', 'Wrong credentials!', 5))
    }
  }

  const ToggleableLogin = () => (
    <Toggle buttonLabel="login">
      <LoginForm
        handleLogin={handleLogin}
      />
    </Toggle>
  )

  if (!user) {
    return (
      <ToggleableLogin />
    )
  }

  return (
    <div className='status'>
      <h4>Logged in as {user.username}
        <button onClick={handleLogout}>logout</button>
      </h4>
    </div>
  )
}

export default LoggedInStatus