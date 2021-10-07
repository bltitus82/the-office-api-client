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
import { BasicButton } from '../styling/styles';

type NavbarProps = {
    currentToken: string,
    admin: string,
    apiErr: string,
    profileID: number
}

export default class Navbar extends React.Component<NavbarProps, {}> {
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
                        <Route exact path="/quotes"><Quotes userToken={this.props.currentToken} admin={this.props.admin} apiErr={this.props.apiErr} profileID={this.props.profileID} /></Route>
                        <Route exact path="/characters"><Characters userToken={this.props.currentToken} admin={this.props.admin} apiErr={this.props.apiErr} profileID={this.props.profileID} /></Route>
                        <Route exact path="/episodes"><Episodes /></Route>
                        <Route exact path="/likes"><Likes /></Route>
                    </Switch>
                    </Router>
                </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
            </Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
            </Router>
        </AppBar>
        </Box>
    );
    }
}