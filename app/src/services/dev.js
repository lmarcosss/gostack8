import api from './api'

export class DevService {

  static async createDev(username) {
    const { data } = await api.post('/devs', { username })

    return data
  }

  static async getDevs(user) {
    const { data } = await api.get('/devs', {
      headers: {
        user
      }
    })

    return data
  }

  static async likeDev(userLiked, userLogged) {
    const { data } = await api.post(`/devs/${userLiked}/likes`, null, {
      headers: { user: userLogged }
    })

    return data
  }

  static async dislikeDev(userDisliked, userLogged) {
    const { data } = await api.post(`/devs/${userDisliked}/dislikes`, null, {
      headers: { user: userLogged }
    })

    return data
  }
}
