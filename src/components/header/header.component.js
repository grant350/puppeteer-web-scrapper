import React from 'react';
import './style.scss'


const Header = function (props) {
  return <div className="header">
    login
    <div>total:${props.total}</div>
  </div>
}
export default Header;