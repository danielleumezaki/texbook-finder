import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home-styles.css'

class Home extends Component {

    render() {
        let confirmLogin = this.props.isLogin ? "/sell" : "/login"
        return (
            <div className="container-fluid">
                <div className="section">
                    <div className="row">
                        <div className="col-12 col-md-10">
                            <img className="logo" src="img/logo.png" alt="textbook finder logo" />
                        </div>
                        <div className="col-12 col-md-2">
                            <a className="waves-effect waves-light btn-large orange darken-4 text-white signup"><Link to="/signup" className="login">LOGIN/SIGN UP</Link></a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <a className="logout" onClick={this.props.handlerSubmitLogout}><i className="fa fa-sign-out" style={{ fontSize: '30px', float: 'right', marginRight: '5%' }}></i></a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1>Buying or selling textbooks? </h1>
                            <p className="subtitle">Here you can find or sell easily used textbooks that you need!!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-2">
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card">
                                <div className="card-image">
                                    <a className="btn-large btn-floating orange sell-icon"><i className="material-icons waves-effect waves-light orange darken-4">shopping_cart</i></a>
                                </div>
                                <div className="card-content">
                                    <p>You can find people that are selling textbooks close to you and contact them.</p>
                                    <br /><br />
                                    <Link className="cardbutton" to="/buy">BUY</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card">
                                <div className="card-image">
                                    <a className="btn-large btn-floating orange sell-icon"><i className="material-icons waves-effect waves-light orange darken-4">attach_money</i></a>
                                </div>
                                <div className="card-content">
                                    <p>You just need to post your book here and interested people you contact you!</p>
                                    <br /><br />
                                    <Link className="cardbutton" to={confirmLogin}>SELL</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-2">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home
