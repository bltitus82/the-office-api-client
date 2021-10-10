import React from 'react'
import Quotes from '../components/Quotes';
import Characters from '../components/Characters';
import Episodes from '../components/Episodes';
import Likes from '../components/Likes';
import {
    TD, 
    SmallButton,
    SmallReverseButton,
    MyH1
} from '../styling/styles';
import Header from './Header';
import Footer from './Footer';

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
                <Quotes token={this.props.token} admin={this.props.admin} apiErr={this.props.apiErr} userID={this.props.userID} />
                <Footer />
            </div>
        )
    }
}