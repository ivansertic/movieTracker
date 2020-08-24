'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ActorMovie extends Model {
  static boot(){
    super.boot()
    this.addTrait("Paginable")
  }

  movie(){
    return this.belongsTo("App/Models/Movie")
  }

  actor(){
    return this.belongsTo("App/Models/Actor")
  }
}

module.exports = ActorMovie
