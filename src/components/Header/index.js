import React from 'react';
import './styles.css';

const Header = () => {
  return(
    <div className="main-header">
      <a href="/tasks">Tarefas</a>
      <a href="/">Sorteacher</a>
      <a href="/studients">Alunos</a>
    </div>
  );
};

export default Header;