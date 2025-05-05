import React from 'react';
import './Header.css';
import logo from "../../../assets/img/logo-no-background.png"

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h1 className="title">Banca En Línea</h1>
    </header>
  );
};

export default Header;
