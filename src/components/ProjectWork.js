import classnames from 'classnames';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class TeachingWork extends Component {
  handleLinkClick = eventLabel => {
    ga('send', {
      hitType: 'event',
      eventCategory: 'ResearchLink',
      eventAction: 'click',
      eventLabel: eventLabel
    });
  }

  renderTopicTagsItem() {
    const {
      data,
      topicMap,
    } = this.props;
    if (!topicMap) {
      return null;
    }

    const topicIds = data.topics || [];
    const topics = topicIds
      .filter(tid => tid in topicMap)
      .map(tid => topicMap[tid]);
    const topicTags = topics.map(topic => (
      <div
        key={topic.id}
        className="c-teaching-work__tag"
        style={topic.color ? { backgroundColor: topic.color } : {}}
      >
        {topic.tag}
      </div>
    ));
    return (
      <div className="c-teaching-work__tags">
        {topicTags}
      </div>
    );
  }

  render() {
    const {
      data,
      isLinkVisible,
    } = this.props;
    const links = data.links || {};
    const linkItems = isLinkVisible ? Object.keys(links).map((key, i) => (
      <a
        key={key}
        href={links[key]}
        className="u-links__link"
        target="_blank"
        onClick={() => this.handleLinkClick(`${work.title}::${key}`)}
      >
        {key}
      </a>
    )) : null;

    const titleItem = data.title ? (
      <div
        className={classnames(
          'c-teaching-work__title',
          'c-teaching-work__item'
        )}
      >
        {data.title} {this.renderTopicTagsItem()}
      </div>
    ) : null;

    const authorsItem = data.authors ? (
      <div
        className={classnames(
          'c-teaching-work__authors',
          'c-teaching-work__item'
        )}
      >
        {data.authors}
      </div>
    ) : null;

    const booktitleItem = data.booktitle ? (
      <div
        className={classnames(
          'c-teaching-work__booktitle',
          'c-teaching-work__item'
        )}
      >
        {data.booktitle}
      </div>
    ) : null;

    return (
      <div className='c-teaching-work'>
      <div className='c-teaching-work__card'>
        {titleItem}
        {authorsItem}
        {booktitleItem}
        <div className="u-links">
          {linkItems}
        </div>
      </div>
      </div>
    );
  }
}
