import classnames from 'classnames';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ProjectWork extends Component {
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
        className="c-project-work__tag"
        style={topic.color ? { backgroundColor: topic.color } : {}}
      >
        {topic.tag}
      </div>
    ));
    return (
      <div className="c-project-work__tags">
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
        className={classnames(
            "u-links__link",
            links[key] == "" ? "u-links__inactive" : "u-links__active"
        )}

        target="_blank"
        onClick={() => this.handleLinkClick(`${data.title}::${key}`)}
      >
        {key}
      </a>
    )) : null;

    const titleItem = data.title ? (
      <div
        className={classnames(
          'c-project-work__title',
          'c-project-work__item'
        )}
      >
        <Link
          to={{ pathname: '/projectDetails/'+data.id }}
        >
            {data.title} {this.renderTopicTagsItem()}
        </Link>
      </div>
    ) : null;

    const authorsSeperatedWithCommas = 
        // Credit: https://stackoverflow.com/a/40276830/3441514
        data.authors.map((author, i) =>
            <span key={i}>
                {i > 0 && ", "}
                {author}
            </span>)
    const authorsItem = data.authors ? (
      <div
        className={classnames(
          'c-project-work__authors',
          'c-project-work__item'
        )}
      >
        {authorsSeperatedWithCommas}
      </div>
    ) : null;

    const descriptionItem = data.descr ? (
      <div
        className={classnames(
          'c-project-work__booktitle',
          'c-project-work__item'
        )}
      >
        {data.descr}
      </div>
    ) : null;

    const illustration = data.illustration ? (
      <div
        className={classnames(
          'c-project-work__illustration',
          'c-project-work__item'
        )}
      >
        <img src={data.illustration} />
      </div>
    ) : null;

    return (
      <Link
        to={{ pathname: '/projectDetails/'+data.id }}
      >
        <div className='c-project-work__card'>
          <div className='c-project-work__descr'>
              {titleItem}
              {authorsItem}
              {descriptionItem}
              <div className="u-links">
                {linkItems}
              </div>
          </div>
          {illustration}
        </div>
      </Link>
    );
  }
}
