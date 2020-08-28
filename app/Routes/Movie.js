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

  /**
   * /api/movie/:id
   *
   * id is movie id
   */

  Route.delete("/:id","MovieController.deleteMovie").middleware(["getUser"])

  /**
   * /api/movies/finished
   * @routeParams {page}
   * @routeParams {limit}
   */
  Route.get("/finished","MovieController.getFinishedMovies").middleware(["getUser"])

  Route.get("/watch","MovieController.getMoviesToWatch").middleware(["getUser"])

  Route.get("/single/:id","MovieController.getSingleMovie").middleware(["getUser"])

  Route.post("/update/:id","MovieController.editMovie").middleware(["getUser"])
})
