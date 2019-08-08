import React, { useState } from 'react'

import { logo } from '../../assets'

import { DevService } from '../../services'

import './login.style.css'

const devService = new DevService()

export function Login({ history }) {
  const [username, setUsername] = useState('')


  async function handleSubmit(e) {
    e.preventDefault()

    const { data } = await devService.createDev(username)

    history.push(`/devs/${data._id}`)
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
