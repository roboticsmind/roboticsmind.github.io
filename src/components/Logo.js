import $ from 'jquery';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import '../lib/uilab-active-logo.jquery';

export default class Logo extends Component {
  componentDidMount() {
    this.logo = $(this.logoBlock).drawUILabLogo();
    this.logo.startDefaultRandomAnimation();
  }

  render() {
    return (
      <div
        ref={e => this.logoBlock = e}
        className="c-logo"
      />
    );
  }
}
