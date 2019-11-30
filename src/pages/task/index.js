import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Task extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  state = {
    task: {},
  };

  async componentDidMount(){
    const { id } = this.props.match.params;

    const response = await api.get(`/tasks/${id}`);

    this.setState({ task: response.data });
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);

    data.set('deliveryDate', data.get('deliveryDate').split('/')[0]);
    data.set('presentationTime', parseInt(data.get('presentationTime')));

    var object = {}
    data.forEach((value, key) => {object[key] = value});
    const response = await api.put(`/tasks/${data.get('_id')}`, object);
    if (response.status === 200){
      alert('Tarefa atualizada com sucesso!');
      window.location.href="/tasks";
    }
    else{ alert('Ops! Algo errado!'); }
    
  }

  render(){
    const { task } = this.state;

    return (
      <div className="task-form">
      <h2>Editar tarefa</h2>
      <form id="task-fields" onSubmit={this.handleSubmit}>
        <input className="invisibles" type="text" name="_id" id="_id" value={task._id}/>
        <input type="text" autoFocus name="title" id="title" defaultValue={task.title} placeholder="Digite o titulo" required/>
        <br/>
        <textarea cols="40" rows="10" name="description" id="description" placeholder="Digite a descrição" defaultValue={task.description} required></textarea>
        <p>Data de entrega: </p>
        <input type="date" name="deliveryDate" id="deliveryDate" required/>
        <br></br>
        <input type="number" name="presentationTime" id="presentationTime" placeholder="Minutos para apresentação" defaultValue={task.presentationTime} required/>
        <br/>
        <div className="actions">
          <button type="submit">Enviar</button>
          <a href="/tasks">Cancelar</a>
        </div>

      </form>
      </div>
    );
  }
}