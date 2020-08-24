'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Actor extends Model {
  static boot(){
    super.boot()
    this.addTrait("Paginable")
  }

  movies(){
    return this.belongsToMany("App/Models/Movie").pivotModel("App/Models/ActorMovie")
  }
}

module.exports = Actor
