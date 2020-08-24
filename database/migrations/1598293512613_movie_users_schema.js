'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovieUsersSchema extends Schema {
  up () {
    this.table('movie_users', (table) => {
      // alter table
      table.boolean("finished")
    })
  }

  down () {
    this.table('movie_users', (table) => {
      // reverse alternations
      table.boolean("finished")
    })
  }
}

module.exports = MovieUsersSchema
