import React from 'react';
import Nav from './nav';
import { Outlet } from 'react-router-dom';
import LeftSideBar from './leftSideBar';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
 
function Root() {
    return (
             <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <Nav />
                        </Grid>    
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={3}>
                                <LeftSideBar />
                            </Grid>
                            <Grid item xs={9} rowGap={3}>
                                            <div>
                                                <Outlet/>
                                            </div>
                            </Grid> 
                        </Grid>
                </Grid>
            </Box>
   );
};

export default Root