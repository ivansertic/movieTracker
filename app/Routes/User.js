"use strict"

const Route = use("Route")

module.exports = Route.group(()=>{
  /**
   * Get user info
   */

  Route.get("/", "UserController.getUserInfo").middleware(["getUser"])

  /**
   * /api/user
   * Change user data
   *
   * username : string,
   * password: string,
   * password_confirmation:string
   */

  Route.post("/edit", "UserController.editUserData").middleware(["getUser"])
})
