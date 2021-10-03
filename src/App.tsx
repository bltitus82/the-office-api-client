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

type AppState = {
    sessionToken: string | null,
    admin: string | null,
    apiErr: string,
    profileID: number | string
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
            <Router>
                <Body />
            </Router>
            <Footer />
            </div> : <Auth updateToken={this.updateToken} clickLogout={this.clearToken} updateAdmin={this.updateAdmin} updateProfileID={this.updateProfileID} />
        )
    }
    render(){
        return(
            <div>
                {this.loggedInView()}
            </div>
        );
    }
}

export default App;