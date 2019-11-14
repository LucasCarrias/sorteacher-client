import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Task extends Component {
  state = {
    task: {},
  };

  async componentDidMount(){
    const { id } = this.props.match.params;

    const response = await api.get(`/tasks/${id}`);

    this.setState({ task: response.data });
  }

  render(){
    const { task } = this.state;

    return (
      <div className="product-info">
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>{task.deliveryDate}</p>
        <p>{task.studients}</p>
      </div>
    );
  }
}