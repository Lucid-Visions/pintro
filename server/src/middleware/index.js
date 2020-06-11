import bodyParser from 'body-parser'
import morgan from 'morgan'

import router from '../routes'

function ApplyMiddleware(app) {
  return app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(morgan('tiny'))
    .use('/api/v1', router)
}

export default ApplyMiddleware
