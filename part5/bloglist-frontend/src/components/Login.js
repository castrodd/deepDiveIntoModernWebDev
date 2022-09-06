import Notification from './Notification'

const LoginForm = ({
  message,
  handleLogin,
  setUsername,
  setPassword,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='text'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default LoginForm