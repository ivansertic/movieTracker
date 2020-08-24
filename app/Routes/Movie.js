"use strict"

const Route = use("Route")

module.exports = Route.group(()=>{
  /**
   * /api/movie/create
   * Create movies
   *
   * title:"required|max:50",
   * description:"required|max:254",
   * genre:"required",
   * duration:"required"
   *
   * cover_picture [file]
   */

  Route.post("/create","MovieController.addMovie").middleware(["getUser"])
})
