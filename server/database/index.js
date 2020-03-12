const knex = require('knex')

const connection = require('../../knexfile').development

const {Model} = require('objection')
const knexConnection = knex(connection)
Model.knex(knexConnection)

module.exports = Model
