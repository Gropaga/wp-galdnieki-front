import React from 'react'
import { Link } from 'react-router-dom'
import ActiveNavLink from './ActiveNavLink';

const NavBar = () => (
    <nav className="navbar navbar-light">
        <Link to="/">Home</Link>
        <Link to="/hello">Hello</Link>
        <Link to="/counter">Counter</Link>
    </nav>
);

const Nav = (pathname) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/">Galdnieki.lv</Link>
            <button className="navbar-toggler" type="button"
                    data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">

            </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <ActiveNavLink className="nav-link" to="/">Home <span
                            className="sr-only">(current)</span></ActiveNavLink>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/hello">Hello</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/counter">Counter</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Nav;