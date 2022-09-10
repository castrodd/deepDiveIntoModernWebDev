import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title, not full blog', async () => {
  const blog = {
    title: 'Just another blog',
    author: 'Some blogger',
    url: 'www.blog.bl',
    likes: '1000'
  }

  const mockModifyBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  render(<Blog
    blog={blog}
    modifyBlog={mockModifyBlog}
    deleteBlog={mockDeleteBlog}
  />)

  const titleElement = await screen.findByText('Just another blog')
  const authorElement = screen.queryByText('Some blogger')
  const urlElement = screen.queryByText('www.blog.bl')
  const likesElement = screen.queryByText('1000')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeNull()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('full blog shown when view button clicked', async () => {
  const blog = {
    title: 'My blog',
    author: 'Blog guy',
    url: 'www.myblog.au',
    likes: '1001'
  }

  const mockModifyBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  render(<Blog
    blog={blog}
    modifyBlog={mockModifyBlog}
    deleteBlog={mockDeleteBlog}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const authorElement = screen.queryByText('Blog guy')
  const urlElement = screen.queryByText('www.myblog.au')
  const likesElement = screen.queryByText('1001')

  expect(authorElement).toBeDefined()
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('clicking like button triggers call', async () => {
  const blog = {
    title: 'My 3rd blog',
    author: 'Blog Guys',
    url: 'www.wow.uk',
    likes: '11',
    user: {
      id: 'abc'
    }
  }

  const mockModifyBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  render(<Blog
    blog={blog}
    modifyBlog={mockModifyBlog}
    deleteBlog={mockDeleteBlog}
  />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const buttons = screen.getAllByRole('button')
  await user.click(buttons[1])
  await user.click(buttons[1])

  expect(mockModifyBlog.mock.calls).toHaveLength(2)
})