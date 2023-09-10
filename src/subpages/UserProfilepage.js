import React from 'react'
import { useParams } from 'react-router-dom'

function UserProfilepage() {
  const {username} = useParams() ;
  return (
    <div>{username}</div>
  )
}

export default UserProfilepage