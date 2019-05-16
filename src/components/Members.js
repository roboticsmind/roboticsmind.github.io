import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DataLoader from './DataLoader';
import MemberGroup from './MemberGroup';

const DATA_URL = '/public/data/members.json';

class Members extends Component {
  render() {
    const { data } = this.props;
    const groupItems = data.map((group, i) => (
      <MemberGroup
        key={i}
        group={group}
      />
    ));
    return (
      <div className="c-members">
        {groupItems}
      </div>
    );
  }
}

export default (...props) => {
  return (
    <DataLoader json={DATA_URL}>
      <Members {...props} />
    </DataLoader>
  );
};
