import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const state = useSelector(state => state)

  return (
    <div className="container">
      <h2>Users</h2>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User name</th>
            <th>Blog count</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)
          }
        </tbody>
      </Table>
    </div >

  )
}


export default Users