import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    room_name: schema.string({}, [rules.required(), rules.maxLength(100)]),
    room_table: schema.string({}, [rules.required()]),
  })

  public messages: CustomMessages = {}
}
