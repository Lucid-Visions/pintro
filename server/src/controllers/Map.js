import UserModel from '../models/user_model'
require('dotenv').config()

const Map = {
  getMapData(req, res) {
    if (req.query.long == null || req.query.lat == null) {
      return res
        .status(400)
        .send({
          error: 'Error fetching data',
          message: 'You must provide both long, lat query parameters',
        })
    }
    UserModel.find({
      location: {
        $near: {
          $maxDistance: req.query.distance || 1000,
          $geometry: {
            type: 'Point',
            coordinates: [req.query.long, req.query.lat],
          },
        },
      },
    })
      .populate('action_buttons')
      .find((error, results) => {
        if (error) {
          return res
            .status(400)
            .send({ error: 'Error fetching data', message: error })
        }
        return res.status(200).send(results)
      })
  },
}

export default Map
