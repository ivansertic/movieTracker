'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MediaSchema extends Schema {
  up () {
    this.create('media', (table) => {
      table.increments()
      table.integer("path",254).notNullable()
      table.integer("movie_id").unsigned().references("id").inTable("movies").notNullable().onDelete("cascade")
      table.timestamps()
    })
  }

  down () {
    this.drop('media')
  }
}

module.exports = MediaSchema
