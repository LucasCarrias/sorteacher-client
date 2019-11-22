import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
  state = {};

  onChange(e){
    let files = e.target.files;
    console.log(files);
  }

  render(){
    return(
      <div className="main-page">
        <div className="actions">
          <label for="select-file">Selecione o CSV</label>
          <div onSubmit={this.getCSV}>
            <input id="select-file" type="file" accept=".csv" onChange={(e)=> this.onChange(e)} />
          </div>
          <a href="/tasks">Listar Tarefas</a>
        </div>
      </div>
    );
  }
};