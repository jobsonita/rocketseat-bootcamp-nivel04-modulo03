import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'

import appConfig from '@config/app'
import uploadConfig from '@config/upload'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  @Exclude()
  password!: string

  @Column({ type: 'text', nullable: true })
  @Exclude()
  avatar!: string | null

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${appConfig.api_url}/files/${this.avatar}`
      case 's3':
        return `${uploadConfig.s3.base_url}/${this.avatar}`
      default:
        throw new Error(`Unknown upload driver "${uploadConfig.driver}"`)
    }
  }
}
