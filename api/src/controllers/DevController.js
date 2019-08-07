const axios = require('axios')

const Dev = require('../models/Dev')

module.exports = {
  async get(req, res) {
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)

    const devs = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }

      ]
    })
    return res.json(devs)
  },

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
  },
}