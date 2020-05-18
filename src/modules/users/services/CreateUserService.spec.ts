import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import CreateUserService from './CreateUserService'

let fakeHashProvider: FakeHashProvider
let fakeUsersRepository: FakeUsersRepository

let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    fakeUsersRepository = new FakeUsersRepository()

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    const email = 'user@gobarber.com'

    await createUser.execute({
      name: 'Gobarber User',
      email,
      password: '123456',
    })

    await expect(
      createUser.execute({
        name: 'Gobarber User',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
