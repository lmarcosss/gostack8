const Dev = require('../models/Dev')

module.exports = {
  async create(req, res) {
    const { devId } = req.params
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)

    const targetDev = await Dev.findById(devId)

    if (!targetDev) {
      return res.status(400).json({
        error: 'Dev is not exists.'
      })
    }



    return res.json({
      ok: 'true'
    })
  }
}