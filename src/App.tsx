import React from 'react';
import './App.css'
import Auth from './auth/Auth'
import Admin from './auth/Admin';
import Header from './body/Header';
import Footer from './body/Footer';
import Sidebar from './body/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    SideStyle
} from './styling/styles';

type AppState = {
    sessionToken: string | null,
    admin: string | null,
    apiErr: string
}

class App extends React.Component <{}, AppState>{
    state= {
        sessionToken: '',
        admin: '',
        apiErr: 'Oops! Please try again later. If this is a recurring error, please submit an issue on Github.'
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

    loggedInView = () => {
        return(
            this.state.sessionToken === localStorage.getItem('token') ?
            <div>
            <Header />
            <Router>
                <SideStyle>
                    <Sidebar apiErr={this.state.apiErr} currentToken={this.state.sessionToken} clickLogout={this.clearToken} admin={this.state.admin} />
                </SideStyle>
            </Router>
            <Footer />
            </div> : <Auth updateToken={this.updateToken} clickLogout={this.clearToken} updateAdmin={this.updateAdmin} />
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