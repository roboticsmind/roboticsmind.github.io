import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const MY_API_KEY = 'AIzaSyCJW-HhyVcQze6OGT9wDrE0kyYCuv3wHg0';
const LAB_POSITION = {
  lat: 36.368071,
  lng: 127.365510,
};
const MAP_CENTER_POSITION = {
  lat: 36.368071,
  lng: 127.365510
};

class Contact extends Component {
  renderMap() {
    const { googleMaps } = this.props;
    return googleMaps ? (
      <GoogleMap
        googleMaps={googleMaps}
        coordinates={[
          {
            title: 'RoboticsMind.',
            position: LAB_POSITION
          }
        ]}
        center={MAP_CENTER_POSITION}
        zoom={15}
        onLoaded={(googleMaps, map) => {
          map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)
        }}
      />
    ) : null;
  }

  render() {
    return (
      <div className="c-contact">
        <div className="c-contact__items">
          <dt className="c-contact__label">
            Tel.
          </dt>
        	<dd className="c-contact__content">
            +33 1 49.40.36.09
          </dd>
        	<dt className="c-contact__label">
            Address
          </dt>
        	<dd className="c-contact__content">
                Institut Galilée, Université Paris 13 <br/>
                99, avenue Jean-Baptiste Clément, 93430 – Villetaneuse
    		  </dd>
      		<dt className="c-contact__label">
            Map
          </dt>
      		<dd className="c-contact__content">
            <div className="c-contact__map">
              {this.renderMap()}
            </div>
      		</dd>
        </div>
      </div>
    );
  }
}

export default GoogleMapLoader(Contact, {
  libraries: ['places'],
  key: MY_API_KEY,
})
