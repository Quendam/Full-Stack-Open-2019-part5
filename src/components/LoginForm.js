import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const LoginForm = ({ onLogin }) => {
  const username = useField('')
  const password = useField('')
  const handleLogin = () => {
    onLogin(username.value, password.value)
  }

  return (
    <div>
      username <input {...username} type='text' /> <br/>
      passsword <input {...password} type='password' /> <br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default LoginForm