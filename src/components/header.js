import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Container } from 'reactstrap';

class Header extends Component {

	render() {

		return (
		 <div className="navigation" fluid={true}>
      <div className="nav-container-left">
        <p className="nav-title"> Best Blog Ever </p>
      </div>
      <div className="nav-container-right">
			 <a className="link-item" href="https://github.com/cjb312/blog/tree/blancooo"> Github </a>
			 <Link className="link-item" to="/posts/new"> Add A Post </Link>
			 <Link className="link-item" to="/"> Home </Link>
      </div>
		 </div>
		);
	}
}

export default Header;
