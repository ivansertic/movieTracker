'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovieUsersSchema extends Schema {
  up () {
    this.create('movie_users', (table) => {
      table.increments()
      table.integer("movie_id").unsigned().references("id").inTable("movies").notNullable().onDelete("cascade")
      table.integer("user_id").unsigned().references("id").inTable("users").notNullable().onDelete("cascade")
      table.timestamps()
    })
  }

  down () {
    this.drop('movie_users')
  }
}

module.exports = MovieUsersSchema
