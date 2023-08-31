import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  test('calls event handler with correct details when a new blog is created', async () => {
    const mockCreateBlogHandler = jest.fn()
    const mockUser = { username: 'johndoe' }

    render(<BlogForm createBlog={mockCreateBlogHandler} user={mockUser} />)

    const titleInput = screen.getByLabelText('Title:')
    const authorInput = screen.getByLabelText('Author:')
    const urlInput = screen.getByLabelText('URL:')
    const submitButton = screen.getByText('Create')

    await userEvent.type(titleInput, 'Sample Title')
    await userEvent.type(authorInput, 'John Doe')
    await userEvent.type(urlInput, 'https://example.com')

    await userEvent.click(submitButton)

    expect(mockCreateBlogHandler).toHaveBeenCalledWith({
      title: 'Sample Title',
      author: 'John Doe',
      url: 'https://example.com',
    })
  })
})
