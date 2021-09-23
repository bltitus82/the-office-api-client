import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import styled from 'styled-components';



class SideNav extends Component {
    render() {
        return (
            <ProSidebar>
            <Menu iconShape="square">
                <MenuItem icon={''}>Dashboard</MenuItem>
                <SubMenu title="Components" icon={''}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
            </SubMenu>
            </Menu>
            </ProSidebar>
    )
    }
}

export default SideNav;