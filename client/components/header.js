import React from 'react';
import ReactDom from 'react-dom';

const Header = () => {
  return (
    <nav className="nav navbar-default">
      <div className="navbar-header">
        <a href="/" className="navbar-brand">
          Emoji Link Shortener
        </a>
      </div>
    </nav>
  );
}

export default Header;
