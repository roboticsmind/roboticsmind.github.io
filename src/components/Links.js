import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DataLoader from './DataLoader';

const DATA_URL = '/public/data/links.json';
const YEAR = (new Date()).getFullYear();

class Links extends Component {
  renderLink(link, i) {
    return (
      <div
        key={i}
        className="c-links__link-group"
      >
        <a
          key={i}
          className="c-links__link"
          target="_blank"
          href={link[1]}
        >
          {link[0]}
        </a>
      </div>
    )
  }

  renderKeywordLink(keyword, i) {
    const currYear = `${keyword} ${YEAR}`;
    const nextYear = `${keyword} ${YEAR + 1}`;
    const urlCurrYear = `http://www.google.com/search?q=${encodeURIComponent(currYear)}&btnI`;
    const urlNextYear = `http://www.google.com/search?q=${encodeURIComponent(nextYear)}&btnI`;

    const linkCurrYear = (
      <a
        key={`${i}-curr`}
        className="c-links__link"
        target="_blank"
        href={urlCurrYear}
      >
        {currYear}
      </a>
    );
    const linkNextYear = (
      <a
        key={`${i}-next`}
        className="c-links__link"
        target="_blank"
        href={urlNextYear}
      >
        {nextYear}
      </a>
    );
    return (
      <div
        key={`${i}-group`}
        className="c-links__link-group"
      >
        {linkCurrYear}
        {linkNextYear}
      </div>
    )
  }

  renderCategory(category, i) {
    const linkItems = (category.links || []).map((link, i) => this.renderLink(link, i));
    const keywordLinkItems = (category.keywords || []).map((keyword, i) => this.renderKeywordLink(keyword, i));
    const infoMessage = category.keywords ? (
      <div className="c-links__info">
        Links above use Google's "I'm Feeling Lucky" feature to find appropriate websites.
      </div>
    ) : null;
    return (
      <div
        key={i}
        className="c-links__category"
      >
        <div className="c-links__category-title">
          {category.title}
        </div>
        <div className="c-links__links">
          {linkItems}
          {keywordLinkItems}
        </div>
        {infoMessage}
      </div>
    )
  }

  render() {
    const { data } = this.props;
    const categoryItems = data.map((category, i) => this.renderCategory(category, i));
    return (
      <div className="c-links">
        {categoryItems}
      </div>
    );
  }
}

export default (...props) => {
  return (
    <DataLoader json={DATA_URL}>
      <Links {...props} />
    </DataLoader>
  );
};
