// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Room from "App/Models/Room";
import User from "App/Models/User";
import CreateRoom from "App/Validators/Room/CreateRoomValidator";
import UploadsController from "./UploadsController";

export default class RoomsController {

  public async create({ request, response, auth }) {
    console.log('Create Room');
    const user = await User.findOrFail(auth.user.id);
    const payload = await request.validate(CreateRoom);
    const room = new Room();
    room.merge(payload);
    await user.related('room').save(room);
    console.log(request.file('file'));
    if (request.file('file')) {
      console.log('Uploading file');
      const uploadController = new UploadsController();
      const upload = await uploadController.upload(request, auth, response);
      if (!upload) {
        return response.status(404).json({
          status: 'failed',
          message: 'Upload file failed'
      })
      }
      await room.related('photo').associate(upload);
    }
    return room;
  }

}
