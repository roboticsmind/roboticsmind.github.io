import classnames from 'classnames';
import React, { useRef, useEffect, Component } from 'react'
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import DataLoader from './DataLoader';
import ReactMarkdown from 'react-markdown/with-html'
import TableOfContents from '../components/tableOfContents';
import { ReactDOM } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


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
      toc,
    } = this.props;

    const work = data

    const links = work.links || {};
    const linkItems = isLinkVisible ? Object.keys(links).map((key, i) => (
      <a
        key={key}
        href={ key==="Video" ? `https://www.youtube.com/watch?v=${links[key]}` : links[key]}
        className={classnames(
            "u-links__link",
            links[key] == "" ? "u-links__inactive" : "u-links__active"
        )}
        target=""
        onClick={() => this.handleLinkClick(`${work.title}::${key}`)}
      >
        {key}
      </a>
    )) : null;

    console.log(work);
    const titleItem = work.meta.title[0] ? (
      <div
        className={classnames(
          'c-project-details__title',
          'c-project-details__item'
        )}
      >
        {work.meta.title} {this.renderTopicTagsItem()}
      </div>
    ) : null;

    const authorsSeperatedWithCommas = 
        // Credit: https://stackoverflow.com/a/40276830/3441514
        data.meta.member_name.map((author, i) =>
            <span key={i}>
                {i > 0 && ", "}
                {author}
            </span>)
    const authorsItem = work.meta.member_name ? (
      <div
        className={classnames(
          'c-project-details__authors',
          'c-project-details__item'
        )}
      >
        {authorsSeperatedWithCommas}
      </div>
    ) : null;

    // const booktitleItem = work.booktitle ? (
    //   <div
    //     className={classnames(
    //       'c-project-details__booktitle',
    //       'c-project-details__item'
    //     )}
    //   >
    //     {work.booktitle}
    //   </div>
    // ) : null;

    const opts = {
	    width: '90%',
	    height: '100%',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        }
    };
    const videoItem = work.meta.video[0] ? (
      <div
        className={classnames(
          'c-project-details__video',
          'c-project-details__item'
        )}
      >
        <YouTube
            videoId={work.meta.video[0]}
            opts={opts}
            onReady={this._onReady}
        />
      </div>
    ) : null;

    const abstractItem = work.meta.summary ? (
      <div
        className={classnames(
          'c-project-details__abstract',
          'c-project-details__item'
        )}
      >
        <h2 id="abstract">Abstract</h2>
        {work.meta.project_summary}
      </div>
    ) : null;

    const summary = work.meta.summary ? (
      <div
        className={classnames(
          'c-project-details__summary',
          'c-project-details__item'
        )}
      >
        <h2 id="summary">Summary</h2>
        { ReactHtmlParser(work.meta.summary) }
      </div>
    ) : null;

    const problem_definition = work.meta.problem_definition ? (
      <div
        className={classnames(
          'c-project-details__problem_definition',
          'c-project-details__item'
        )}
      >
        <h2 id="problem_definition">Problem Definition</h2>
        { ReactHtmlParser(work.meta.problem_definition) }
      </div>
    ) : null;

    const challenges_motivation = work.meta.challenges_motivation ? (
      <div
        className={classnames(
          'c-project-details__challenges_motivation',
          'c-project-details__item'
        )}
      >
        <h2 id="challenges_motivation">Challenges and Motivation</h2>
        { ReactHtmlParser(work.meta.challenges_motivation) }
      </div>
    ) : null;

    const real_and_complete_usecases = work.meta.real_and_complete_usecases ? (
      <div
        className={classnames(
          'c-project-details__real_and_complete_usecases',
          'c-project-details__item'
        )}
      >
        <h2 id="real_and_complete_usecases">Real and Complete Usecases</h2>
        { ReactHtmlParser(work.meta.real_and_complete_usecases) }
      </div>
    ) : null;


    // const hwItems = work.hardware ? work.hardware.map((hw, i) => (
    //     <li>{hw}</li>
    // )) : null;

    // const hardwareItem = work.hardware ? (
    //   <div
    //     className={classnames(
    //       'c-project-details__hardware',
    //       'c-project-details__item'
    //     )}
    //   >
    //     <h1>Hardware</h1>
    //     <ul>
    //         {hwItems}
    //     </ul>
    //   </div>
    // ): null;

    // const softwareItem = work.software ? (
    //   <div
    //     className={classnames(
    //       'c-project-details__software',
    //       'c-project-details__item'
    //     )}
    //   >
    //     {work.software}
    //   </div>
    // ) : null;

    // // const { markdown } = this.props.markdown
    // const generateId = () => {
    //   let i = 0;
    //   return (prefix = '') => {
    //     i += 1;
    //     return `${prefix}-${i}`;
    //   };
    // };
    // const descr = (
    //     <ReactMarkdown
    //         source={markdown} 
    //         escapeHtml={false}
    //         components={{
    //           em: ({node, ...props}) => {
    //             return <i style={{ color: 'red' }} {...props} />;
    //           },  // TODO: ne fonctionne pas
    //           h2: 'p', // TODO: mapping from h2 elements to h1 elements is not working
    //           //h1: ({node, ...props}) => <h2 className={{generateId}} {...props} />
    //         }}
    //     />
    // );

    // console.log("reactmarkdown:", descr);

    



    // Initialized a hook to hold the reference to the title div.
    //const toc = useRef();
  
    //useEffect(function () {
    //  setTimeout(() => {
    //    toc.current.textContent = <TableOfContents />
    //  }, 2000); // Update the content of the element after 2seconds
    //}, []);


    return (
      <div className='c-project-details'>
        <div className='c-project-details__front'>
          <div className='c-project-details__front-left'>
            {titleItem}
            {authorsItem}
            <div className="u-links">
              {linkItems}
            </div>
          </div>
          <div className='c-project-details__front-right'>
            {videoItem}
          </div>
        </div>
        <div>
          <div className='c-project-details__description'>
            <TableOfContents />
            {abstractItem}
            {summary}
            {problem_definition}
            {challenges_motivation}
            {real_and_complete_usecases}
            <h2 id="hardware">Hardware</h2>
            <h2 id="software">Software</h2>
          </div>
        </div>
      </div>
    );
  }
}


export default (...props) => {
  // const DATA_URL = '/public/data/iot-projects/' + props[0].match.params.projectId + '.json'
  const DATA_URL = 'https://iot.m3la.org/wp-json/wp/v2/project/'+"457" //+ props[0].match.params.projectId
  const MARKDOWN_URL = '/public/data/iot-projects/' + props[0].match.params.projectId + '.md'

    //const descr = (
    //    <ReactMarkdown
    //        source={MARKDOWN_URL} 
    //        escapeHtml={false}
    //        components={{
    //          h2: 'h1', // TODO: mapping from h2 elements to h1 elements is not working
    //          //h1: ({node, ...props}) => <h2 className={{generateId}} {...props} />
    //        }}
    //    />
    //);

    //console.log("reactmarkdown:", descr);
  
    // Initialized a hook to hold the reference to the title div.
    //const toc = useRef({});
  
    //useEffect(() => {
    //  setTimeout(() => {
    //    console.log("hello")
    //    toc.current = <TableOfContents />
    //    console.log(toc.current)
    //  }, 4000); // Update the content of the element after 2seconds
    //}, []);
 
  return (
    <div className="c-project-details">
    <DataLoader json={DATA_URL} markdown={MARKDOWN_URL}>
      <ProjectDetails {...props} />
    </DataLoader>
    </div>
  );
};
