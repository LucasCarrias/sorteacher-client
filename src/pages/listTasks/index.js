import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class ListTasks extends Component {
  state = {
    tasks: [],
    taskInfo: {},
    page: 1,
  };

  componentDidMount(){
    this.loadTasks();
  };

  loadTasks = async (page = 1) => {
    const response = await api.get(`/tasks?page=${page}`);

    const { docs, ...taskInfo } = response.data;

    this.setState({ tasks: docs, taskInfo, page });
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) { return; }

    const pageNumber = page - 1;
    this.loadTasks(pageNumber);
  };

  nextPage = () => {
    const { page, taskInfo } = this.state;

    if (page === taskInfo.pages) { return; }

    const pageNumber = page + 1;
    this.loadTasks(pageNumber);
  };

  deleteTask = async(_id) =>{
    const response = await api.delete(`/tasks/${_id}`);
    const { page } = this.state;

    if (response.status == 200){
      alert('Tarefa exlcuída.');
      this.loadTasks(page);
    }
    else{
      alert('Algo deu errado.');
    }
  };


  render(){
    const { tasks, page, taskInfo } = this.state;

    return(
      <div className="task-list">
        {tasks.map(task => (
          <div className="task" key={task._id}>
            <strong>{task.title}</strong>
            <p className="description">{task.description}</p>
            <p>Data de entrega: {task.deliveryDate.slice(0, 10)}</p>
            <p>Tempo para apresentação: {task.presentationTime} minutos</p>
            <p> Alunos atribuidos: </p>
            <ol>
              {task.studients.map(studient => (
                <li>{studient}</li>
              ))} 
            </ol>
            <div className="task-actions">
              <a href={`/tasks/${task._id}`}>Editar</a>
              <button onClick={() => {this.deleteTask(task._id)}}>Excluir</button>
            </div>
          </div>
        ))}
        <div className="actions">
          <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page===taskInfo.pages} onClick={this.nextPage}>Próximo</button>
        </div>
      </div>
    );
  };
};