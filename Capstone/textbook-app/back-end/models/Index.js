const knex = require('knex')(require('../knexfile'))
const bookshelf = require('bookshelf')(knex)

const Book = bookshelf.Model.extend({
    tableName: 'books',
        users: function() {
            return this.belongsTo(User);
          }
})

const User = bookshelf.Model.extend({
    tableName: 'users',
        books: function() {
            return this.hasMany(Book)
        }
})
module.exports = {
    Book,
    User
}