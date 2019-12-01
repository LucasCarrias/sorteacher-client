import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import api from '../../services/api';
import './styles.css';
import csv from 'csv';

export default class Main extends Component {
  renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive){
      return <p>Arraste o arquivo CSV aqui ou clique para fazer upload</p>
    }
    else {
      return (
        <p>Solte o arquivo aqui!</p>
      );
    }
  }

  onDrop = (e) =>{
    var dataToSend = { studientsList: [] }
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, async (err, data) => {
        data.map(aluno => dataToSend["studientsList"].push(aluno[0]));
        const response = await api.post('/studients', dataToSend);
        if (response.status === 200){ alert('Upload bem sucedido!');}
        else { alert('Upload mal sucedido.');}
      });
    };

    reader.readAsBinaryString(e[0]);
  }

  render(){
    return(
      <div className="main-page">
        <div className="actions">
          <Dropzone 
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onDrop={this.onDrop}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <div className="drop-container"
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
              >
                <input {...getInputProps()}/>
                {this.renderDragMessage(isDragActive)}
              </div>
            )}
          </Dropzone>
          <a href="/createTask">Criar Tarefa</a>
        </div>
      </div>
    );
  }
};