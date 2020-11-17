import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const RecommendedBooks = (props) => {

  const result = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading</div>
  }

  const books = result.data.allBooks.filter(b =>
    b.genres.includes(user.data.me.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </p>
      <BookTable books={books} />
    </div>
  )
}

export default RecommendedBooks