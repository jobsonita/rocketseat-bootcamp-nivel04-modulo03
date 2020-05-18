import { uuid } from 'uuidv4'

import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid(), name, email, password })

    this.users.push(user)

    return user
  }

  public async save(updatedUser: User): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === updatedUser.id)

    this.users[userIndex] = updatedUser

    return updatedUser
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    if (except_user_id) {
      return this.users.filter((user) => user.id !== except_user_id)
    } else {
      return this.users
    }
  }
}
