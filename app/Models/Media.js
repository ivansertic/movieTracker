'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Media extends Model {
  static boot(){
    super.boot()
  }

  movie(){
    return this.belongsTo("App/Models/Movie")
  }
}

module.exports = Media
