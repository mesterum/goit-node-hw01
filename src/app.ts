import express, { Request, Response } from 'express'
import logger from 'morgan'
import cors from 'cors'

import contactsRouter from './api/contacts.js'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: err.message })
})

export default app
