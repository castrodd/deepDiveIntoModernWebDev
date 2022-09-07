import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const sendMessage = (status, content) => {
    setMessage(
      {
        status: status,
        content: content
      }
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      sendMessage('error', 'Wrong credentials!')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisible()
      blog.user = user.id
      const response = await blogService.create(blog)
      sendMessage('notice', 'Blog created')
      setBlogs([...blogs, response])
    }
    catch (exception) {
      sendMessage('error', 'Unable to create new blog')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const loginForm = () => (
      <Toggle buttonLabel="login">
        <LoginForm
          message={message}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      </Toggle>
  )

  const blogsForm = () => (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <h4>Logged in as {user.username}
        <button onClick={handleLogout}>
          logout
        </button>
      </h4>

    <Toggle buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Toggle>

      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )

  return (
    user
      ? blogsForm()
      : loginForm()
  )
}

export default App
