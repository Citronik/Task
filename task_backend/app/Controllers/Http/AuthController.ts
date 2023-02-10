//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import  CreateUser  from 'App/Validators/CreateUserValidator';
import  LoginUser  from 'App/Validators/LoginUserValidator';
import  UpdateUser  from 'App/Validators/UpdateUserValidator';


export default class AuthController {

  public async register({ request, response, auth }) {
    console.log('registration');
    const payload = await request.validate(CreateUser);
    const user = await User.create(payload);
    await auth.login(user);
    return this.login(...arguments);
  }

  public async login({ request, response, auth }) {
    console.log('login');
    const payload = await request.validate(LoginUser);
    const {username, email, password} = payload;
    console.log(username, email, password);
    const token = !username ? await auth.attempt(email, password) : await auth.attempt(username, password);
    if (!token) {
      return response.status(404).json({
        status: 'failed',
        message: 'Unable to login'
    })
    }
    return response.status(200).json({
      status: 'success',
      message: 'Profile updated!',
      data: token.toJSON()
    });
  }

  public async update({ request, response, auth }) {
    console.log('update');
    const user = await User.find(auth.user.id);
    if (!user) {
      return response.status(404).json({
          status: 'failed',
          message: 'Profile not found'
      })
    }
    const payload = await request.validate(UpdateUser);
    const {username, first_name, last_name, password} = payload;
    console.log(username, first_name, last_name, password);
    if (username) {
      console.log(username);
      user.username = username;
    }if (password) {
      console.log(password);
      user.password = password;
    }if (first_name) {
      console.log(first_name);
      user.first_name = first_name;
    }if (last_name) {
      console.log(last_name);
      user.last_name = last_name;
    }
    // await user.save();
    // return response.status(200).json({
    //   status: 'success',
    //   message: 'Profile updated!',
    //   data: user.toJSON()
    // })
    try {
      await user.save();
      return response.status(200).json({
          status: 'success',
          message: 'Profile updated!',
          data: user.toJSON()
      })
  } catch (error) {
      console.log('update user', error)
      return response.status(500).json({
          status: 'error',
          message: error.message
      })
  }

  }
}
