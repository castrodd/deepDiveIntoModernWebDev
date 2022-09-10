import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only title, not full blog', async () => {
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
  const fullBlogElement = screen.queryByText('www.blog.bl')

  expect(titleElement).toBeDefined()
  expect(fullBlogElement).toBeNull()
})