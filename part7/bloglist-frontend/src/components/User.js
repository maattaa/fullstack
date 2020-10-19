import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ user }) => {
  const id = useParams().id
  if (!user) {
    return null
  }

  console.log(user.blogs)
  console.log(id)
  return (
    <div>
      <div>
        <h2>{user.name}</h2>
      </div>
      <div>
        <b>Added blogs</b>
        <ul>
          {user.blogs.map(b => 
            <li key={b.id}>{b.title}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default User