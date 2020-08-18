'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Movie extends Model {
  static boot(){
    super.boot()
    super.addTrait("paginable")
  }

  media(){
    return this.hasOne("App/Models/Media")
  }

  users(){
    return this.belongsToMany("App/Models/User").pivotModel("App/Models/MovieUser")
  }

  actors(){
    return this.belongsToMany("App/Models/Actor").pivotModel("App/Models/ActorMovie")
  }
}

module.exports = Movie
