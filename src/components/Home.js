import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DataLoader from './DataLoader'
import ResearchWork from './ResearchWork';

const DATA_URL = '/public/data/researches.json';
const MAX_PUBLICATION_COUNT = 5;

class Home extends Component {
  getLatestPublications() {
    const { data } = this.props;
    const works = data.categories.filter(category => category.title === 'Publications')[0].researches;
    return works.length > MAX_PUBLICATION_COUNT ? works.slice(0, MAX_PUBLICATION_COUNT) : works;
  }

  render() {
    const publicationItems = this.getLatestPublications().map((work, i) => (
      <ResearchWork
        key={i}
        work={work}
      />
    ));
    return (
      <div className="c-home">
        <div className="c-home__announcement" style={{ display: 'none' }}>
          <p>
            <strong>[Announcement]</strong><br />
          </p>
        </div>
        <div className="c-home__main-image-container">
          <img
            className="c-home__main-image"
            src="/public/images/logo/twitter_header_photo_2.png"
            alt="robotics-mind."
          />
        </div>
        <div className="c-home__publications-title">
          Latest publications
        </div>
        <div className="c-home__publications">
          {publicationItems}
        </div>
        <div className="u-links">
          <Link
            className="u-links__link"
            to="/research"
          >
            See More
          </Link>
        </div>
      </div>
    );
  }
}

export default (...props) => {
  return (
    <DataLoader json={DATA_URL}>
      <Home {...props} />
    </DataLoader>
  );
};
