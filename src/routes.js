import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import ListTasks from './pages/listTasks';
import Task from './pages/task';
import CreateTask from './pages/createTask';
import Studients from './pages/studients';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/tasks/:id" component={Task} />
      <Route path="/tasks/" component={ListTasks} />
      <Route path="/createTask" component={CreateTask} />
      <Route path="/studients" component={Studients} />


    </Switch>
  </BrowserRouter>
);

export default Routes;