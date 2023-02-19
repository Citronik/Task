import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Room from 'App/Models/Room'
import Participant from 'App/Models/Participant';

export default class RoomPolicy extends BasePolicy {
	public async view(user: User, room: Room) {
    console.log(user.id, room.creator_id);
    return user.id === room.creator_id;
  }

	public async update(user: User, room: Room) {
    return user.id === room.creator_id;
  }

	public async readMessages(user: User, room: Room) {
     if (user.id === room.creator_id) {
       return true;
     }
    await room.load('participants');
    console.log(room.participants);
    room.participants.filter((participant) => {
      return participant.id === user.id;
    });
    return false;
  }
}
