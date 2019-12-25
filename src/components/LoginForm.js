import React from 'react'

const LoginForm = ({username, onUsernameChange, password, onPasswordChange, onLogin}) => (
  <div>
    username <input type='text' value={username} onChange={onUsernameChange} /> <br/>
    passsword <input type='password' value={password} onChange={onPasswordChange} /> <br/>
    <button onClick={onLogin}>Login</button>
  </div>
)


export default LoginForm