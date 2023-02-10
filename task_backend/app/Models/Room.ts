import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Participant from './Participant'
import Message from './Message'
import Task from './Task'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public creator_id: number

  @column()
  public room_name: string

  @column()
  public room_table: string

  @column()
  public photo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'creator_id'
  })
  public creator: BelongsTo<typeof User>

  @manyToMany(() => Participant, {
    pivotForeignKey: 'room_id',
    pivotRelatedForeignKey: 'participant_id'
  })
  public participants: ManyToMany<typeof Participant>

  @manyToMany(() => User, {
    pivotForeignKey: 'room_id',
    pivotRelatedForeignKey: 'participant_id',
    pivotTable: 'participants',
    pivotTimestamps: {
      createdAt: 'createdAt',
      updatedAt: false,
    },
  })
  public rooms: ManyToMany<typeof User>

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

}
