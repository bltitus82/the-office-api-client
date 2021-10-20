import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/Input';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { ETIME } from 'constants';

type AuthProps = {
    updateToken(token: string): void,
    updateAdmin(admin: string): void,
    updateUserID(userID: number | string): void,
    logoff: () => void
}

type AuthState = {
    signup: boolean,
    email: string,
    password: string,
    userName: string,
    admin: boolean,
    errorText: string,
    profileErrorText: string,
    emailValid: boolean,
    pwValid: boolean,
    unValid: boolean,
    token: string,
    begErr: string,
    userID: string
}

export default class Auth extends React.Component<AuthProps, AuthState> {

    state = {
        signup: true,
        email: '',
        password: '',
        userName: '',
        admin: false,
        errorText: '',
        profileErrorText: '',
        emailValid: false,
        pwValid: false,
        unValid: false,
        token: '',
        begErr: 'We apologize, ',
        userID: '',
    }

    handleRegister = async () => {
        const signErr = 'there is already an account associated with this email address. Please login.'
        const userApiURL = 'http://localhost:3000/user/register';
        const userReqBody = {
            user: {
                email: this.state.email,
                password: this.state.password,
                userName: this.state.userName,
                userBio: '',
                imageURL: '',
                admin: false
            }
        }

        try {
            const userRes = await fetch(userApiURL, {
                method: "POST",
                body: JSON.stringify(userReqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const result = await userRes.json();
            const token = result.sessionToken;
            const tempUser = result.User
            this.props.updateToken(token);
            this.props.updateUserID(tempUser);
            console.log(result);
            console.log(this.state.userID);
            this.props.logoff();
            
            if (result.errors) {
                let errMsg = result.errors[0].message 
                this.setState({errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(result.errors[0].message)
            } 

        } catch (err) {
                alert(`${this.state.begErr}${signErr}`)
                console.log(err)
            }
}

    handleLogin = async () => {
        const logErr = 'the username or password is incorrect. Please try again.';
        const apiURL = 'http://localhost:3000/user/login';
        
        const reqBody = {
            user:{
                email: this.state.email,
                password: this.state.password
            }
        }

        console.log(this.state.email, this.state.password)

        try {
            const res = await fetch(apiURL, {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const json = await res.json();
            const token = json.sessionToken;
            this.props.updateToken(token);
            this.setState ({userID: json.user.id})
            console.log(json)
            this.props.logoff()

            if (json.errors) {
                let errMsg = json.errors[0].message
                this.setState({errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(json.errors[0].message)
            } 
        } catch (err) {
            alert(`${this.state.begErr}${logErr}`)
            console.log(err)
        }
    }

    handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const emailInput = document.getElementById('email') as HTMLInputElement;
        if (emailInput != null) {
            this.setState({
                email: e.target.value,
                emailValid: emailInput.checkValidity()
            })
        }
    }

    handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const pwInput = document.getElementById('password') as HTMLInputElement;
        if (pwInput != null){
            this.setState({
                password: e.target.value,
                pwValid: pwInput.checkValidity()
            })
        }
    }

    handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
        const unInput = document.getElementById('userName') as HTMLInputElement;
        if (unInput != null){
            this.setState({
                userName: e.target.value,
                // unValid: unInput.checkValidity()
            })
        }
    }

    render() {
        return(
            <Modal isOpen={true}>
                {this.state.signup ?
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box 
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        > <ModalHeader>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Create an Account
                            </Typography>
                            </ModalHeader>
                            <ModalBody>
                            <Box component="form" onSubmit={(e: { preventDefault: () => void; }) => {
                                e.preventDefault()
                                this.handleRegister()
                            }}
                            sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                // pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.handleEmail(e) }} 
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.handlePassword(e) }} 
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="userName"
                                label="User Name"
                                type="userName"
                                id="userName"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.handleUsername(e) }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => this.setState({signup: !this.state.signup})}>
                                {this.state.signup ? 'Need to Login?' : 'Need to Register?'}</Button>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => this.props.logoff()}>
                                CANCEL</Button>
                            </ModalBody>
                        </Box>
                </Container>
                : 
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box 
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                            <ModalHeader>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            </ModalHeader>
                            <ModalBody>
                            <Box component="form" onSubmit={(e: { preventDefault: () => void; }) => {
                                e.preventDefault()
                                this.handleLogin()
                            }}
                            sx={{ mt: 1 }}>
                            <div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({email: e.target.value}) }}
                            />
                            </div>
                            <div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({password: e.target.value}) }}
                            />
                            </div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => this.setState({signup: !this.state.signup})}>
                                {this.state.signup ? 'Need to Login?' : 'Need to Register?'}</Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => this.props.logoff()}>
                                CANCEL</Button>
                            </Box>
                            </ModalBody>
                        </Box>
                </Container>
                }
            </Modal>
        )
    }
}