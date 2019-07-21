import classnames from 'classnames';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DataLoader from './DataLoader';
import MarkdownLoader from './MarkdownLoader';
import ResearchTopic from './ResearchTopic';
import ProjectWork from './ProjectWork';

import listReactFiles from 'list-react-files'

import ReactMarkdown from 'react-markdown';

class Course extends Component {

  renderSection(section, i) {
    const { topicMap } = this.state;
    const projects = category.projects.filter(work => this.isWorkVisible(work));
    const workItems = projects.map((project, i) => (
      <DataLoader json={BASE_URL+project}>
        <ProjectWork
          key={i}
          topicMap={topicMap}
          isLinkVisible={true}
        />
      </DataLoader>
    ));
    return (
      <div
        key={i}
        className="c-teaching__category"
      >
        <div className="c-teaching__category-title">
          {section.title}
        </div>
        <div className="c-teaching__work-list">
          {workItems}
        </div>
        <div className="c-teaching__resources-list">
          {resourcesList}
        </div>
      </div>
    );
  }

  render() {
    const { data } = this.props;
    //const DATA_URL = '/public/data/' + data.courseId + '.json';
    //const sections = data.sections.map((section, i) => this.renderSection(section, i));
    //return (
    //  <div className="c-teaching">
    //    <p>this.props.match.params.courseId</p>
    //    {sections}
    //  </div>
    //);
    // const React = require('react')
    // const ReactDOM = require('react-dom')
    // const ReactMarkdown = require('react-markdown')
    // const input = '# This is a header\n\nAnd this is a paragraph'
    // render(<ReactMarkdown source={input} />, document.getElementById('container'))
    console.log(data)
    return (
      <div className="c-teaching">
         <ReactMarkdown source={data} />
      </div>
    );
  }
}

export default (...props) => {
  // const DATA_URL = '/public/data/iot-projects/' + props[0].match.params.courseId + '.json';
  const DATA_URL = '/public/data/iot-projects/guessless.md';
  return (
    <MarkdownLoader markdown={DATA_URL}>
      <Course {...props} />
    </MarkdownLoader>
  );
};
