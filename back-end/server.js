const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const port = process.argv[2] || 8080
const jsonParser = bodyParser.json()
const knex = require('knex')(require('./knexfile'))
const bookshelf = require('bookshelf')(knex)
const Book = require('./models/Index').Book
const BookController = require('./controllers/BookController')
const BookFilter = require('./controllers/BookFilter')
const UserController = require('./controllers/UserController')
const BookUpdate = require('./controllers/BookUpdate')

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});


app.post("/mybooks", (req, res) => {
  let result = req.body
  // console.log(result)
  BookController.checkMyBooks(result, (books) => {
    res.json(books)
  })
})

app.post("/changestatus", (req, res) => {
    let result = req.body
    console.log(result)
    BookUpdate.updateBook(result, (todos) => {
      res.json(todos)
    })
})

app.get("/getbook", (req, res) => {
  BookController.getBooks(((books) => {
    res.json(books)
    console.log(books)
  }))
})

app.post("/postbook", (req, res) => {
  let result = req.body
  BookController.addBook(result.newBook, (books) => {
    res.json(books)
  })
})

app.post("/searchbook", (req, res) => {
  let title = req.body
  // console.log(req.body)
  BookFilter.filterBook(title, (books) => {
    res.json(books)

  })

})


app.post("/userid", (req, res) => {
  let result = req.body
  // console.log(result)
  UserController.searchEmail(result, (users) => {
    res.json(users)
    console.log(users)
  })
})

app.post("/postuser", (req, res) => {
  let result = req.body
  UserController.addUser(result.user, (users) => {
    console.log('register')
  })
})

app.post("/postusercontact", (req, res) => {
  let result = req.body
  // console.log(result)
  UserController.searchUser(result, (users) => {
    res.json(users)
  })
})

app.listen(port, () => {
  console.log(`Server started on http://localhost: ${port}`);
  console.log('Press CTRL + C to stop server');
})