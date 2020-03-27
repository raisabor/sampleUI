import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from 'axios';


export async function getAccount(email) {
  //api call
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      failed_login: false,
      config:{
        headers: {
            Authorization: 'jmcguire'
      }
    },
  }
}

async handleLogout(){
  return await new Promise((resolve, reject) => {
    axios.delete('http://localhost:3000/user/session')
    .then(x => resolve(x.data))
    .catch(x => alert(x));
    })
}

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  async tryLogin(email, password){
    axios.defaults.withCredentials = true
    const body = {
        'email':email,
        'password':password
    }
    return await new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/user/session',body)
          .then(x => resolve(x.data))
          .catch(x => alert('Incorrect Credentials, Try Again'));
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const response = this.tryLogin(this.state.email,this.state.password)
    .then(test=>{
      if(!test.action_result.school_id){
        console.log("at login",test.action_result)
        this.props.history.push({	
          pathname: `/dash`,	
          state: {	
            accountId: this.state.username	
          }})
        }
        else{
          console.log(test.action_result)
          this.handleLogout()
          alert('Wrong account type')
        }
      });
    }

  render() {
    return (
      <div className="jumbotron">
        <h3>LOGIN</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>

          <Button
            variant="info"
            disabled={!this.validateForm()}
            type="submit"
            style={{ width: "81.8%", marginBottom: "1em" }}
          >
            Login
          </Button>

          <Link
            style={{ color: "white" }}
            to={{
              pathname: `/signup`,
              state: {}
            }}
          >
            <Button variant="dark" style={{ width: "81.8%" }}>
              Create Account
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Login;
