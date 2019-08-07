import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import { Login, Main } from './pages'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/devs/:id" component={Main} />
    </BrowserRouter>
  )
}