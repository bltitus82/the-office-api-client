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

type qProps = {
    userToken: string,
    apiErr: string
};

type qState = {
    quote: string,
    speaker: string,
};



export default class Body extends React.Component {


    render() {
        return(
            <div>

            </div>
        )
    }
}