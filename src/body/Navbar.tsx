import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Auth from '../auth/Auth';
import Admin from '../auth/Admin';
import { SmallButton } from '../styling/styles';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type NavbarProps = {
    token: string | null
    admin: string | null
    apiErr: string
}

type NavbarState = {
    loggedIn: boolean
    userID: string | null
    token: string | null
    admin: string | null
}

const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        },
    }));

export default class Navbar extends React.Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props)
        this.state = {
            loggedIn: false,
            userID: null,
            token: '',
            admin: '',
        }
    }
    
    login = (): void => {
        this.setState({ loggedIn: true })
    }
    
    logoff = (): void => {
        this.setState({ loggedIn: false })
    }

    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        this.setState({token: newToken})
    }

    updateAdmin = (newAdmin: string) => {
        localStorage.setItem('admin', newAdmin);
        this.setState({admin: newAdmin})
    }

    clearToken = () => {
        localStorage.clear();
        this.setState({token: ('')})
        window.location.href = '/'
    }

    updateUserID = (newUserID: string) => {
        localStorage.setItem('userId', newUserID);
        this.setState({userID: newUserID})
    }

    createQuote = () => {

    }

    viewProfile = () => {

    }

    render(){
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <Link to="/" ><h4 style={{justifySelf: 'center'}}> Quotes </h4></Link>
                    <Link to="/characters" ><h4 style={{justifySelf: 'center'}}> Characters </h4></Link>
                    <Link to="/episodes" ><h4 style={{justifySelf: 'center'}}> Episodes </h4></Link>
                    {/* <Link to="/likes" ><h4 style={{justifySelf: 'center'}}> Likes </h4></Link> */} 
                </IconButton>   

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                The Office Hub
            </Typography>
            
            {/* {this.state.token ?  */}
            <div>
            <Button color="inherit" title="Add a quote"
            onClick={e => {
                e.preventDefault()
                this.createQuote()
            }}><AddIcon /></Button>
            
            <Button color="inherit" title="My Account"
            onClick={e => {
                e.preventDefault()
                this.viewProfile()
            }}><AccountCircleIcon /></Button>
            
            <Button color="inherit" title="Logout"
            onClick={e => {
                e.preventDefault()
                this.logoff()
            }}><LogoutIcon /></Button>
            </div>
            {/* : <div>
                <Button color="inherit" onClick={e => {
                e.preventDefault()
                this.login()
            }} title="Login or Signup"
            ><LoginIcon /></Button> 
            {this.state.loggedIn ? 
            <Auth logoff={this.logoff} updateToken={this.updateToken} updateAdmin={this.updateAdmin} updateUserID={this.updateUserID} /> 
            : <></> }
            </div>
        } */}
            </Toolbar>
        </AppBar>
        </Box>
            
    );
    }
}