import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './signup-styles.css'
import firebase from 'firebase'
import axios from 'axios'



class SignUp extends Component {

    /* Submitting Sign Up form*/
    handlerFormSignUp = () => {
        let user = {
            firstname: this.inputFirstName.value,
            lastname: this.inputLastName.value,
            phone: Number(this.inputPhone.value),
            email: this.inputEmail.value,
            password: this.inputPassword.value
        }
        console.log(user)
        this.inputFirstName.value = ''
        this.inputLastName.value = ''
        this.inputPhone.value = ''
        this.inputEmail.value = ''
        this.inputPassword.value = ''

        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(result => {
                console.log("yes")
                axios.post('http://localhost:8080/postuser', { user })
                    .then((response) => {
                        console.log('response: ', response.data)
                        alert('Thank you for sign up!')
                    })
                    .catch((error) => {
                        console.log(error)
                        alert('Sorry, your password or login is incorrect! Please, try again!')
                    })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    /*Function to hide the password*/
    hidePassword = () => {
        let hide = this.inputPassword;
        if (hide.type === "password") {
            hide.type = "text"
        } else {
            hide.type = "password"
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="sectionBanner">
                    <div className="row">
                        <div className="col-md-1">
                            <Link className="homesymbol-buy" to="/"><img className="logobuy" src="img/logo.png" alt="textbook finder logo" /></Link>
                        </div>
                        <div className="col-12 col-md-10">
                            <h4>Create your Textbook Finder account!</h4>
                        </div>
                        <div className="col-md-1">
                        </div>
                    </div>
                </div>
                <div className="section-signup">
                    <div className="signupBox">
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">person</i>
                                <label htmlFor="firstname">First Name</label>
                                <input type="text" className="validate" ref={el => this.inputFirstName = el} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">person</i>
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" className="validate" ref={el => this.inputLastName = el} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">phone</i>
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="validate" pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$" ref={el => this.inputPhone = el} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">email</i>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="validate" ref={el => this.inputEmail = el} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">vpn_key</i>
                                <label htmlFor="password">Password</label>
                                <input type="text" className="validate" ref={el => this.inputPassword = el} onClick={this.hidePassword} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="logintext">Already on Textbook Finder? &nbsp; <Link className="login" to="/login"> LOGIN</Link></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <a className="waves-effect waves-light btn-large orange darken-4 text-white signUp" onClick={this.handlerFormSignUp}>SIGN UP</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp