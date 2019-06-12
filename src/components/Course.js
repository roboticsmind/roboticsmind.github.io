import classnames from 'classnames';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DataLoader from './DataLoader';
import ResearchTopic from './ResearchTopic';
import ProjectWork from './ProjectWork';

import listReactFiles from 'list-react-files'

const DATA_URL = '/public/data/iot-projects/iot-course.json';

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
    const sections = data.sections.map((section, i) => this.renderSection(section, i));
    return (
      <div className="c-teaching">
        {sections}
      </div>
    );
  }
}

export default (...props) => {
  return (
    <DataLoader json={DATA_URL}>
      <p>this.props.match.params.courseId</p>
      <Course {...props} />
    </DataLoader>
  );
};
