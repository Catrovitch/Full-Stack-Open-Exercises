import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog' // Update with your correct path

describe('Blog component', () => {
  const sampleBlog = {
    title: 'Sample Title',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10,
    user: {
      id: 'user123',
      username: 'johndoe',
    },
  }

  test('renders title and author, but not URL or likes by default', () => {
    render(<Blog blog={sampleBlog} />)

    // Expect title and author to be rendered
    expect(screen.getByText('Title & Author: Sample Title - John Doe')).toBeInTheDocument()

    // Expect URL and likes to not be rendered by default
    expect(screen.queryByText('Url: https://example.com')).not.toBeInTheDocument()
    expect(screen.queryByText('Likes: 10')).not.toBeInTheDocument()
  })
  test('shows URL and likes when "Show" button is clicked', async () => {
    render(<Blog blog={sampleBlog} />)

    const showButton = screen.getByText('Show')
    await userEvent.click(showButton)

    expect(screen.getByText('Url: https://example.com')).toBeInTheDocument()
    expect(screen.getByText('Likes: 10')).toBeInTheDocument()
  })
  test('calls like event handler twice when like button is clicked twice', async () => {
    const sampleBlog = {
      id: 1,
      title: 'Sample Title',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 10,
      user: {
        id: 'user123',
        username: 'johndoe',
      },
    }

    const mockLikeHandler = jest.fn()

    render(<Blog blog={sampleBlog} like={mockLikeHandler} />)

    const showButton = screen.getByText('Show')
    await userEvent.click(showButton)

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})
