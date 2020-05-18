import { Router } from 'express'

import ProfileController from '../controllers/ProfileController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const router = Router()
const profileController = new ProfileController()

router.use(ensureAuthenticated)

router.get('/', profileController.show)
router.put('/', profileController.update)

export default router
