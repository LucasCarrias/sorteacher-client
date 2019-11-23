import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
  return(
    <div className="main-header">
      <a href="/tasks">Tarefas</a>
      <a href="/">Sorteacher</a>
    </div>
  );
};

export default Header;