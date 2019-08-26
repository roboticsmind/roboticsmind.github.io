import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default class Header extends Component {
  render() {
    return (
      <header className="c-header">
        <div className="c-header__title">
          {/* 
          <div className="c-header__logo">
             <Logo />
          </div>
          */}
          <img
            className="c-header__title-image"
            /* src="/public/images/row-of-dolls.jpeg" */
            src="/public/images/logo/logo_transparent.png"
          />
        </div>
        <div className="c-header__menu-container">
          <div className="c-header__menu">
            <Link
              className="c-header__menu-item"
              to="/"
            >
              Home
            </Link>
            <Link
              className="c-header__menu-item"
              to="/members"
            >
              Members
            </Link>
            <Link
              className="c-header__menu-item"
              to="/research"
            >
              Research
            </Link>
            <Link
              className="c-header__menu-item"
              to="/teaching"
            >
              Teaching 
            </Link>

            <Link
              className="c-header__menu-item"
              to="/partners"
            >
              Partners
            </Link>
            <Link
              className="c-header__menu-item"
              to="/donate"
            >
              Donate
            </Link>
            <Link
              className="c-header__menu-item"
              to="/links"
            >
              Links
            </Link>

            <Link
              className="c-header__menu-item"
              to="/contact"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
