import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { SocialIcon } from 'react-social-icons';

const MY_API_KEY = 'AIzaSyBwnaLyWzst_5CoDvHhByeSryPJtc6wh_g';
const LAB_POSITION = {
  lat: 48.9548,
  lng: 2.3430
};
const MAP_CENTER_POSITION = {
  lat: 48.9548,
  lng: 2.3430
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

  renderOpenStreetMap() {
      const map = (
        <Map
          center={LAB_POSITION}
          zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={LAB_POSITION}>
            <Popup>RoboticsMind Lab.</Popup>
          </Marker>
        </Map>
      )

      //render(map, document.getElementsByClassName('c-contact__map')[0])
      /* return map; */
      return map;
  }

  renderSocialMedia() {
      var sm =
        <div>
        <SocialIcon style={{ height: 25, width: 25 }} url="mailto:massinissa.hamidi@lipn.univ-paris13.fr"/>
        <SocialIcon style={{ height: 25, width: 25 }} url="https://github.com/roboticsmind"/>
        <SocialIcon style={{ height: 25, width: 25 }} url="https://www.linkedin.com/in/massinissahamidi"/>
        <SocialIcon style={{ height: 25, width: 25 }} url="https://www.twitter.com/realRoboticMind"/>
        <SocialIcon style={{ height: 25, width: 25 }} url="https://www.youtube.com/channel/UCO7jkOKWF8LEwwlnzBIPRGQ"/>
        </div>
      render(sm, document.getElementById('social-media'));
  }

  componentDidMount() {
      this.renderOpenStreetMap()
      this.renderSocialMedia()
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
            Social media
          </dt>
          <dd className="c-contact__content" id="social-media">
          </dd>
      	  <dt className="c-contact__label">
            Map
          </dt>
      		<dd className="c-contact__content">
            <div className="c-contact__map">
              { this.renderMap() }
              {/* this.renderOpenStreetMap() */}
              {/*
                      this.renderOpenStreetMap()
              */}
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
