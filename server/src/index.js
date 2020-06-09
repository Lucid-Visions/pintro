import express from 'express'

import ApplyMiddleware from './middleware'

const app = ApplyMiddleware(express())

const port = process.env.PORT_HTTP | 3000
app.listen(port)
console.log(`API listening on ${port}`)

export default app
