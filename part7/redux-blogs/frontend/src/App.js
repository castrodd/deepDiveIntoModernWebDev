import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

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
      dispatch(setNotification('error', 'Wrong credentials!', 5))
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
      dispatch(setNotification('notice', 'Blog created', 5))
      setBlogs([...blogs, response])
    }
    catch (exception) {
      dispatch(setNotification('error', 'Unable to create new blog', 5))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const blogUser = setBlogUser(blog.user)
      if (!blogUser) {
        throw Error('Permission denied to remove blog!')
      }

      blogFormRef.current.toggleVisible()
      await blogService.remove(blog._id)
      dispatch(setNotification('notice', 'Blog deleted', 5))
      setBlogs(blogs.filter(currBlog => currBlog._id !== blog._id))
    }
    catch (exception) {
      dispatch(setNotification('error', 'Unable to delete blog', 5))
    }
  }

  const modifyBlog = async (blogId, blog) => {
    try {
      const response = await blogService.modify(blogId, blog)
      setBlogs(blogs.map(currBlog => {
        if (currBlog._id === blogId) {
          return response
        }
        return currBlog
      }))
    }
    catch (exception) {
      dispatch(setNotification('error', 'Unable to update blog', 5))
    }
  }

  const setBlogUser = (blogUser) => {
    if (!blogUser) {
      return ''
    }

    if (blogUser.id) {
      return blogUser.id
    }

    if (typeof blogUser === 'string') {
      return blogUser
    }

    return ''
  }

  const loginForm = () => (
    <Toggle buttonLabel="login">
      <LoginForm
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
      <h4>Logged in as {user.username}
        <button onClick={handleLogout}>logout</button>
      </h4>

      <Toggle buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggle>

      <BlogList
        blogs={blogs}
        deleteBlog={deleteBlog}
        modifyBlog={modifyBlog}
      />
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <h3>Created by ddc</h3>
      <Notification />
      { user
        ? blogsForm()
        : loginForm()
      }
    </div>
  )
}

export default App
