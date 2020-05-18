import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider

let resetPassword: ResetPasswordService

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    )
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPassword.execute({ token, password: '123123' })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('123123')
    expect(updatedUser?.password).toBe('123123')
  })

  it('should not be able to reset the password with invalid token', async () => {
    await expect(
      resetPassword.execute({ token: 'invalid-token', password: '123123' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password of inexistent user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'inexistent-user-id'
    )

    await expect(
      resetPassword.execute({ token, password: '123123' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with expired token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPassword.execute({ token, password: '123123' })
    ).rejects.toBeInstanceOf(AppError)
  })
})