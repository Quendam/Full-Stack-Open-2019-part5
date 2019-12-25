import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [infoMessage, setInfoMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

        setInfoMessage(`${user.name} has logged in`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        
      }else{
        setUser(null)

        setErrorMessage('wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }      
    } catch(execption) {
      setUser(null)

      setErrorMessage('Error while processing login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    } 
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleAddBlog = async (blog) => {
    const response = await blogService.create(blog)

    if(response.status === 201){
      blogService
      .getAll()
      .then(receivedBlogs => setBlogs(receivedBlogs))

      setInfoMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }else {
      setErrorMessage('Error while adding blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        {errorMessage && <Notification type='error' message={errorMessage} />}
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
      {errorMessage && <Notification type='error' message={errorMessage} />}
      {infoMessage && <Notification type='info' message={infoMessage} />}

      <UserInfo 
        user={user}
        onLogout={handleLogout} 
      />
      <Togglable 
        buttonLabel='new note'
      >
        <BlogForm 
          onCreate={handleAddBlog}
        />
      </Togglable>
      {blogList}
    </div>
  )
}


export default App
