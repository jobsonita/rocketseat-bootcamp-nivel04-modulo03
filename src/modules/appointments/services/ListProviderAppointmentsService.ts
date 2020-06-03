import { inject, injectable } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import Appointment from '../infra/typeorm/entities/Appointment'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    return this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    })
  }
}
