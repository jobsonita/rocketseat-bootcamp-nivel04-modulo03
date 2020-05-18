import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository

let showProfile: ShowProfileService

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    const userProfile = await showProfile.execute({ user_id: user.id })

    expect(userProfile.name).toBe('Gobarber User')
    expect(userProfile.email).toBe('user@gobarber.com')
  })

  it('should not be able to show the profile of inexistent user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'inexistent-user-id',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
