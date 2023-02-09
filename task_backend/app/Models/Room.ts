import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
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

  @belongsTo(() => User)
  public creator: BelongsTo<typeof User>

  @hasOne(() => Participant)
  public participants: HasOne<typeof Participant>

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

}
