import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Auth from '../auth/Auth';
import Admin from '../auth/Admin';
import { SmallButton } from '../styling/styles';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import APIURL from '../helpers/environment';
import {NavbarColors} from '../styling/styles';
import { createTheme } from '@mui/material/styles';
import Nav from 'react-bootstrap/Nav';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#424242',
            darker: '#424242',
        },
        neutral: {
            main: '#FE9B25',
            contrastText: '#FFC300',
        },
    },
});

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: React.CSSProperties['color'];
        };
    }

    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
    }

    interface PaletteColor {
        darker?: string;
    }
    interface SimplePaletteColorOptions {
        darker?: string;
    }
    interface ThemeOptions {
        status: {
            danger: React.CSSProperties['color'];
        };
    }
}

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
        <div>
            <Nav activeKey='/' style={{ backgroundColor: 'dimgrey'}}>
                <Nav.Item>
                    <Nav.Link href="/" style={{ fontFamily: 'monospace', color: 'orange' }}>Quotes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/characters" style={{ fontFamily: 'monospace', color: 'orange' }}>Characters</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/episodes" style={{ fontFamily: 'monospace', color: 'orange' }}>Episodes</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ margin: "auto" }}>
                    <h2 style={{ fontFamily: "monospace", color: 'whitesmoke', fontWeight: 'bolder'}}>The Office Quotes</h2>
                </Nav.Item>
                <Nav.Item style={{}}>
                <div> 
                    <Button color="inherit" onClick={e => {
                    e.preventDefault()
                    this.login()
                    }} title="Login or Signup"
                    ><LoginIcon /></Button> 
                    {this.state.loggedIn ? 
                    <Auth logoff={this.logoff} updateToken={this.updateToken} updateAdmin={this.updateAdmin} updateUserID={this.updateUserID} /> 
                    : <></> }
                    </div>
                </Nav.Item>
            </Nav>
            </div>
        // <Box sx={{ flexGrow: 1 }}>
        // <NavbarColors>
        //     <AppBar position="static">
        //     <Toolbar>
        //         <Stack direction="row" spacing={2}>
        //             <Button color="info" href="/">Quotes</Button>
        //             <Button color="secondary" href="/characters">Characters</Button>
        //             <Button color="secondary" href="/episodes">Episodes</Button>
        //             {/* <Button href="/likes">Likes</Button> */}
        //         </Stack>
      
        //     <Typography variant="h2" component="div" sx={{ flexGrow: 1 }} align="center" fontFamily="monospace">
        //         The Office Quotes
        //     </Typography>
            
        //     {/* {this.state.token ?  */}
        //     {/* <div>
        //     <Button color="inherit" title="Add a quote"
        //     onClick={e => {
        //         e.preventDefault()
        //         this.createQuote()
        //     }}><AddIcon /></Button>
            
        //     <Button color="inherit" title="My Account"
        //     onClick={e => {
        //         e.preventDefault()
        //         this.viewProfile()
        //     }}><AccountCircleIcon /></Button>
            
        //     <Button color="inherit" title="Logout"
        //     onClick={e => {
        //         e.preventDefault()
        //         this.logoff()
        //     }}><LogoutIcon /></Button>
        //     </div>
        //     :*/} 
        //     <div> 
        //         <Button color="inherit" onClick={e => {
        //         e.preventDefault()
        //         this.login()
        //     }} title="Login or Signup"
        //     ><LoginIcon /></Button> 
        //     {this.state.loggedIn ? 
        //     <Auth logoff={this.logoff} updateToken={this.updateToken} updateAdmin={this.updateAdmin} updateUserID={this.updateUserID} /> 
        //     : <></> }
        //     </div>
        
        //     </Toolbar>
        // </AppBar>
        // </NavbarColors>
        // </Box>
            
    );
    }
}