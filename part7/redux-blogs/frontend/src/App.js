import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoggedInStatus from './components/LoggedInStatus'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import { setBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationsReducer'
import './index.css'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(response =>
      dispatch(setBlogs(response))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) {
      const currUser = JSON.parse(loggedInUser)
      dispatch(setUser(currUser))
      blogService.setToken(currUser.token)
    }
  }, [dispatch])

  const blogFormRef = useRef()

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisible()
      blog.user = user.id
      const response = await blogService.create(blog)
      dispatch(setNotification('notice', 'Blog created', 5))
      dispatch(setBlogs([...blogs, response]))
    }
    catch (exception) {
      dispatch(setNotification('error', 'Unable to create new blog', 5))
    }
  }

  const modifyBlog = async (blogId, blog) => {
    try {
      const response = await blogService.modify(blogId, blog)
      dispatch(setBlogs(blogs.map(currBlog => {
        if (currBlog._id === blogId) {
          return response
        }
        return currBlog
      })))
    }
    catch (exception) {
      dispatch(setNotification('error', 'Unable to update blog', 5))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const blogUser = setBlogUser(blog.user)
      if (!blogUser) {
        throw Error('Permission denied to remove blog!')
      }

      await blogService.remove(blog._id)
      dispatch(setNotification('notice', 'Blog deleted', 5))
      dispatch(setBlogs(blogs.filter(currBlog => currBlog._id !== blog._id)))
    }
    catch (exception) {
      dispatch(setNotification('error', 'Unable to delete blog!', 5))
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

  const BlogsForm = () => (
    <div>
      <h3>Blogs</h3>
      <p>Created by ddc</p>

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

  const Home = () => (
    <div>
      <Notification />
      {user && <BlogsForm />}
    </div>
  )

  const BlogTab = () => (
    <div>
      <Notification />
      {user && <Blog modifyBlog={modifyBlog} deleteBlog={deleteBlog} />}
    </div>
  )

  const UsersTab = () => (
    <div>
      <Notification />
      {user && <Users />}
    </div>
  )

  const UserTab = () => (
    <div>
      <Notification />
      {user && <User />}
    </div>
  )

  const linkStyling = {
    padding: 5
  }

  return (
    <Router>
      <div className='container'>
        <div className='nav-bar'>
          <Link style={linkStyling} to="/blogs">Blogs</Link>
          <Link style={linkStyling} to="/users">Users</Link>
          <LoggedInStatus />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogTab />} />
          <Route path="/users" element={<UsersTab />} />
          <Route path="/users/:id" element={<UserTab />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
