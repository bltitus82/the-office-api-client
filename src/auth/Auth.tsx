import React from 'react';
import {
    Container,
    Form,
    Button,
    ReverseButton,
    Input,
    AuthHeader,
    Label
} from '../styling/styles';

type AuthProps = {
    updateToken(token: string): void,
    clickLogout(): void,
    updateAdmin(admin: string): void,
    updateProfileID(profileID: string): void
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
    profileID: number,
    userID: number
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
        profileID: 0,
        userID: 0
    }

    handleSignup = async () => {
        const signErr = 'there is already an account associated with this email address. Please login using your existing credentials.'
        const userNameErr = 'this username is already taken. Please try again.'
        const userApiURL = 'http://localhost:3000/user/register';
        const profileApiURL = 'https://localhost:3000/profile/create';
        const userReqBody = {
            user: {
                email: this.state.email,
                password: this.state.password
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

            const json = await userRes.json();
            const token = json.sessionToken;
            this.props.updateToken(token);

            if (json.errors) {
                let errMsg = json.errors[0].message 
                this.setState({errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(json.errors[0].message)
            } else {

                const profileBody = {
                    profile: {
                        userName: this.state.userName,
                        admin: this.state.admin
                    },
                    userId: json.user.id
                }

                try {
                    const profileRes = await fetch(profileApiURL, {
                        method: "POST",
                        body: JSON.stringify(profileBody),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })

                    const profileJson = await profileRes.json();
                    this.setState({ profileID: profileJson.id })
                    
                    if (profileJson.errors) {
                        let profileErrMsg = profileJson.errors[0].message
                        this.setState({profileErrorText: profileErrMsg.charAt(0).toUpperCase() + profileErrMsg.slice(1) + '.'})
                        throw new Error(profileJson.errors[0].message)
                    }
                } catch (err) {
                    alert(`${this.state.begErr}${userNameErr}`)
                    console.log(err)
                }
            }
        } catch (err) {
            alert(`${this.state.begErr}${signErr}`)
            console.log(err)
        }
    }

    getProfileID = async () => {
        const profileURL = `http://localhost:3000/profile/user/${this.state.userID}`;

        try {
            const res = await fetch(profileURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.state.token}`
                }
            })

            const json = await res.json();
            this.setState ({profileID: json.id})
        } catch (err) {
            alert(`${this.state.begErr}`)
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

            this.getProfileID();

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
        const unInput = document.getElementById('username') as HTMLInputElement;
        if (unInput != null){
            this.setState({
                userName: e.target.value,
                unValid: unInput.checkValidity()
            })
        }
    }

    render() {
        return(
            <div>
                <AuthHeader>
                    <h1>The Office: All the Best Quotes</h1>
                    <br />
                    <h3>The most exhaustive collection of quotes from NBC's "The Office"</h3>
                </AuthHeader>
                    {this.state.signup ?
                    <Container>
                        <Form onSubmit={(e: { preventDefault: () => void; }) => {
                            e.preventDefault()
                            this.handleSignup()
                        }}>
                            <div>
                                <div>
                                    <Label htmlFor='email'>Email: </Label>
                                    <br />
                                    <Input type='email' id='email' name='email' title='Email address' required pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.handleEmail(e) }} />
                                </div>
                            </div>
                            <br />
                            <div>
                                <div>
                                    <Label htmlFor='password'>Password: </Label>
                                    <br />
                                    <Input type='password' id='password' name='password' title='Password must be between 8 and 16 characters, and contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.' required pattern='^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^+=]).*$' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.handlePassword(e) }} />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Label htmlFor='username'>Username: </Label>
                                    <br />
                                    <Input type='username' id='username' name='username' title='Please select a username' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.handleUsername(e) }} />
                                </div>
                            </div>
                            <br />
                            <Button type="button" onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Login' : 'Signup'}</Button>&nbsp;
                            <ReverseButton type="submit">{this.state.signup ? 'Signup' : 'Login'}</ReverseButton>
                        </Form>
                    </Container> :
                    <Container>
                        <Form onSubmit={(e: { preventDefault: () => void; }) => {
                            e.preventDefault()
                            this.handleLogin()
                        }}>
                            <div>
                                <div>
                                    <Label htmlFor='email'>Email: </Label>
                                    <br />
                                    <Input type='email' id='email' name='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({email: e.target.value}) }} title='Please enter your email address' required />
                                </div>
                            </div>
                            <br />
                            <div>
                                <div>
                                    <Label htmlFor='password'>Password: </Label>
                                    <br />
                                    <Input type='password' id='password' name='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({password: e.target.value}) }} title='Please enter your password' required />
                                </div>
                            </div>
                            <Button type='button' onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Login' : 'Signup'} </Button>&nbsp;
                            <ReverseButton type='submit'>{this.state.signup ? 'Signup' : 'Login'}</ReverseButton>
                        </Form>
                    </Container>
                }
            </div>
        )
    }
}