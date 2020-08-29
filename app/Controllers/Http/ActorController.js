'use strict'
const {validate, sanitize}= use("Validator")

const ActorMovie = use("App/Models/ActorMovie")
const Actor = use("App/Models/Actor")
const Movie = use("App/Models/Movie")
class ActorController {

  async addActorToMovie({request, response,user,params}){

    const allParams = sanitize(request.post(),{
      age:"to_int"
    })

    const validation = await validate(allParams,{
      firstName:"required|max:30",
      lastName:"required|max:30",
      age:"required"
    })

    if(validation.fails()){
      return response.badRequest({
        _message:"Invalid params"
      })
    }

    const movie = await Movie.query()
      .whereHas("users",(b)=>{
        b.where("user_id",user.id)
      })
      .where("id",params.id)
      .first()

    if(!movie){
      return response.notFound({
        _message:"Movie does not exist"
      })
    }

    let actor =await Actor.query()
      .whereHas("movies",(b)=>{
        b.whereHas("users",(q)=>{
          q.where("user_id",user.id)
        })
    }).where("firstName",allParams.firstName)
      .andWhere("lastName",allParams.lastName).first()

    if(!actor) {
      actor = await Actor
        .create({
          firstName: allParams.firstName,
          lastName: allParams.lastName,
          age: allParams.age
        })
    }



    const isAlreadyAdded = await ActorMovie.query().where("movie_id",movie.id).andWhere("actor_id",actor.id).first()

    if(!isAlreadyAdded) {
      await ActorMovie.create({
        movie_id: movie.id,
        actor_id: actor.id
      })
    }

    return response.ok()

  }

  async getActor({request, response, user,params}){

    const actor = await Actor
      .query()
      .whereHas("movies",(b)=>{
        b.whereHas(("users"), (q)=>{
          q.where("user_id",user.id)
        })
        b.where("actor_id",params.id)
      })
      .first()

    if(!actor){
      return response.notFound({
        _message:"Actor does not exist"
      })
    }

    return response.ok(actor)

  }

  async deleteActor({request,response,user,params}){

    const actor = await Actor.query()
      .whereHas("movies",(b)=>{
        b.whereHas("users",(q)=>{
          q.where("user_id",user.id)
        })
        b.where("actor_id",params.id)
      })
      .first()

    if(!actor){
      return response.notFound({
        _message:"Actor does not exist"
      })
    }

    await actor.delete()

    return response.ok({
      _message:"Actor removed"
    })
  }

  async editActor({request,response,user,params}){

    const allParams = sanitize(request.post(),{
      age:"to_int"
    })

    const validation = await validate(allParams,{
      firstName:"required|max:30",
      lastName:"required|max:30",
      age:"required"
    })

    if(validation.fails()){
      return response.badRequest({
        _message:"Invalid params"
      })
    }

    const actor = await Actor.query()
      .whereHas("movies",(b)=>{
        b.whereHas("users",(q)=>{
          q.where("user_id",user.id)
        })
      })
      .where("id",params.id)
      .first()

    if(!actor){
      return response.notFound({
        _message:"Actor does not exist"
      })
    }

    const movie = await Movie.query().whereHas("actors",(b)=>{
      b.where("actor_id",actor.id)
    }).first()

    actor.merge({
      firstName:allParams.firstName,
      lastName:allParams.lastName,
      age:allParams.age
    })

    actor.save()
    actor.movies().sync(movie.id)

    return response.ok()
  }
}

module.exports = ActorController
