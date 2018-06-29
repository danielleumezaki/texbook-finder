import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './mybooks-styles.css'

class Mybooks extends Component {

    render() {
        let renderMyBooks;
        if (this.props.myBooks.length > 0) {
            console.log(this.props.myBooks)
            renderMyBooks = this.props.myBooks.map((book) => {
                return (
                    <tbody>
                        <tr>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>${book.price}</td>
                            <td>{book.comment}</td>
                            <td>
                                <form action="#">
                                    <p>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="check"
                                                id="defaultCheck1" />
                                            <span>Sold</span>
                                        </label>
                                    </p>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        } else {
            return (<div className="container-fluid">
                <div className="sectionBanner">
                    <div className="row">
                        <div className="col-md-1">
                            <Link className="homesymbol-buy" to="/"><img className="logobuy" src="img/logo.png" alt="textbook finder logo" /></Link>
                        </div>
                        <div className="col-10">
                            <h4>My books</h4>
                        </div>
                        <div className="col-1">
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to="/sell" className="btn-large btn-floating orange darken-4 back-icon"><i className="small material-icons prefix text-white back">arrow_back</i></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h6 id="nobooks"> You have no books! </h6>
                    </div>
                </div>
            </div>
            )
        }
        return (
            <div className="container-fluid">
                <div className="sectionBanner">
                    <div className="row">
                        <div className="col-md-1">
                            <Link className="homesymbol-buy" to="/"><img className="logobuy" src="img/logo.png" alt="textbook finder logo" /></Link>
                        </div>
                        <div className="col-10">
                            <h4>My books</h4>
                        </div>
                        <div className="col-1">
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to="/sell" className="btn-large btn-floating orange darken-4 back-icon"><i className="small material-icons prefix text-white back">arrow_back</i></Link>
                    </div>
                </div>
                <div className="row">
                    <table className="responsive-table centered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>Price</th>
                                <th>Comments</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {renderMyBooks}
                    </table>
                </div>
            </div>
        )
    }
}

export default Mybooks