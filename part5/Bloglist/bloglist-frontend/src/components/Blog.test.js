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

})
