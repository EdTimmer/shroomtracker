import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Signout from '../components/Auth/Signout';

const Navbar = ({ session }) => (
    <nav>
        {
            session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />
        }
    </nav>
);

const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to="/locations">Locations</NavLink>
            </li>
            <li>
                <NavLink to="/sightings">Sightings</NavLink>
            </li>
            <li>
                <NavLink to="/mushrooms">Mushrooms</NavLink>
            </li>
            <li>
                <NavLink to="/selectlocation">Add Sighting</NavLink>
            </li>
            <li>
                <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
                <Signout username={session.getCurrentUser.username} />
            </li>
        </ul>
        

    </Fragment>
);

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact >Home</NavLink>
        </li>
        <li>
            <NavLink to="/signin">Signin</NavLink>
        </li>
        <li>
            <NavLink to="/signup">Signup</NavLink>
        </li>
    </ul>
)

export default Navbar;
