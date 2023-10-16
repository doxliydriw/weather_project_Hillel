import React from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_CHANGE } from '../store/slice';
 

function Nav() {
    const loginStatus = useSelector(state => state.data.loggedIn)
                const dispatch = useDispatch();
                const [auth, setAuth] = React.useState(loginStatus);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();


    const handleChange = (event) => {
                    dispatch(LOGIN_CHANGE(!auth));
                    setAuth(!auth);
                    // console.log(loginStatus);
                };

                const handleMenu = (event) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                    setAnchorEl(null);
                };

                return (
                    <Box sx={{ flexGrow: 1 }}>
                        
                                <FormGroup>
                                    <FormControlLabel
                                    control={
                                        <Switch
                                        checked={auth}
                                        onChange={handleChange}
                                        aria-label="login switch"
                                        />
                                    }
                                    label={auth ? 'Logout' : 'Login'}
                                    />
                        </FormGroup>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <AppBar position="static">
                            
                                <Toolbar>
                                    <Grid item xs={1}>
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                            sx={{ mr: 2 }}
                                            onClick={() => (navigate('/'))}
                                            >
                                                <MenuIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        <h2>This is a weather application</h2>
                                        </Typography>
                                    </Grid>
                                     <Grid item xs={2}>
                                                {!auth && (
                                                <Stack direction="column" spacing={2}>
                                                        <NavLink to='/login'><Button variant="contained">Log in page</Button></NavLink>
                                                        <NavLink to='/register'><Button variant="contained">Register</Button></NavLink>
                                                </Stack>
                                                )}
                                                {auth && (
                                                    <div>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="account of current user"
                                                            aria-controls="menu-appbar"
                                                            aria-haspopup="true"
                                                            onClick={handleMenu}
                                                            color="inherit"
                                                        >
                                                            <AccountCircle />
                                                        </IconButton>
                                                                    <Menu
                                                                    id="menu-appbar"
                                                                    anchorEl={anchorEl}
                                                                    anchorOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'right',
                                                                    }}
                                                                    keepMounted
                                                                    transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'right',
                                                                    }}
                                                                    open={Boolean(anchorEl)}
                                                                    onClose={handleClose}
                                                                    >
                                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                                                    </Menu>
                                                    </div>
                                        )}
                                        </Grid>
                                </Toolbar>
                                 
                                </AppBar>
                           </Grid>
                    </Box>
                );
};

export default Nav