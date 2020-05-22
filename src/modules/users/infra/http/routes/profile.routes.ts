import { Router } from 'express'

import { celebrate, Joi, Segments } from 'celebrate'

import ProfileController from '../controllers/ProfileController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const router = Router()
const profileController = new ProfileController()

router.use(ensureAuthenticated)

router.get('/', profileController.show)

router.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
      password_confirmation: Joi.string().when('old_password', {
        is: Joi.exist(),
        then: Joi.required().valid(Joi.ref('password')),
        otherwise: Joi.forbidden(),
      }),
    }),
  }),
  profileController.update
)

export default router
