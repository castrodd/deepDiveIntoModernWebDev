import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm works properly', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()

  const inputs = screen.getAllByRole('textbox')
  const submitButton = screen.getByText('submit')

  await user.type(inputs[0], 'An Author')
  await user.type(inputs[1], 'A Blog')
  await user.type(inputs[2], 'www.test.dev')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('An Author')
  expect(createBlog.mock.calls[0][0].title).toBe('A Blog')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.dev')
})