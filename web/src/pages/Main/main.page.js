import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

import { Link } from 'react-router-dom'

import { logo, like, dislike, itsamatch } from '../../assets'

import { DevService } from '../../services'

import './main.style.css'

const devSevice = new DevService()


function CardUser({ user, handleLike, handleDislike }) {
  const { name, bio, avatar } = user

  return (
    <li>
      <img src={avatar} alt="avatar" />
      <footer>
        <strong>{name}</strong>
        <p>{bio}</p>
      </footer>
      <div className="actions">
        <button type="button" onClick={() => handleLike(user._id)}>
          <img src={like} alt="like" />
        </button>
        <button type="button">
          <img src={dislike} alt="dislike" onClick={() => handleDislike(user._id)} />
        </button>
      </div>
    </li>
  )
}

function Users({ users, handleLike, handleDislike }) {
  return users.map((user, index) => {
    return (
      <CardUser
        key={index}
        user={user}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
    )
  })
}

export function Main({ match }) {
  const [users, setUsers] = useState([])
  const [matchDev, setMatchDev] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      const userId = match.params.id

      const { data } = await devSevice.getDevs(userId)

      setUsers(data)
    }

    loadUsers()
  }, [match.params.id])


  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    })

    socket.on('match', dev => {
      setMatchDev(dev)
    })

  }, [match.params.id])


  async function handleLike(id) {
    await devSevice.likeDev(id, match.params.id)
  }

  async function handleDislike(id) {
    await devSevice.dislikeDev(id, match.params.id)
  }

  function onClose() {
    setMatchDev(null)
  }

  return <div className="main-container">
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
    {users.length > 0 ?
      <ul>
        <Users
          users={users}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      </ul>
      : (
        <div className="empty">Acabou :(</div>
      )
    }

    {matchDev && (
      <div className="match-container">
        <img src={itsamatch} alt="match" />
        <img className="avatar" src={matchDev.avatar} alt="avatar-match" />
        <strong>{matchDev.name}</strong>
        <p>{matchDev.bio}</p>
        <button onClick={onClose} type="button">FECHAR</button>
      </div>
    )}
  </div>
} 
