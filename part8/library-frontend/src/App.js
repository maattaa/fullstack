import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user-token')
    if (userJSON) {
      setToken(userJSON)
    }
  }, [token])


  const updateCacheWith = (addedBook) => {

    const includedIn = (set, object) =>
      //Added book doesn't have id yet, lets compare with title
      //as its unique by schema
      set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(subscriptionData.data.bookAdded)
      window.alert('New book added! Details in console')
      updateCacheWith(addedBook)
    }
  })

  const login = () => {
    if (!token) {
      return (
        <>
          <button onClick={() => setPage('login')}>login</button>
        </>
      )
    } else {
      return (
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={() => logout()}>logout</button>
        </>
      )
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {login()}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <Login
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />

      <RecommendedBooks
        show={page === 'recommended'}
        token={token}
      />

    </div>
  )
}

export default App