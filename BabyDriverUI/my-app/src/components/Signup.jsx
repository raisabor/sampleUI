import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from 'axios';

class Signup extends React.Component {
  state = {
    nname: "",
    nusername: "",
    npassword: "",
    isSchoolUser:false,
    id: "",
    meme:"parent",
  };


  async postUser(){  
      if (this.state.meme==="official"){
        
      return await new Promise((resolve, reject) => {
        axios.put('http://localhost:3000/user/', {
          'email':this.state.nusername,
          'password':this.state.npassword,
          'school_id':1
        }
        )})
      }
      else{
        return await new Promise((resolve, reject) => {
          axios.put('http://localhost:3000/user/', {
          'email':this.state.nusername,
          'password':this.state.npassword,
        }
        )
          .then(x => resolve(x.data))
          .catch(x => alert(x));
    });
    }
  }
  selectChange(e){
    e.persist();
    console.log(e.target.value)
    this.setState({
      meme: e.target.value
    });
    if (this.state.meme !='parent'){
      this.setState({
        isSchoolUser: true
      });
    }
  }
  render() {
    return (
      <div className="Signup">
        <header className="Signup-header">
          <title>Create an Account</title>
        </header>
        <body>
          <div className="card">
            <div className="panel-heading">
              <h1>Sign up</h1>
            </div>
            <div className="jumbotron">
              <div className="form-group">
                <label htmlFor="email"></label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={this.state.nusername}
                  onChange={e => this.setState({ nusername: e.target.value })}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type="text"
                  className="form-control"
                  name="Password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.npassword}
                  onChange={e => this.setState({ npassword: e.target.value })}
                ></input>
              </div>
              <div className="form-group">
                <select className="form-select" value={this.state.meme} onChange={this.selectChange.bind(this)}>
                  <option value="parent">Parent Account</option>
                  <option value="official">School Official Account </option>
                </select>
              </div>
            </div>
            {/* This should call a redirect function at some point not be a link */}
            <Link
              style={{ marginTop: "1em", backgroundColor: "#f53958" }}
              className="btn btn-success"
              onClick={this.postUser.bind(this)}
              to={{
                pathname: `/`
              }}
            >
              <h3>Create Account</h3>
            </Link>
          </div>
        </body>
      </div>
    );
  }
}

export default Signup;
