"use strict"

const Route = use("Route")

module.exports = Route.group(()=>{
  /**
   * /api/actor/create/:id
   * Create movies
   *
   * firsName
   * lastName
   * age
   *
   * id id of a movie
   * cover_picture [file]
   */

  Route.post("/create/:id", "ActorController.addActorToMovie").middleware(["getUser"])

  /**
   * /api/actor/:id
   *
   * id is actor id
   */

  Route.delete("/:id", "ActorController.deleteActor").middleware(["getUser"])

  /**
   * /api/movies/finished
   * @routeParams {page}
   * @routeParams {limit}
   */

  Route.get("/single/:id","ActorController.getActor").middleware(["getUser"])

  Route.post("/update/:id","ActorController.editActor").middleware(["getUser"])
})
