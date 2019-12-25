import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'

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

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        ) 

        blogService.setToken(user.token)
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

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleAddBlog = async (blog) => {
    console.log("testing", blog)
    const response = await blogService.create(blog)

    if(response.status == 201){
      blogService
      .getAll()
      .then(receivedBlogs => setBlogs(receivedBlogs))
    }else {
      // Error message here
    }
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(receivedBlogs => setBlogs(receivedBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
      <UserInfo 
        user={user}
        onLogout={handleLogout} 
      />
      <BlogForm 
        onCreate={handleAddBlog}
      />
      {blogList}
    </div>
  )
}


export default App
