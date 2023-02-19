// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Room from "App/Models/Room";

export default class MessagesController {
  public async getRoomMessages({ response, params, bouncer }) {
    console.log('Get a '+ params.id +' Room Messages');
    const room = await Room.findOrFail(params.id);
    if (!room) {
      return response.status(403).json({
        status: 'failed',
        message: 'Room not Found'
    });
    }
    await bouncer.with('RoomPolicy').authorize('readMessages', room);
    await room.load('messages');
    return room.messages;
  }
}
