import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogEntry from './BlogForm'
import Togglable from './Togglable'


test('Press "New Blog" button, submit a blog', () => {

  const createBlog = jest.fn()

  const component =
    render(
      <Togglable buttonLabel="New Blog" >
        <BlogEntry createBlog={createBlog} />
      </Togglable>
    )
  fireEvent.click(component.getByText('New Blog'))

  const input = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'AttributeToBeSearchedFor' }
  })
  fireEvent.submit(form)

  //  console.log('JSON.stringify(createBlog.mock)',JSON.stringify(createBlog.mock))
  //  console.log('JSON.stringify(createBlog.mock.calls[0][0])', JSON.stringify(createBlog.mock.calls[0][0]))
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('AttributeToBeSearchedFor')

})



