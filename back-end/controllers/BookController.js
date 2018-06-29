const Book = require('../models/Index').Book

const BookController = {
    addBook: (obj, callback) => {
        new Book({
            title: obj.title,
            author: obj.author,
            year: obj.year,
            price: obj.price,
            lat: obj.lat,
            lng: obj.lng,
            comment: obj.comment,
            status: false,
            user_id: obj.user_id
        })
            .save()
            .then(() => {
                Book.fetchAll().then(books => {
                    callback(books.models.map(book => book.attributes))
                })
            })
    },
    checkMyBooks: (obj, callback) => {
        console.log(obj.user_id)
        Book
            .where({ user_id: obj.user_id })
            .fetchAll({ withRelated: ['users'] })
            .then(books => {
                console.log(books.models[0].attributes)
                callback(books.models.map(book => book.attributes))

            })
    },
    getBooks: (callback) => {
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
    }

}

module.exports = BookController