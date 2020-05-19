import Appointment from '../infra/typeorm/entities/Appointment'

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

import CreateAppointmentService from './CreateAppointmentService'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository

let createAppointment: CreateAppointmentService
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    )
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the appointments of a provider on a specific date', async () => {
    const appointments: Appointment[] = []

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime())

    appointments.push(
      await createAppointment.execute({
        date: new Date(2020, 4, 20, 14, 0, 0),
        provider_id: '123123',
        user_id: 'id',
      })
    )

    appointments.push(
      await createAppointment.execute({
        date: new Date(2020, 4, 20, 15, 0, 0),
        provider_id: '123123',
        user_id: 'id',
      })
    )

    const listedAppointments = await listProviderAppointments.execute({
      provider_id: '123123',
      year: 2020,
      month: 5,
      day: 20,
    })

    expect(listedAppointments).toEqual(appointments)
  })
})
