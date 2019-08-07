import React, { useState } from 'react'

import { logo } from '../../assets'

import api from '../../services/api'

import './login.style.css'

export function Login({ history }) {
  const [username, setUsername] = useState('')


  async function handleSubmit(e) {
    e.preventDefault()

    const response = await api.post('/devs', { username })

    const { _id } = response.data

    console.log(response.data)

    history.push(`/devs/${_id}`)
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <input
          type="text"
          placeholder="Digite seu usuário no github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
