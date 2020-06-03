import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  except_user_id: string
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ except_user_id }: IRequest): Promise<User[]> {
    const key = `providers:${except_user_id}`

    let providers = await this.cacheProvider.retrieve<User[]>(key)

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        except_user_id,
      })

      await this.cacheProvider.store(key, providers)
    }

    return providers
  }
}
