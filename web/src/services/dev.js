import api from './api'

export class DevService {

  async createDev(username) {
    const response = await api.post('/devs', { username })

    return response
  }

  async getDevs(user) {
    const response = await api.get('/devs', {
      headers: {
        user
      }
    })

    return response
  }

  async likeDev(userLiked, userLogged) {
    const response = await api.post(`/devs/${userLiked}/likes`, null, {
      headers: { user: userLogged }
    })

    return response
  }

  async dislikeDev(userDisliked, userLogged) {
    const response = await api.post(`/devs/${userDisliked}/dislikes`, null, {
      headers: { user: userLogged }
    })

    return response
  }
}