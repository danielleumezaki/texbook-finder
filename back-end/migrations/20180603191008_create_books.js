exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('books', function (table) {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('author').notNullable()
        table.integer('year').notNullable()
        table.integer('price').notNullable()
        table.float('lat').notNullable()
        table.float('lng').notNullable()
        table.string('comment').notNullable()
        table.boolean('status').notNullable()
        table.integer('user_id').notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books')
};