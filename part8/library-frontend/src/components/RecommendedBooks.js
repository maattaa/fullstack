import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, ME, BOOK_ADDED } from '../queries'
import BookTable from './BookTable'

const RecommendedBooks = (props) => {

  const [favGenre, setFavGenre] = useState(null)
  const client = useApolloClient()

  const {
    data: meData,
    loading: meLoading,
    refetch: meReFetch
  } = useQuery(ME)

  const [
    allBooks, {
      loading: allBooksLoading,
      data: allBooksData,
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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      if (favGenre && Object.values(addedBook.genres)
        .includes(favGenre)) {
        const dataInStore = client.readQuery({
          query: ALL_BOOKS, variables: { genre: favGenre }
        })
        client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre: favGenre },
          data: {
            ...dataInStore,
            allBooks: [...dataInStore.allBooks, addedBook]
          }
        })
      }
    }
  })


  if (!props.show) {
    return null
  }

  if (meLoading || allBooksLoading
    || meData === undefined || allBooksData === undefined) {
    return <div>loading</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre
        <b> {meData.me.favoriteGenre}</b>
      </p>
      <BookTable books={allBooksData.allBooks} />
    </div>
  )
}

export default RecommendedBooks