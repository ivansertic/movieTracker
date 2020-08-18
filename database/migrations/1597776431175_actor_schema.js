'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActorSchema extends Schema {
  up () {
    this.create('actors', (table) => {
      table.increments()
      table.string("firstName",80).notNullable()
      table.string("lastName",80).notNullable()
      table.integer("age").unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('actors')
  }
}

module.exports = ActorSchema
