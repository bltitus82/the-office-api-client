import React from 'react';
import './App.css'
import Navbar from './body/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Body from './body/Body';
import Footer from './body/Footer';
import Characters from './components/Characters';
import Episodes from './components/Episodes';
import Likes from './components/Likes';
import Quotes from './components/Quotes';

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
            <Switch>
                        <Route exact path="/"><Quotes token={this.state.token} admin={this.state.admin} apiErr={this.state.apiErr} userID={this.state.userID} /></Route>
                        <Route exact path="/characters"><Characters token={this.state.token} admin={this.state.admin} apiErr={this.state.apiErr} userID={this.state.userID} /></Route>
                        <Route exact path="/episodes"><Episodes token={this.state.token} admin={this.state.admin} apiErr={this.state.apiErr} userID={this.state.userID} /></Route>
                        <Route exact path="/likes"><Likes token={this.state.token} admin={this.state.admin} apiErr={this.state.apiErr} userID={this.state.userID} /></Route>
                    </Switch>
                <Footer />
            {/* <Body token={this.state.token} apiErr={this.state.apiErr} admin={this.state.admin} userID={this.state.userID} /> */}
            </Router>
            </div>
        );
    }
}

export default App;