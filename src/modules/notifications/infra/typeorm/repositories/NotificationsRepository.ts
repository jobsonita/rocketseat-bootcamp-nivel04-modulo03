import { getMongoRepository, MongoRepository } from 'typeorm'

import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationDTO'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

import Notification from '../schemas/Notification'

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    })
    await this.ormRepository.save(notification)
    return notification
  }
}