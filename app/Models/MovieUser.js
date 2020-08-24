'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MovieUser extends Model {
  static boot(){
    super.boot()
    this.addTrait("Paginable")
  }

  movie(){
    return this.belongsTo("App/Models/Movie")
  }

  user(){
    return this.belongsTo("App/Models/User")
  }
}

module.exports = MovieUser
