import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

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
      <BookTable books={books} />
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
  books.forEach(b => {
    b.genres.forEach(g => {
      if (!genres.includes(g)) {
        genres.push(g)
      }
    })
  })
  return genres
}



export default Books