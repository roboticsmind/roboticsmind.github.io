import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Member from './Member';

export default class MemberGroup extends Component {
  render() {
    const { group } = this.props;
    const memberItems = group.members.map((member, i) => (
      <Member
        key={i}
        member={member}
      />
    ));
    return (
      <div className="c-member-group">
        <div className="c-member-group__title">
          {group.title}
        </div>
        <div className="c-member-group__members">
          {memberItems}
        </div>
      </div>
    );
  }
}
