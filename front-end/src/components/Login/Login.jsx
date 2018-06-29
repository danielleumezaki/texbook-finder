import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './login-styles.css'

class Login extends Component {

    /*Functin to hide password*/
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
                        <div className="col-10">
                            <h4>Sing Up here!</h4>
                        </div>
                    </div>
                </div>
                <div className="section-login">
                    <div className="loginBox">
                        {this.props.renderRedirect()}
                        <form onSubmit={(event) => { this.props.handlerSubmitLogin(event) }}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">email</i>
                                    <label htmlFor="email">Email</label>
                                    <input name="email" type="text" className="validate" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">vpn_key</i>
                                    <label htmlFor="password">Password</label>
                                    <input name="password" type="text" className="validate" ref={el => this.inputPassword = el} onClick={this.hidePassword} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button className="waves-effect waves-light btn-large orange darken-4 text-white search" type="submit" >SIGN IN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12">
                        <p className="signuptext">Don't have a login? &nbsp; <Link className="login" to="/signup"> SIGN UP</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login