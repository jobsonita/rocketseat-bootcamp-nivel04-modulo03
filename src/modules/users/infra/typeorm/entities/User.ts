import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'

import appConfig from '@config/app'

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
    return this.avatar && `${appConfig.api_url}/files/${this.avatar}`
  }
}
