import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class CreateTask extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);

    data.set('deliveryDate', data.get('deliveryDate').split('/')[0]);
    data.set('presentationTime', parseInt(data.get('presentationTime')));

    var object = {}
    data.forEach((value, key) => {object[key] = value});
    const response = await api.post('/tasks', object);
    if (response.status === 200){
      alert('Tarefa cadastrada com sucesso!');
      document.getElementById("task-fields").reset();
    }
    else{ alert('Ops! Algo errado!'); }

    
  }

  render(){

    return(
      <div className="task-form">
        <h2>Nova tarefa</h2>
        <form id="task-fields" onSubmit={this.handleSubmit}>
          <input type="text" autoFocus name="title" id="title" placeholder="Digite o titulo" required/>
          <br/>
          <textarea cols="40" rows="10" name="description" id="description" placeholder="Digite a descrição" required></textarea>
          <p>Data de entrega: </p>
          <input type="date" name="deliveryDate" id="deliveryDate" placeholder="Data de entrega" required/>
          <br></br>
          <input type="number" name="presentationTime" id="presentationTime" placeholder="Minutos para apresentação" required/>
          <br/>
          <div className="actions">
            <button type="submit">Enviar</button>
            <a href="/tasks">Cancelar</a>
          </div>
        </form>
      </div>
    );
  }
};