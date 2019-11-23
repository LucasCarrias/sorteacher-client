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
      return <p>Solte o arquivo aqui!</p>
    }
  }
  onDrop = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        data.map(aluno => console.log(aluno[0]));
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
                <input {...getInputProps()} />
                {this.renderDragMessage(isDragActive)}
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
};