import bodyParser from 'body-parser'

import router from '../routes'

function ApplyMiddleware(app) {
  return app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/api/v1', router)
}

export default ApplyMiddleware
