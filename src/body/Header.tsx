import React from 'react';
import {
    HeaderStyle
}
from '../styling/styles'

type HeaderState = {
    title: string;
    quote: string;
};

export default class Header extends React.Component<{}, HeaderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            title: "The Office Quotes",
            quote: "Dwight, you ignorant slut!"
        }
    };

    render(){
        return(
            <HeaderStyle>
                <Header />
            </HeaderStyle>
        )
    }
}

