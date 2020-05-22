import { Router } from 'express'

import { celebrate, Joi, Segments } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProvidersController from '../controllers/ProvidersController'

const router = Router()

const providerAppointmentsController = new ProviderAppointmentsController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providersController = new ProvidersController()

router.use(ensureAuthenticated)

router.get('/', providersController.index)

router.get('/me/appointments', providerAppointmentsController.index)

router.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
    }),
  }),
  providerDayAvailabilityController.index
)

router.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
    }),
  }),
  providerMonthAvailabilityController.index
)

export default router
