import React from 'react';
import Navbar from './components/navbar/navigationbar';


export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = props => {
    return (
        <div className="App">
            <Navbar />
        </div>
    )
}

export default Application;