exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function (table) {
        table.increments('id').primary()
        table.string('firstName').notNullable()
        table.string('lastName').notNullable()
        table.string('phone').notNullable()
        table.string('eMail').notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
