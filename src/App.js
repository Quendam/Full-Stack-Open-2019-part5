import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import UserInfo from './components/UserInfo'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const handleLogin = async () => {
    try{
      const user = await loginService.login(
        username, password,
      )  

      if(user.token){
        setUser(user)
        setUsername('')
        setPassword('')
        // Info message here?
        console.log("Token", user);
        
      }else{
        setUser(null)
        // Error message here?
        console.log("no token", user);
        
      }      
    } catch(execption) {
      setUser(null)
      // Error message here
      console.log("Exception", execption);
      
    } 
  } 

  useEffect(() => {
    blogService
      .getAll()
      .then(receivedBlogs => setBlogs(receivedBlogs))
  }, [])

  if(!user){
    return (
      <div>
        <h2>Login to application</h2>

        <LoginForm
          username={username}
          password={password}
          onUsernameChange={({target}) => setUsername(target.value)}
          onPasswordChange={({target}) => setPassword(target.value)}
          onLogin={handleLogin}
        />
      </div>
    )
  }

  const blogList = blogs.map(entry => 
    <Blog
      key={entry.id}
      blog={entry}
    /> 
  )

  return (
    <div>
      <h1>Blogs</h1>
      <UserInfo user={user} />
      {blogList}
    </div>
  )
}


export default App
