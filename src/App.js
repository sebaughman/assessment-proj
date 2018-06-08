import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AssessmentList from './views/AssessmentList/AssessmentList';
import Wizard from './views/Wizard/Wizard';
import SplashPage from './views/SplashPage/SplashPage';
import Submitted from './views/Submitted/Submitted';
import CodeEditor from './components/CodeEditor/CodeEditor';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={ SplashPage } />
          <Route path='/assessments' component={ AssessmentList }/>.
          <Route path='/wizard/:email/:assessmentID/:questionNumber' component={ Wizard }/> 
          <Route path='/confirmation' component = { Submitted } />
        </Switch>
      </Router>
    );
  }
}

export default App;
