import React, { Component } from 'react'
import MapSell from '../MapSell/MapSell'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './sell-styles.css'


class Sell extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowMap: false,
            selectedFile: null,
            lat: 0,
            lng: 0
        }
    }

    /*Submiting the form*/
    handlerForm = (event) => {
        let id = this.props.contact.id

        let newBook = {
            title: (this.inputTitle.value).toLowerCase(),
            author: this.inputAuthor.value,
            year: Number(this.inputYear.value),
            price: Number(this.inputPrice.value),
            photo: this.state.selectedFile,
            lat: Number(this.state.lat.toFixed(3)),
            lng: Number(this.state.lng.toFixed(3)),
            comment: this.inputComment.value,
            id: new Date().getTime(),
            user_id: id
        }
        console.log(newBook)
        this.inputTitle.value = ''
        this.inputAuthor.value = ''
        this.inputYear.value = ''
        this.inputPrice.value = ''
        this.inputComment.value = ''

        axios.post('http://localhost:8080/postbook', { newBook })
            .then((response) => {

                console.log('response: ', response)
                if (response.data) {
                    alert("Congratulation!! Your book was published!!")

                }
            })
            .catch((error) => {
                console.log(error)
                alert("Opps!! Looks like you didn't fill all informations!")
            })
    }

    /*Getting the location when you click*/
    clickMap = (coordinates) => {
        console.log(coordinates.lat, coordinates.lng)
        if (coordinates.lat === 0 || coordinates.lng === 0) {
            alert(this.state.verify)
        } else {
            this.setState({
                lat: coordinates.lat,
                lng: coordinates.lng
            })
        }
    }
    /*Setting the state when you click the button*/
    handleShowMap = () => {
        let isShowMap = !this.state.isShowMap
        this.setState({
            isShowMap
        })
    }

    /*Rendering the map*/
    renderisShowMapOrNot = () => {
        if (this.state.isShowMap) {
            return <MapSell clickMap={this.clickMap} books={this.props.books} />
        } else {
            return null
        }
    }

    /*Show the button MY BOOKS if you are login*/
    showMyBooks = () => {
        if (this.props.isLogin) {
            return (<button class="waves-effect waves-light btn-large  orange darken-4 text-white mybooks"><Link to="/mybooks" onClick={() => { this.props.handlerMyBooks() }}>My BOOKS</Link></button>)
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
                            <h4>Sell your textbook here!</h4>
                        </div>
                        <div className="col-1">
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.showMyBooks()}
                    </div>
                </div>
                <div className="formBook">
                    <form name="formNewBook">
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">create</i>
                                <label htmlFor="author">Title</label>
                                <input type="text" className="validate" ref={el => this.inputTitle = el} />
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">create</i>
                                <label htmlFor="author">Author</label>
                                <input id="author" type="text" className="validate" ref={el => this.inputAuthor = el} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">create</i>
                                <label htmlFor="year">Year</label>
                                <input id="year" type="text" className="validate" ref={el => this.inputYear = el} />
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">attach_money</i>
                                <label htmlFor="price">Price</label>
                                <input id="price" type="text" className="validate" ref={el => this.inputPrice = el} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <a className="waves-effect waves-light btn orange darken-4 text-white" onClick={this.handleShowMap}>LOCATION</a>
                                {this.renderisShowMapOrNot()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">create</i>
                                <input id="textarea2" className="validate" type='text' ref={el => this.inputComment = el} />
                                <label htmlFor="textarea2">Comment</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <a className="waves-effect waves-light btn-large orange darken-4 text-white" onClick={this.handlerForm}>SUBMIT</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Sell