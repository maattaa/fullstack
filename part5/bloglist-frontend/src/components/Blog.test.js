import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
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

const user = {
  username: 'antti',
  name: 'testikayttaja',
  id: '5f757c510999809368b19cc4'
}

test('renders title and author, not url or likes', () => {


  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  const url = component.queryByText(blog.url)
  expect(url).toBeNull()

  const likes = component.queryByText(blog.likes.toString())
  expect(likes).toBeNull()

})

test('clicks button, renders url and likes', () => {

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)

})