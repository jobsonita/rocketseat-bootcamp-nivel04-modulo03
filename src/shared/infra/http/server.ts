import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import celebrate from 'celebrate'
import cors from 'cors'

import '@shared/container'
import '@shared/infra/typeorm'

import uploadConfig from '@config/upload'

import AppError from '@shared/errors/AppError'

import limitRate from './middlewares/limitRate'

import routes from './routes'

const app = express()

app.use(limitRate)

app.use(cors())
app.use(express.json())

app.use(routes)

app.use('/files', express.static(uploadConfig.disk.uploadsDir))

app.use(celebrate.errors())

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Internal server error' })
})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
