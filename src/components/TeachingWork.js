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
      work,
      topicMap,
    } = this.props;
    if (!topicMap) {
      return null;
    }

    const topicIds = work.topics || [];
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
      work, 
      isLinkVisible, 
    } = this.props;
    const links = work.links || {};
    const linkItems = isLinkVisible ? Object.keys(links).map((key, i) => (
      <Link
        className="u-links__link u-links__active"
        to={{ pathname: links[key], courseId: work.id }}
      >
        {key}
      </Link>
    )) : null;

    const titleItem = work.title ? (
      <div
        className={classnames(
          'c-teaching-work__title',
          'c-teaching-work__item'
        )}
      >
        <Link
          to={{ pathname: isLinkVisible ? '/course/'+work.id : '' }}
        >
            {work.title} {this.renderTopicTagsItem()}
        </Link>
      </div>
    ) : null;

    const authorsItem = work.authors ? (
      <div
        className={classnames(
          'c-teaching-work__authors',
          'c-teaching-work__item'
        )}
      >
        {work.authors}
      </div>
    ) : null;

    const booktitleItem = work.booktitle ? (
      <div
        className={classnames(
          'c-teaching-work__booktitle',
          'c-teaching-work__item'
        )}
      >
        {work.booktitle}
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
