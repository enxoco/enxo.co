'use strict'

const Schema = use('Schema')

class FeedbackSchema extends Schema {
  up () {
    this.create('feedback', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('email')
      table.text('message')
    })
  }

  down () {
    this.drop('feedback')
  }
}

module.exports = FeedbackSchema
