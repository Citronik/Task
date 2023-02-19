// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Message from "App/Models/Message";
import Room from "App/Models/Room";
import User from "App/Models/User";
import CreateMessage from "App/Validators/Message/CreateMessageValidator";

export default class MessagesController {
  public async getRoomMessages({ response, params, bouncer }) {
    console.log('Get a '+ params.id +' Room Messages');
    const room = await Room.findOrFail(params.id);
    await bouncer.with('RoomPolicy').authorize('isParticipants', room);
    await room.load('messages');
    return room.messages;
  }

  public async getRoomMessage({ response, params, bouncer }) {
    console.log('Get a '+ params.id +' Room Message: ' + params.msg_id);
    const room = await Room.findOrFail(params.id);
    await bouncer.with('RoomPolicy').authorize('isParticipants', room);
    await room.load('messages');
    return room.messages.filter((message) => {
      if (message.id == params.msg_id) {
        return message;
      }
    });
  }

  public async create({ auth, request, params, bouncer }) {
    console.log('Get a '+ params.id +' Room Message: ');
    const room = await Room.findOrFail(params.id);
    //const user = await User.findOrFail(auth.user.id);
    await bouncer.with('RoomPolicy').authorize('isParticipants', room);
    const payload = await request.validate(CreateMessage);
    const message = new Message();
    message.merge(payload);
    message.user_id = auth.user.id;
    await message.related('room').associate(room);
    return message;
  }


}
