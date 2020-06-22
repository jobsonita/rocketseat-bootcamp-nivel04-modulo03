import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { classToClass } from 'class-transformer'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id
    const day = Number(req.query.day)
    const month = Number(req.query.month)
    const year = Number(req.query.year)

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    )

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    })

    return res.json(classToClass(appointments))
  }
}
