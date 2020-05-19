import Appointment from '../infra/typeorm/entities/Appointment'

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

import CreateAppointmentService from './CreateAppointmentService'
import IndexAppointmentsService from './IndexAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository

let createAppointment: CreateAppointmentService
let indexAppointments: IndexAppointmentsService

describe('IndexAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    )
    indexAppointments = new IndexAppointmentsService(fakeAppointmentsRepository)
  })

  it('should be able to list appointments', async () => {
    const appointments: Appointment[] = []

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime())

    const newAppointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '123123',
      user_id: 'id',
    })

    appointments.push(newAppointment)

    const listedAppointments = await indexAppointments.execute()

    expect(listedAppointments).toEqual(appointments)
  })
})
