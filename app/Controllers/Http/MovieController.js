'use strict'
const Helpers = use('Helpers')

const Media = use("App/Models/Media")
const Movie = use("App/Models/Movie")
const MovieUser = use("App/Models/MovieUser")
const {validate, sanitize}= use("Validator")
const fs = use("fs")

const Moment = use("moment")
class MovieController {

  async addMovie({request,response,user}){

    const allParams = sanitize(request.post(),{
      duration:"to_int",
      finished:"to_boolean"
    })

    const validation = await validate(allParams,{
      title:"required|max:50",
      description:"required|max:254",
      genre:"required",
      duration:"required"
    })

    if(validation.fails()){
      return response.badRequest({
        _message:"Invalid params"
      })
    }

    const movieCover = request.file("cover_picture",{
      types:["image"],
      size:"2mb"
    })

    if(!movieCover){
      return response.badRequest({
        _message:"Missing or invalid movie cover"
      })
    }

    const pictureName = `${Moment().format("YYYY-MM-DD-HH-mm-ss")}.jpg`
    await movieCover.move(Helpers.publicPath("/resources/media"),{
      name: `${pictureName}`
    })

    if(!movieCover.moved()){
      return movieCover.error()
    }

    const movie = await Movie.create({
      title:allParams.title,
      description:allParams.description,
      genre:allParams.description,
      duration:allParams.duration
    })

    if(!movie){
      return response.notAcceptable({
        _message:"Unable to create movie"
      })
    }

    await MovieUser.create({
      movie_id: movie.id,
      user_id: user.id,
      finished:allParams.finished
    })

    await Media.create({
      path: `resources/media/${pictureName}`,
      movie_id:movie.id
    })

    return response.ok()
  }

  async editMovie({request,response,user,params}){

    const allParams = sanitize(request.post(),{
      duration:"to_int",
      finished:"to_boolean"
    })

    const validation = await validate(allParams,{
      title:"required|max:50",
      description:"required|max:254",
      genre:"required",
      duration:"required"
    })

    if(validation.fails()){
      return response.badRequest({
        _message:"Invalid params"
      })
    }

    const movie = await Movie.query().whereHas("users",(b)=>{b.where("user_id",user.id)}).with("media").where("id",params.id).first()


    if(!movie){
      return response.notFound({
        _message:"Movie does not exist"
      })
    }


    const movieCover = request.file("cover_picture",{
      types:["image"],
      size:"2mb"
    })
    if(movieCover) {


      const pictureName = `${Moment().format("YYYY-MM-DD-HH-mm-ss")}.jpg`
      await movieCover.move(Helpers.publicPath("/resources/media"),{
        name: `${pictureName}`
      })

      if(!movieCover.moved()){
        return movieCover.error()
      }

      fs.unlink(`./public/${movie.$relations.media.path}`, (err) => {
        if (err) {
          console.log("failed to delete local image:" + err);
        } else {
          console.log('successfully deleted local image');
        }
      })

      const media = await Media.query().where("movie_id",movie.id).first()

      media.merge({
        path: `resources/media/${pictureName}`
      })

      media.save()
    }

    movie.merge({
      title:allParams.title,
      description:allParams.description,
      genre:allParams.genre,
      duration:allParams.duration
    })
    movie.save()

    await movie.users().pivotQuery().update({finished:allParams.finished})

    return response.ok()
  }

  async deleteMovie({response, params,user}){

    const movie = await Movie.query()
      .whereHas("users",(b)=>{
        b.where("user_id",user.id)
      })
      .where("id", params.id)
      .first()

    if(!movie){
      return response.notFound({
        _message:"Movie does not exist"
      })
    }

    movie.delete()

    return response.ok()
  }

  async getFinishedMovies({request,response, user}){

    const allParams = sanitize(request.get(),{
      page:"to_int",
      limit:"to_int"
    })
    const movies = await Movie.query()
      .whereHas("users",(b)=>{
        b.where("user_id",user.id)
        b.where("finished",true)
      })
      .orderBy("created_at","desc")
      .paginable(allParams.page, allParams.limit)


    return response.ok(movies)

  }

  async getMoviesToWatch({request,response,user}){

    const allParams = sanitize(request.get(),{
      page:"to_int",
      limit:"to_int"
    })
    const movies = await Movie.query()
      .whereHas("users",(b)=>{
        b.where("user_id",user.id)
        b.where("finished",false)
      })
      .orderBy("created_at","desc")
      .paginable(allParams.page, allParams.limit)


    return response.ok(movies)
  }

  async getSingleMovie({response,user,params}){

    const movie = await Movie.query().whereHas("users", (b)=>{ b.where("user_id",user.id)}).with("media").where("id",params.id).first()

    if(!movie){
      return response.notFound({
        _message:"Movie does not exist"
      })
    }

    return response.ok(movie)
  }
}

module.exports = MovieController
