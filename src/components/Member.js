import classnames from 'classnames';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Member extends Component {
  handleLinkClick = eventLabel => {
    ga('send', {
      hitType: 'event',
      eventCategory: 'MemberLink',
      eventAction: 'click',
      eventLabel: eventLabel
    });
  }

  render() {
    const { member } = this.props;
    const bodyItems = [
      (
        <div
          key="name"
          className={classnames(
            'c-member__item',
            'c-member__name'
          )}
        >
          {member.name}
        </div>
      ),
      (
        <div
          key="email"
          className={classnames(
            'c-member__item',
            'c-member__email'
          )}
        >
          {member.email}
        </div>
      ),
      ...member.attributes.map((attr, i) => (
        <div
          key={i}
          className={classnames(
            'c-member__item',
            `c-member__item-${attr[0]}`
          )}
        >
          {attr[1]}
        </div>
      ))
    ];
    const linkItems = member.links.map((link, i) => (
      <a
        key={i}
        href={link[1]}
        className="u-links__link"
        target="_blank"
        onClick={() => this.handleLinkClick(`${member.email}::${link[0]}`)}
      >
        {link[0]}
      </a>
    ));
    return (
      <div className="c-member">
        <img
          className="c-member__profile-image"
          src={member.image}
        />
        <div className="c-member__body">
          {bodyItems}
          <div className="u-links">
            {linkItems}
          </div>
        </div>
      </div>
    );
  }
}
