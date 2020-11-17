import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading</div>
  }

  const genres = printGenres(result.data.allBooks)
  const books = genre
    ? result.data.allBooks.filter(b => b.genres.includes(genre))
    : result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <p>
        {genreDisplay(genre)}
      </p>
      {genres.map(g => (
        <button
          key={g}
          onClick={() => setGenre(g)}>{g}</button>
      ))}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>

          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const genreDisplay = (genre) => {
  if (!genre) {
    return <br></br>
  } else {
    return (
      <>
        in genre <b>{genre}</b>
      </>
    )
  }
}

const printGenres = (books) => {
  let genres = []
  books.map(b => {
    b.genres.map(g => {
      if (!genres.includes(g)) {
        genres.push(g)
      }
    })
  })
  return genres
}



export default Books