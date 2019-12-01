import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Studients extends Component {
  state = {
    studientsList: []
  }

  async componentDidMount(){
    const response = await api.get('/studients');

    this.setState({ studientsList: response.data[0].studientsList });
  }

  render(){
    const { studientsList } = this.state;

    return(
      <div className="studients">
        {studientsList.map(studient => (
          <div className="line">
            {studient}
            <button>Deletar</button>
          </div>
        ))}
      </div>
    );
  };
}