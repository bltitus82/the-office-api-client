import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Route,
    Link,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom';
import Quotes from '../components/Quotes';
import Characters from '../components/Characters';
import Episodes from '../components/Episodes';
import Likes from '../components/Likes';
import Auth from '../auth/Auth';
import Admin from '../auth/Admin';
import { BasicButton } from '../styling/styles';

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

    render(){
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Router>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <div>
                    <Link to="/quotes" ><h4 style={{justifySelf: 'center'}}><BasicButton> Quotes </BasicButton></h4></Link>
                    <Link to="/characters" ><h4 style={{justifySelf: 'center'}}><BasicButton> Characters </BasicButton></h4></Link>
                    <Link to="/episodes" ><h4 style={{justifySelf: 'center'}}><BasicButton> Episodes </BasicButton></h4></Link>
                    <Link to="/likes" ><h4 style={{justifySelf: 'center'}}><BasicButton> Likes </BasicButton></h4></Link>
                </div>
                <div>
                    <Router>
                    <Switch>
                        <Route exact path="/quotes"><Quotes token={this.state.token} admin={this.state.admin} apiErr={this.props.apiErr} userID={this.state.userID} /></Route>
                        <Route exact path="/characters"><Characters token={this.state.token} admin={this.state.admin} apiErr={this.props.apiErr} userID={this.state.userID} /></Route>
                        <Route exact path="/episodes"><Episodes /></Route>
                        <Route exact path="/likes"><Likes /></Route>
                    </Switch>
                    </Router>
                </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                The Office Hub
            </Typography>
            <Button color="inherit" onClick={e => {
                e.preventDefault()
                this.login()
            }}
            >Login</Button>
            {this.state.loggedIn ? 
            <Auth logoff={this.logoff} updateToken={this.updateToken} updateAdmin={this.updateAdmin} updateUserID={this.updateUserID} />  :
            <></> }
            </Toolbar>
            </Router>
        </AppBar>
        </Box>
    );
    }
}