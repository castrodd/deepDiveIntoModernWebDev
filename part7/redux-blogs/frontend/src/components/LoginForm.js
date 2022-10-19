import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin
}) => {
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            id="username"
          />
        </div>
        <div>
          password
          <input
            type='text'
            id="password"
          />
        </div>
        <button id='submit' type='submit'>submit</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm