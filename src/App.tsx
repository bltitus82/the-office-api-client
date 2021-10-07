import React from 'react';
import './App.css'
import Auth from './auth/Auth'
import Admin from './auth/Admin';
import Header from './body/Header';
import Footer from './body/Footer';
import Navbar from './body/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from './body/Body';
import { Switch, Route } from 'react-router-dom';
import Quotes from './components/Quotes';
import Characters from './components/Characters';
import Episodes from './components/Episodes';
import Likes from './components/Likes';

type AppState = {
    sessionToken: string | null,
    admin: string | null,
    apiErr: string,
    profileID: number | string
}

type NavbarProps = {
    currentToken: string,
    admin: string,
    apiErr: string,
    profileID: number
}
class App extends React.Component <{}, AppState>{
    state= {
        sessionToken: '',
        admin: '',
        apiErr: 'Oops! Please try again later. If this is a recurring error, please submit an issue on Github.',
        profileID: 0
    }

    componentDidMount = () => {
        if (localStorage.getItem('token')) {
            this.setState({sessionToken: localStorage.getItem('token')})
        }
        if (localStorage.getItem('admin')) {
            this.setState({sessionToken: localStorage.getItem('admin')})
        }
    }

    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        this.setState({sessionToken: newToken})
    }

    updateAdmin = (newAdmin: string) => {
        localStorage.setItem('admin', newAdmin);
        this.setState({admin: newAdmin})
    }

    clearToken = () => {
        localStorage.clear();
        this.setState({sessionToken: ('')})
        window.location.href = '/'
    }

    updateProfileID = (newProfileID: string) => {
        localStorage.setItem('profileID', newProfileID);
        this.setState({profileID: newProfileID})
    }

    loggedInView = () => {
        return(
            this.state.sessionToken === localStorage.getItem('token') ?
            <div>
            <Navbar currentToken={this.state.sessionToken} admin={this.state.admin} profileID={this.state.profileID} apiErr={this.state.apiErr} />
            <Header />
            
                <Body />
            
            <Footer />
            </div> : <Auth updateToken={this.updateToken} clickLogout={this.clearToken} updateAdmin={this.updateAdmin} />
        )
    }
    render(){
        return(
            <div>
            <Router>
            {/* <Navbar currentToken={this.state.sessionToken} admin={this.state.admin} profileID={this.state.profileID} apiErr={this.state.apiErr} />
            <Header />
            
                <Body />
            
            <Footer /> */}
                {this.loggedInView()}
                <div>
                    <Switch>
                        <Route exact path="/quotes"><Quotes userToken={this.state.sessionToken} admin={this.state.admin} apiErr={this.state.apiErr} profileID={this.state.profileID} /></Route>
                        <Route exact path="/characters"><Characters userToken={this.state.sessionToken} admin={this.state.admin} apiErr={this.state.apiErr} profileID={this.state.profileID} /></Route>
                        <Route exact path="/episodes"><Episodes /></Route>
                        <Route exact path="/likes"><Likes /></Route>
                        <Route exact path="/"><Auth updateToken={this.updateToken} clickLogout={this.clearToken} updateAdmin={this.updateAdmin} /></Route>
                    </Switch>
                </div>
            </Router>
            </div>
        );
    }
}

export default App;