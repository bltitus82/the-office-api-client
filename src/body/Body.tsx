import React from 'react'
import Quotes from '../components/Quotes';
import Characters from '../components/Characters';
import Episodes from '../components/Episodes';
import Likes from '../components/Likes';
import Header from './Header';
import Footer from './Footer';
import {
    Route,
    Switch
} from 'react-router-dom';

type bProps = {
    token: string,
    apiErr: string,
    admin: string,
    userID: string
};

type bState = {
    quote: string,
    speaker: string,
};

export default class Body extends React.Component<bProps, bState> {
    constructor(props: bProps){
        super(props)
        this.state = {
            quote: '',
            speaker: ''
        }
    }

    render() {
        return(
            <div>
                <Header />
                    <Switch>
                        <Route exact path="/"><Quotes token={this.props.token} admin={this.props.admin} apiErr={this.props.apiErr} userID={this.props.userID} /></Route>
                        <Route exact path="/characters"><Characters token={this.props.token} admin={this.props.admin} apiErr={this.props.apiErr} userID={this.props.userID} /></Route>
                        <Route exact path="/episodes"><Episodes token={this.props.token} admin={this.props.admin} apiErr={this.props.apiErr} userID={this.props.userID} /></Route>
                        <Route exact path="/likes"><Likes token={this.props.token} admin={this.props.admin} apiErr={this.props.apiErr} userID={this.props.userID} /></Route>
                    </Switch>
                <Footer />
            </div>
        )
    }
}