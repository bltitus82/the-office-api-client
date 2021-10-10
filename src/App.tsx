import React from 'react';
import './App.css'
import Navbar from './body/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from './body/Body';

type AppState = {
    token: string | null,
    admin: string | null,
    apiErr: string,
    userID: string | null
}

class App extends React.Component <{}, AppState>{
    state= {
        token: '',
        admin: '',
        apiErr: 'Oops! Please try again later. If this is a recurring error, please submit an issue on Github.',
        userID: '',
    }

    componentDidMount = () => {
        if (localStorage.getItem('token')) {
            this.setState({token: localStorage.getItem('token')})
        }
        if (localStorage.getItem('admin')) {
            this.setState({admin: localStorage.getItem('admin')})
        }
        if (localStorage.getItem('userId')) {
            this.setState({userID: localStorage.getItem('userId')})
        }
    }

    render(){
        return(
            <div>
            <Router>
            <Navbar token={this.state.token} admin={this.state.admin} apiErr={this.state.apiErr} />
            <Body token={this.state.token} apiErr={this.state.apiErr} admin={this.state.admin} userID={this.state.userID} />
            </Router>
            </div>
        );
    }
}

export default App;