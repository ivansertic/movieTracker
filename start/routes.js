'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

_groupRoutes("Auth").prefix("api/auth")
_groupRoutes("User").prefix("api/user").middleware(["auth:jwt"])
_groupRoutes("Movie").prefix("api/movie").middleware(["auth:jwt"])
_groupRoutes("Actor").prefix("api/actor").middleware(["auth:jwt"])


function _groupRoutes(group){
  return require(`../app/Routes/${group}`)
}
