"use strict"
const Route = use("Route")


module.exports = Route.group(() =>{

  /**
   * Register
   */
  Route.post("/register","AuthController.register")

  /**
   * Login
   */

  Route.post("/login","AuthController.login")
})
