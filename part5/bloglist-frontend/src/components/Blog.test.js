import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  const component = render(
    <Blog blog={blog} user={user} />
  )

  component.debug()
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Antti Määttänen'
  )
  const url = component.queryByText('www.testurl.com')
  expect(url).toBeNull()

  const likes = component.queryByText('44124')
  expect(likes).toBeNull()



})