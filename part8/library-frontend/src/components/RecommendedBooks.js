import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const RecommendedBooks = (props) => {

  const [favGenre, setFavGenre] = useState(null)

  const {
    data: meData,
    loading: meLoading,
    refetch: meReFetch
  } = useQuery(ME)

  const [
    allBooks, {
      loading: allBooksLoading,
      data: allBooksData
    }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (props.token) {
      meReFetch()
    }
  }, [props.token]) // eslint-disable-line

  useEffect(() => {
    if (props.token) {
      if (meData) {
        setFavGenre(meData.me.favoriteGenre)
      }
    } else {
      setFavGenre(null)
    }
  }, [meData]) // eslint-disable-line

  useEffect(() => {
    if (favGenre) {
      allBooks({ variables: { genre: favGenre } })
    }
  }, [favGenre]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (meLoading || allBooksLoading || meData === undefined || allBooksData === undefined) {
    return <div>loading</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{meData.me.favoriteGenre}</b>
      </p>
      <BookTable books={allBooksData.allBooks} />
    </div>
  )
}

export default RecommendedBooks