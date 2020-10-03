import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  id: 1,
  title: 'Component testing is done with react-testing-library',
  author: 'Antti Määttänen',
  likes: 44124,
  url: 'www.testurl.com',
  user: {
    username: 'antti',
    name: 'testikayttaja',
    id: '5f757c510999809368b19cc4'
  }
}

const blogs = Array(2).fill(blog)

const user = {
  username: 'antti',
  name: 'testikayttaja',
  id: '5f757c510999809368b19cc4'
}

let defaultComponent = <Blog blog={blog} user={user} />

describe('Blogs', () => {



  test('renders title and author, not url or likes', () => {
    const component = render(defaultComponent)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    const url = component.queryByText(blog.url)
    expect(url).toBeNull()

    const likes = component.queryByText(blog.likes.toString())
    expect(likes).toBeNull()

  })

  test('clicks button, renders url and likes', () => {
    const component = render(defaultComponent)

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)

  })

  test('Liking twice fires mock', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} blogs={blogs} increaseLikes={mockHandler} />
    )

    //No need to extend the blog by pressing "view" in this text
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})