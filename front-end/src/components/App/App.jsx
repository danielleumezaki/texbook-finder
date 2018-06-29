import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home/Home'
import Buy from '../Buy/Buy'
import Sell from '../Sell/Sell'
import SignUp from '../SignUp/SignUp'
import Login from '../Login/Login'
import Mybooks from '../Mybooks/Mybooks'
import firebase from 'firebase'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      title: "",
      isShowInfoWindow: false,
      isLoading: true,
      bookSelect: [],
      isClicked: false,
      isSearch: false,
      isLogin: false,
      redirect: false,
      contact: [],
      myBooks: [],
      checked: false,
      isCLickSearch: false
    }
  }

  /*Getting books*/
  componentDidMount() {
    axios.get('http://localhost:8080/getbook')
      .then((response) => {
        console.log('response: ', response.data)
        if (response.data) {
          this.setState({
            books: response.data,
            isLoading: false
          })
        }
        console.log(this.state.books)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  /*Getting books that match with the search*/
  handlerSearchTitle = (event) => {
    event.preventDefault();
    console.log(event.target.search.value);
    let title = (event.target.search.value).toLowerCase()
    console.log(title)
    event.target.search.value = ''
    this.setState({
      isCLickSearch: true
    })
    axios.post('http://localhost:8080/searchbook', { title })
      .then((response) => {
        console.log('response: ', response.data)
        if (response.data.length == 0) {
          this.setState({
            isSearch: true
          })
        } else {
          this.setState({
            books: response.data,
          })
          console.log(this.state.books)
        }
        console.log(this.state.isSearch)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /*Getting authorization*/
  handlerSubmitLogin = (event) => {
    event.preventDefault();
    let login = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    event.target.email.value = ''
    event.target.password.value = ''

    console.log(login.email)
    firebase
      .auth()
      .signInWithEmailAndPassword(login.email, login.password)
      .then(result => {
        axios.post('http://localhost:8080/userid', { eMail: login.email })
          .then((response) => {
            console.log(response.data)
            this.setState({
              contact: response.data,
              isLogin: true,
              redirect: true
            })
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        alert('Sorry, your password or email is incorrect! Please, check and try again!')
      });
  }
  /* Logout working*/
  handlerSubmitLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(result => {
        console.log('logout')
        this.setState({
          isLogin: false
        })
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  /*Render Sell Page if user is logged*/
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/sell' />
    }
  }

  /*Render markers in the map from Books*/
  renderMarkers = (map, maps) => {
    this.state.books.forEach((local) => {
      let marker = new maps.Marker({
        position: { lat: local.lat, lng: local.lng },
        title: local.title,
        map,
      });

      marker.addListener('click', () => {
        let position = marker.title
        let match = this.state.books.filter((book) => {
          return marker.title === book.title
        })
        console.log(match)
        console.log(position)

        this.setState({
          bookSelect: match,
          isClicked: true
        })
      })

    })
  }

  /*Gettin contact info*/
  handlerContact = (item) => {
    console.log(item.id)
    let verifyIDclick = this.state.books.find((book) => {
      if (book.id === item.id) {
        book.status = !book.status
        return book
      }
    })

    axios.post('http://localhost:8080/changestatus', verifyIDclick)
      .then((response) => {
        console.log(response.data)
        this.setState({
          books: response.data
        })
      })

  }

  /*Getting my books*/
  handlerMyBooks = () => {
    console.log(this.state.contact)
    console.log(this.state.isLogin)
    if (this.state.isLogin) {
      let verifyID = this.state.books.map((book) => {
        if (this.state.contact.id === book.user_id)
          return book.user_id
      })
      let id = verifyID.find((number) => {
        return number
      })
      console.log(id)
      axios.post('http://localhost:8080/mybooks', { user_id: id })
        .then((response) => {
          console.log(response.data)
          this.setState({
            myBooks: response.data,
            isCLickSearch: true
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  /*Reset search book*/
  backSearch = (event) => {
    axios.get('http://localhost:8080/getbook')
      .then((response) => {
        console.log(response.data)
        this.setState({
          isCLickSearch: false,
          isSearch: false,
          books: response.data,
          isClicked: false
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }

  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={() => (<Home
            isLogin={this.state.isLogin}
            handlerSubmitLogout={this.handlerSubmitLogout}
          />
          )} />
          <Route path="/sell" component={() => (<Sell
            clickMap={this.clickMap}
            books={this.state.books}
            isLogin={this.state.isLogin}
            handlerMyBooks={this.handlerMyBooks}
            contact={this.state.contact}
          />
          )} />
          <Route path="/buy" component={() => (<Buy
            books={this.state.books}
            handlerSearchTitle={this.handlerSearchTitle}
            renderMarkers={this.renderMarkers}
            isLoading={this.state.isLoading}
            bookSelect={this.state.bookSelect}
            isClicked={this.state.isClicked}
            isSearch={this.state.isSearch}
            handlerContact={this.handlerContact}
            contact={this.state.contact}
            isCLickSearch={this.state.isCLickSearch}
            backSearch={this.backSearch}
          />
          )} />
          <Route path="/signup" component={() => (<SignUp
            hidePassword={this.hidePassword}
          />)}
          />
          <Route path="/login" component={() => (<Login
            handlerSubmitLogin={this.handlerSubmitLogin}
            renderRedirect={this.renderRedirect}
            textLogin={this.state.textLogin}
          />
          )} />
          <Route path="/mybooks" component={() => (<Mybooks
            myBooks={this.state.myBooks}
            checkSold={this.checkSold}
            checked={this.state.checked}
          />)} />
        </Switch>
      </div>
    );
  }
}

export default App;
