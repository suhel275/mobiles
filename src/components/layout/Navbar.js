import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>{title}</h1>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Mobile Selling App'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

export default Navbar;
