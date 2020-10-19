import React from 'react'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className="container">
      <div>
        <h2>{user.name}</h2>
      </div>
      <div>
        <b>Added blogs</b>
        <ListGroup>
          {user.blogs.map(b =>
            <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  )
}

export default User