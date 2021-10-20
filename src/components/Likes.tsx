import React from 'react';

type Props = {
    token: string | null
    admin: string | null
    apiErr: string,
    userID: string | null
}

type State = {
    
}

export default class Likes extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {

        };
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}