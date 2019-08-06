const axios = require('axios')

const Dev = require('../models/Dev')

module.exports = {
  async create(req, res) {
    const { username } = req.body

    const userExists = await Dev.findOne({ user: username })

    if (userExists) {
      return res.json(userExists)
    }

    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        "Authorization": 'token 5f718d616eaf953b261fb3b21937b77ab31be6fc'
      }
    })

    const { name, bio, avatar_url: avatar } = response.data

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.json(dev)
  }
}