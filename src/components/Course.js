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

  render() {
    const { data } = this.props;

    function table(props) {
        console.log('hi I am mark')
        return <table className="c-teaching-details__table">{props.children}</table>
    }

    console.log(data)
    return (
      <div className="c-teaching-details">
         <ReactMarkdown
            source={data} 
            renderers={{ table: table }}
        />
      </div>
    );
  }
}

export default (...props) => {
  const DATA_URL = '/public/data/' + props[0].match.params.courseId + '.md';
  return (
    <MarkdownLoader markdown={DATA_URL}>
      <Course {...props} />
    </MarkdownLoader>
  );
};
