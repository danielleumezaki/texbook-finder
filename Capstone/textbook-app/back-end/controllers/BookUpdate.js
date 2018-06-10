const Book = require('../models/Index').Book

const BookUpdate = {
    updateBook: (obj, callback) => {
        console.log(obj.id)
        Book
        .where({id: obj.id})
        .save({status:obj.status}, {patch:true})
        .then(() => {
            Book
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
        })

    }
}

module.exports = BookUpdate