'use strict'
const Helpers = use('Helpers')

const Media = use("App/Models/Media")
const Movie = use("App/Models/Movie")
const MovieUser = use("App/Models/MovieUser")
const {validate, sanitize}= use("Validator")

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

    await movieCover.move(Helpers.publicPath("/resources/media"),{
      name:`${allParams.title}.jpg`
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
      path: `resources/media/${allParams.title}.jpg`,
      movie_id:movie.id
    })

    return response.ok()
  }

  async editMovie({request,response,user}){

  }

  async deleteMovie({request, response}){

  }

  async getFinishedMovies({request,response, user}){

  }

  async getMoviesToWatch({request,response,user}){

  }
}

module.exports = MovieController
