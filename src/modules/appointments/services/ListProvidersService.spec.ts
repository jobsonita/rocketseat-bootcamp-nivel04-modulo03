import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import ListProvidersService from './ListProvidersService'

let fakeCacheProvider: FakeCacheProvider

let fakeUsersRepository: FakeUsersRepository

let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider()

    fakeUsersRepository = new FakeUsersRepository()

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    )
  })

  it('should be able to list the providers', async () => {
    const provider1 = await fakeUsersRepository.create({
      name: 'Gobarber Provider1',
      email: 'provider1@gobarber.com',
      password: '123456',
    })

    const provider2 = await fakeUsersRepository.create({
      name: 'Gobarber Provider2',
      email: 'provider2@gobarber.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Gobarber User',
      email: 'user@gobarber.com',
      password: '123456',
    })

    const providers = await listProviders.execute({
      except_user_id: loggedUser.id,
    })

    expect(providers).toEqual([provider1, provider2])
  })

  it('should be able to cache results', async () => {
    const findAllProviders = jest.spyOn(fakeUsersRepository, 'findAllProviders')

    await listProviders.execute({
      except_user_id: '123456',
    })

    await listProviders.execute({
      except_user_id: '123456',
    })

    expect(findAllProviders).toBeCalledTimes(1)
  })
})
