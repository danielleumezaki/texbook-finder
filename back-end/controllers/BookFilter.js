const Book = require('../models/Index').Book

const BookFilter = {
    filterBook: (obj, callback) => {
        console.log(obj.title)
        Book
        .where({title: obj.title})
         .fetchAll({withRelated: 'users'})
         .then(books => {
            callback(books.models.map(book => {
                const attributes = book.attributes
                return {
                    ...attributes,
                    users: book.related('users').attributes
                }
            }))
       })
    }
}

module.exports = BookFilter