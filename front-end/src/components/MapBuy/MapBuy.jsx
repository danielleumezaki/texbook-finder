import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class MapBuy extends Component {

    static defaultProps = {
        center: {
            lat: 49.285038,
            lng: -123.11458
        },
        zoom: 11
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
                    >
                    </GoogleMapReact>
                </div>
            )
        } else {
            return (
                <div className="Map">
                    <br />
                    <div style={{ height: '75vh', width: '100%', marginTop: '4vh' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyDfqLKjZl36BwLke0a07MJNyAfPsx90flE' }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                            onClick={this.handlerInfoWindow}
                            onGoogleApiLoaded={({ map, maps }) => this.props.renderMarkers(map, maps)}
                            yesIWantToUseGoogleMapApiInternals
                        >
                        </GoogleMapReact>
                    </div>
                </div >
            )
        }
    }
}

export default MapBuy