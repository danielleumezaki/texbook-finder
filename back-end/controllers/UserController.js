const User = require('../models/Index').User
const Book = require('../models/Index').Book

const UserController = {
    addUser: (obj, callback) => {
        new User({
            firstName: obj.firstname,
            lastName: obj.lastname,
            phone: obj.phone,
            eMail: obj.email
        })
            .save()
            .then(() => {
                User.fetchAll().then(users => {
                    callback(users.models.map(user => user.attributes))
                })
            })
    },
    searchUser: (obj, callback) => {
        console.log(obj.id)
        User
            .where({ id: obj.id })
            .fetch({ withRelated: ['books'] })
            .then(user => {
                const { attributes } = user
                console.log(user.attributes)
                callback({
                    firstName: attributes.firstName,
                    eMail: attributes.eMail,
                    phone: attributes.phone,
                    id: attributes.id
                })
            })
    },
    searchEmail: (obj, callback) => {
        console.log(obj.eMail)
        User
        .where({eMail: obj.eMail})
        .fetch({ withRelated: ['books'] })
        .then(user => {
            const { attributes } = user
            console.log(user.attributes)
            callback({
                firstName: attributes.firstName,
                eMail: attributes.eMail,
                phone: attributes.phone,
                id: attributes.id
            })
        })
    }
}

module.exports = UserController