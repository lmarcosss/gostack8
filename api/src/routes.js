const express = require('express')

const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = express.Router()

routes.get('/devs', DevController.get)
routes.post('/devs', DevController.create)


routes.post('/devs/:devId/likes', LikeController.create)
routes.post('/devs/:devId/dislikes', DislikeController.create)

module.exports = routes