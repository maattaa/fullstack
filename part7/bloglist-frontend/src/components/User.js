import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }

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