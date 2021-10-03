import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from "react-bootstrap";

type UserRegisterProps = {
  updateToken: (newToken: string, role: string) => void
}

type UserRegisterState = {
  validated: boolean,
  email: string,
  password: string,
  userName: string
}

class UserRegister extends Component<UserRegisterProps, UserRegisterState> {
  constructor(props: UserRegisterProps) {
    super(props)
    this.state = {
      validated: false,
      email: '',
      password: '',
      userName: ''
    }
  }

  handleFetch = (): void => {
    const { email, password, userName } = this.state
    if (email && password && userName) {
      fetch('http://localhost:3000/user/register', {
        method: 'POST',
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password
          }
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      })
      fetch('https://localhost:3000/profile/create', {
          method: 'POST',
          body: JSON.stringify({
            profile: {
              userName: this.state.userName
            }
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
          })
        })
        .then((res) => res.json())
        .then((data) => {
          this.props.updateToken(data.sessionToken, data.user.Role)
          this.setState({
            email: '',
            password: ''
          })
        })
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ validated: true });
    this.handleFetch();
  };
  
  render() {
    return (
      <Container>
        <Row>
          <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
            <Row>
              <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom03'>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <Form.Control.Feedback>Confirmed</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' as={Col} xs='12' controlId='validationCustom04'>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  pattern='((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9).{8,})\S$'
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <Form.Control.Feedback>Confirmed</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Password must be at least 8 characters, one uppercase, one lowercase, one special characters, and one number.</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Row>
      </Container>
    )
  }
}

export default UserRegister;