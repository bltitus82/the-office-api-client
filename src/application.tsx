import React from 'react';
import AccountManager from './components/accounts';
import Navbar from './components/navbar/navigationbar';
import SideNav from './components/sidebar/SideNav';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = props => {
    return (
        <div className="App">
            <Navbar />
            <SideNav />
            <AccountManager />
        </div>
    )
}

export default Application;