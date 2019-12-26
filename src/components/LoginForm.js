import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, onUsernameChange, password, onPasswordChange, onLogin }) => (
  <div>
    username <input type='text' value={username} onChange={onUsernameChange} /> <br/>
    passsword <input type='password' value={password} onChange={onPasswordChange} /> <br/>
    <button onClick={onLogin}>Login</button>
  </div>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
}

export default LoginForm