import { Router } from 'express'

import { celebrate, Joi, Segments } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentsController'

const router = Router()

const appointmentsController = new AppointmentsController()

router.use(ensureAuthenticated)

router.get('/', appointmentsController.index)
router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    }),
  }),
  appointmentsController.create
)

export default router
