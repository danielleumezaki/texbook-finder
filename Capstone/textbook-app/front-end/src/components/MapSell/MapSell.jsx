import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class MapSell extends Component {
    static defaultProps = {
        center: {
            lat: 49.285038,
            lng: -123.11458
        },
        zoom: 11
    }

    /*Get the lococation when you click in the map*/
    clickMap = e => {
        this.props.clickMap(e)
    }

    render() {
        console.log(this.props.books)
        if (this.props.books.length === 0) {
            return (
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDfqLKjZl36BwLke0a07MJNyAfPsx90flE' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        onClick={(e) => { this.props.clickMap(e) }}
                    >
                    </GoogleMapReact>
                </div>
            )
        } else {
            return (
                <div className="Map" >
                    <br />
                    <div style={{ height: '50vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyDfqLKjZl36BwLke0a07MJNyAfPsx90flE' }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                            onClick={(e) => { this.props.clickMap(e) }}
                        >
                        </GoogleMapReact>
                    </div>
                </div >
            )
        }
    }
}

export default MapSell