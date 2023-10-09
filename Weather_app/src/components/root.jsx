import React from 'react';
import Nav from './nav';
import { Outlet } from 'react-router-dom';
 
function Root() {
    return (
        <div className='container'>
            <Nav />
            <main>
                <Outlet/>
            </main>
        </div>
   );
};

export default Root