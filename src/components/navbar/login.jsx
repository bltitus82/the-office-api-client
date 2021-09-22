import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
`;

const LoginButton = styled.button`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    margin: 5px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border-radius: 20px;
    background-color: #6adf76;
    background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
    transition: all 200ms ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #00c9ff;
    }
`;

const SignupButton = styled.button`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    margin: 5px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border-radius: 20px;
    background-color: #6adf76;
    background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
    transition: all 200ms ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #00c9ff;
    }
`;


export default function Login(props) {
    return (
        <LoginContainer>
            <LoginButton>Login</LoginButton>
            <SignupButton>Register</SignupButton>
        </LoginContainer>
    )

}