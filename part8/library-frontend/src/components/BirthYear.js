import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const BirthYear = () => {
  const [author, setAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS }
    ]
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: author,
        setBornTo: parseInt(birthYear)
      }
    })

    setAuthor('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
          <div>
            <button type="submit">update author</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BirthYear