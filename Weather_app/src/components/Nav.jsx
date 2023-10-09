import React from 'react';
import { NavLink } from 'react-router-dom';
 
function Nav() {
    return (
        <>
            <nav className='navBox'>
                <ul className='navList'>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/login'>Log in page</NavLink></li>
                    <li><NavLink to='/register'>Register</NavLink></li>
                </ul>
            </nav>
        </>
   );
};

export default Nav