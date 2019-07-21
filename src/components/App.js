import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Members from './Members';
import NotFound from './NotFound';
import Research from './Research';
import Teaching from './Teaching';
import Partners from './Partners';
import Donate from './Donate';
import Course from './Course';
import ProjectDetails from './ProjectDetails';
import Links from './Links';
import LocationTracker from './LocationTracker';

// TODO remove this
import Project from './Project';

export default class App extends Component {
  render() {
    return (
      <div className="c-app u-container">
        <LocationTracker location={this.props.location} />
        <Header />
        <div className="c-app__body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/members" component={Members} />
            <Route path="/research" component={Research} />
            <Route path="/teaching" component={Teaching} />
            <Route path="/partners" component={Partners} />
            <Route path="/donate" component={Donate} />
            <Route path="/links" component={Links} />
            <Route path="/contact" component={Contact} />
            <Route path="/project" component={Project} />
            <Route exact path="/projectDetails/:projectId" component={ProjectDetails} />
            <Route exact path="/course/:courseId" component={Course} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
