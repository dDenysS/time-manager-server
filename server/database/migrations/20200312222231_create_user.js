exports.up = async knex => {
    await knex.schema.createTable('regions', table => {
        table.increments().primary()
        table.string('email').unique().notNullable()
        table.string('password')
        table.string('type')
        table.timestamps(true, true)
    })
}

exports.down = async knex => {
    await knex.schema.dropTableIfExists('users')
}
