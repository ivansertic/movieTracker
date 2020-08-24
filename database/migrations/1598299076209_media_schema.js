'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MediaSchema extends Schema {
  up () {
    this.alter('media', (table) => {
      // alter table
      table.string("path",254).notNullable().alter()
    })
  }

  down () {
    this.alter('media', (table) => {
      // reverse alternations
      table.integer("path",254).notNullable().alter()
    })
  }
}

module.exports = MediaSchema
