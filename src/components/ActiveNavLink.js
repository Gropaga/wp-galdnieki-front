import React from 'react'
import { Link, Route } from 'react-router-dom'

const NavItem = ({ label, to, activeOnlyWhenExact }) => {

    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({match}) => (
            <div className={match ? 'nav-item active' : 'nav-item'}>
                {match ? '> ' : ''}
                <Link to={to}>{label}</Link>
                {console.log(label)}
            </div>
        )}/>
    );
};

export default NavItem;