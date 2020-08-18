'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActorMoviesSchema extends Schema {
  up () {
    this.create('actor_movies', (table) => {
      table.increments()
      table.integer("actor_id").unsigned().references("id").inTable("actors").notNullable().onDelete("cascade")
      table.integer("movie_id").unsigned().references("id").inTable("movies").notNullable().onDelete("cascade")
      table.timestamps()
    })
  }

  down () {
    this.drop('actor_movies')
  }
}

module.exports = ActorMoviesSchema
