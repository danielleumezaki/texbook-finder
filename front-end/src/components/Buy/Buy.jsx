import React, { Component } from 'react'
import MapBuy from '../MapBuy/MapBuy'
import { Link } from 'react-router-dom'
import './buy-styles.css'
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from 'react-collapsible-component'

class Buy extends Component {

    render() {
        let displayBooks;
        if (this.props.isClicked) {
            console.log(this.props.bookSelect)
            console.log(this.props.isSearch)
            console.log(this.props.books)
            displayBooks = this.props.bookSelect.map((item) => {
                return (
                    <div>
                        <div className="card horizontal">
                            <div className="card-stacked">
                                <p className="infobook">Title</p>
                                <h5 className="show-book">{item.title}</h5>
                                <p className="infobook">Author</p>
                                <h5 className="show-book">{item.author}</h5>
                                <p className="infobook">Year</p>
                                <h5 className="show-book">{item.year}</h5>
                                <p className="infobook">Price</p>
                                <h5 className="show-book">${item.price}</h5>
                                <p className="infobook">Comments</p>
                                <h5 className="show-book">{item.comment}</h5>
                                <CollapsibleComponent>
                                    <CollapsibleHead className="additionalClassForHead">Show Contact Info</CollapsibleHead>
                                    <CollapsibleContent className="additionalClassForContent">
                                        <p className="infobook">{item.users.firstName}</p>
                                        <p className="infobook">{item.users.eMail}</p>
                                        <p className="infobook">{item.users.phone}</p>
                                    </CollapsibleContent>
                                </CollapsibleComponent>
                            </div>
                        </div>
                    </div>
                )
            })
        } else if (this.props.isSearch) {
            if (this.props.books.length === 0) {
                displayBooks = <div><h5 className="show-book">Sorry, this book was not found!</h5></div>
            } else {
                displayBooks = this.props.books.map((item) => {
                    return (
                        <div>
                            <div className="card horizontal">
                                <div className="card-stacked">
                                    <p className="infobook">Title</p>
                                    <h5 className="show-book">{item.title}</h5>
                                    <p className="infobook">Author</p>
                                    <h5 className="show-book">{item.author}</h5>
                                    <p className="infobook">Year</p>
                                    <h5 className="show-book">{item.year}</h5>
                                    <p className="infobook">Price</p>
                                    <h5 className="show-book">${item.price}</h5>
                                    <p className="infobook">Comments</p>
                                    <h5 className="show-book">{item.comment}</h5>
                                    <CollapsibleComponent>
                                        <CollapsibleHead className="additionalClassForHead">Show Contact Info</CollapsibleHead>
                                        <CollapsibleContent className="additionalClassForContent">
                                            <p className="infobook">{item.users.firstName}</p>
                                            <p className="infobook">{item.users.eMail}</p>
                                            <p className="infobook">{item.users.phone}</p>
                                        </CollapsibleContent>
                                    </CollapsibleComponent>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            console.log("true")
        } else {
            displayBooks = this.props.books.map((item) => {
                return (
                    <div>
                        <div className="card horizontal">
                            <div className="card-stacked">
                                <p className="infobook">Title</p>
                                <h5 className="show-book">{item.title}</h5>
                                <p className="infobook">Author</p>
                                <h5 className="show-book">{item.author}</h5>
                                <p className="infobook">Year</p>
                                <h5 className="show-book">{item.year}</h5>
                                <p className="infobook">Price</p>
                                <h5 className="show-book">${item.price}</h5>
                                <p className="infobook">Comments</p>
                                <h5 className="show-book">{item.comment}</h5>
                                <CollapsibleComponent>
                                    <CollapsibleHead className="additionalClassForHead">Show Contact Info</CollapsibleHead>
                                    <CollapsibleContent className="additionalClassForContent">
                                        <p className="infobook">{item.users.firstName}</p>
                                        <p className="infobook">{item.users.eMail}</p>
                                        <p className="infobook">{item.users.phone}</p>
                                    </CollapsibleContent>
                                </CollapsibleComponent>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="container-fluid" >
                <div className="sectionBanner">
                    <form onSubmit={(event) => { this.props.handlerSearchTitle(event) }}>
                        <div className="row">
                            <div className="col-md-1">
                                <Link className="homesymbol-buy" to="/"><img className="logobuy" src="img/logo.png" alt="textbook finder logo" /></Link>
                            </div>
                            <div className="col-12 col-md-7">
                                <div className="input-field">
                                    <i className="material-icons prefix text-white search">search</i>
                                    <input name="search" placeholder="Title of the textbook" id="title" type="text" className="validate" />
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="waves-effect waves-light btn orange darken-4 text-white search" type="submit" name="action" disabled={this.props.isCLickSearch === true}>search</button>
                            </div>

                            <div className="col-2">
                            </div>
                        </div>
                    </form>
                    <a className="waves-effect waves-light btn orange darken-4 text-white back" disabled={this.props.isCLickSearch === false && this.props.isClicked === false} onClick={(event) => { this.props.backSearch(event) }}>RESET</a>
                </div>
                <div className="row">
                    <div className="col-12 col-md-8">
                        <MapBuy clickMap={this.props.clickMap} books={this.props.books} renderMarkers={this.props.renderMarkers} />
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <div className="scroll" style={{ height: '76vh', width: '100%', overflow: 'scroll', marginTop: '5vh', backgroundColor: 'transparent', color: 'transparent' }}>
                            {displayBooks}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Buy;

