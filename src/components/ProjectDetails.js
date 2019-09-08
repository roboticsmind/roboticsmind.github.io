import classnames from 'classnames';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import DataLoader from './DataLoader';
//import ReactMarkdown from 'react-markdown';
import ReactMarkdown from 'react-markdown/with-html'

// const DATA_URL = '/public/data/iot-projects/guessless.json';

class ProjectDetails extends Component {
  handleLinkClick = eventLabel => {
    ga('send', {
      hitType: 'event',
      eventCategory: 'ResearchLink',
      eventAction: 'click',
      eventLabel: eventLabel
    });
  }

  // componentWillMount() {
  //     // setTimeout(() => this.setSpinnerVisible(), 500);
  //     fetch(work.markdown).then(response => {
  //     	return response.text();
  //     }).then(data => {
  // 	    this.setState({ markdown: data });
  //     }).catch(err => {
  //         this.setState({ data: null });
  //         console.error('Failed to load data:', err);
  //     });
  // }

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
      data, 
      markdown,
      isLinkVisible=true, 
    } = this.props;

    const work = data

    const links = work.links || {};
    const linkItems = isLinkVisible ? Object.keys(links).map((key, i) => (
      <a
        key={key}
        href={links[key]}
        className="u-links__link"
        target=""
        onClick={() => this.handleLinkClick(`${work.title}::${key}`)}
      >
        {key}
      </a>
    )) : null;

    const titleItem = work.title ? (
      <div
        className={classnames(
          'c-project-details__title',
          'c-project-details__item'
        )}
      >
        {work.title} {this.renderTopicTagsItem()}
      </div>
    ) : null;

    const authorsSeperatedWithCommas = 
        // Credit: https://stackoverflow.com/a/40276830/3441514
        data.authors.map((author, i) =>
            <span key={i}>
                {i > 0 && ", "}
                {author}
            </span>)
    const authorsItem = work.authors ? (
      <div
        className={classnames(
          'c-project-details__authors',
          'c-project-details__item'
        )}
      >
        {authorsSeperatedWithCommas}
      </div>
    ) : null;

    const booktitleItem = work.booktitle ? (
      <div
        className={classnames(
          'c-project-details__booktitle',
          'c-project-details__item'
        )}
      >
        {work.booktitle}
      </div>
    ) : null;

    const opts = {
	    width: '90%',
	    height: '100%',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        }
    };
    const videoItem = work.links.Video ? (
      <div
        className={classnames(
          'c-project-details__video',
          'c-project-details__item'
        )}
      >
        <YouTube
            videoId={work.links.Video}
            opts={opts}
            onReady={this._onReady}
        />
      </div>
    ) : null;

    const abstractItem = work.abstract ? (
      <div
        className={classnames(
          'c-project-details__abstract',
          'c-project-details__item'
        )}
      >
        <h1>Abstract</h1>
        {work.abstract}
      </div>
    ) : null;

    const hwItems = work.hardware ? work.hardware.map((hw, i) => (
        <li>{hw}</li>
    )) : null;

    const hardwareItem = work.hardware ? (
      <div
        className={classnames(
          'c-project-details__hardware',
          'c-project-details__item'
        )}
      >
        <h1>Hardware</h1>
        <ul>
            {hwItems}
        </ul>
      </div>
    ): null;

    const softwareItem = work.software ? (
      <div
        className={classnames(
          'c-project-details__software',
          'c-project-details__item'
        )}
      >
        {work.software}
      </div>
    ) : null;

    // const { markdown } = this.props.markdown
    const descr = (
        <ReactMarkdown
            source={markdown} 
            escapeHtml={false}
        />
    );

    return (
      <div className='c-project-details'>
        <div className='c-project-details__front'>
          <div className='c-project-details__front-left'>
            {titleItem}
            {authorsItem}
            {booktitleItem}
            <div className="u-links">
              {linkItems}
            </div>
          </div>
          <div className='c-project-details__front-right'>
            {videoItem}
          </div>
        </div>
        <div className='c-project-details__description'>
            {abstractItem}
            {hardwareItem}
            {softwareItem}
            {descr}
        </div>
      </div>
    );
  }
}

export default (...props) => {
  const DATA_URL = '/public/data/iot-projects/' + props[0].match.params.projectId + '.json'
  const MARKDOWN_URL = '/public/data/iot-projects/' + props[0].match.params.projectId + '.md'
  return (
    <DataLoader json={DATA_URL} markdown={MARKDOWN_URL}>
      <ProjectDetails {...props} />
    </DataLoader>
  );
};
