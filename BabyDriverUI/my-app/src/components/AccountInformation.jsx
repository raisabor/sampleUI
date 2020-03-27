import React from 'react';
import './AccountInformation.css'
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export default class AccountInformation extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            email:"",
            password:'',
            toDashboard:false,
            updateEmail:false,
            updatePassword:false
        }
    }
    onSubmit = () =>{
        this.setState(() => ({
            toDashboard: true
        }))
    }
    async emailUpdate(){
        let body = {
            email:this.state.email
        }
        return await new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/user/email',body)
                .then(x => resolve(x.data))
        });
    }
  async passWordUpdate(){
        let body = {
            password:this.state.password
        }
        return await new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/user/password',body)
                .then(x => resolve(x.data))
        });
    }
    handleEmailChange(e){
        this.setState(() => ({
            updateEmail: true,
            email:e.target.value
        }))
    }
    handlePasswordChange(e){
        this.setState(() => ({
            updatePassword: true,
            email:e.target.value
        }))
    }
    async populatePlaceholder(){
        return await new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/user/')
        .then(x => {
            console.log(x.data.action_result)
            this.setState(() =>({
                email:x.data.action_result.user_email
            }))
        })
        .catch(x => alert(x));
        })
    }
    componentDidMount(){
        this.populatePlaceholder()
    }
    componentWillUnmount(){
        this.emailUpdate()
        this.passWordUpdate()
    }

    render(){
        if(this.state.toDashboard){
            return <Redirect to='/dash' />
        }
        return(
        <div>
            <header>
                <h1>Update Account Information</h1>
            </header>
            <div id="accountInformationForms" className="jumbotron">
                {/* Placeholder texts will eventually have whatever is stored for a given account */}
                <span>Please fill in the following forms to update any account information.</span>
                <br/>
                <input type="text" name ="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder={this.state.email}/>
                <br/>
                <input type="password" name ="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="If you want to change your password type here"/>
                <br/>
                <input type="submit" value="Update Information" onClick={this.onSubmit} className="btn-primary btn-sm btn-block" />
            </div>
        </div>);
    }
}