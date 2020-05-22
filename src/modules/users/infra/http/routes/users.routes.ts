import { Router } from 'express'

import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'

import uploadConfig from '@config/upload'

import UserAvatarController from '../controllers/UserAvatarController'
import UsersController from '../controllers/UsersController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const upload = multer(uploadConfig)

const router = Router()
const userAvatarController = new UserAvatarController()
const usersController = new UsersController()

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  usersController.create
)

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default router
