import { getRepository, Not, Repository } from 'typeorm'

import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '../entities/User'

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password })
    await this.ormRepository.save(user)
    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } })
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    if (except_user_id) {
      return this.ormRepository.find({ where: { id: Not(except_user_id) } })
    } else {
      return this.ormRepository.find()
    }
  }
}
