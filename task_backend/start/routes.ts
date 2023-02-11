/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {}
})


Route.group(() =>{

  Route.group(() =>{
    Route.post('register', 'UsersController.register');
    Route.post('login', 'UsersController.login');
    Route.patch('update', 'UsersController.update').middleware('auth');
    Route.get('me', 'UsersController.showMe').middleware('auth');
    Route.get('', 'UsersController.getAllUsers');

    Route.group(() =>{
      Route.get('me', 'ProfilesController.showMyProfile').middleware('auth');
      Route.patch('update', 'ProfilesController.update').middleware('auth');

    }).prefix('profiles')

    Route.group(() =>{
      Route.get('me', 'ProfilesController.showMyProfile').middleware('auth');
      Route.patch('update', 'ProfilesController.update').middleware('auth');

    }).prefix('rooms')

  }).prefix('users')


}).prefix('api')
