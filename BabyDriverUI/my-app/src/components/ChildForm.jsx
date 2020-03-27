import React from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios'
export class ChildForm extends React.Component {
    onNameAdded = () => {
        this.registerChild()
        this.setState(() => ({
            toDashboard: true
        }))
    }

    state = {
        firstName: "",
        lastName:"",
        age:0,
        phone: "",
        height:0,
        auto: 1,
        toDashboard: false
    };

    async registerChild(){
        let body = {
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            age:this.state.age,
            height:this.state.height,
        }
        return await new Promise((resolve, reject) => {
            axios.put('http://localhost:3000/child',body)
                .then(x => resolve(x.data))
                .catch(x=> alert(x))
        });
    }

    render() {    
        if (this.state.toDashboard === true) {
            return <Redirect to='/dash' />
        }
        return (
            <div className="form-group">
            <form>
                <label htmlFor="name">
                    Child First Name:
                </label>
                <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={e => this.setState({ firstName: e.target.value }) } />
                <label htmlFor="name">
                    Child Last Name:
                </label>
                <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={e => this.setState({ lastName: e.target.value }) } />
                <label htmlFor="name">
                   Age
                </label>
                <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={this.state.age}
                        onChange={e => this.setState({ age: e.target.value }) } />

                <label htmlFor="phone">
                    Height
                </label>
                <input type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={this.state.height}
                        onChange={e => this.setState({ height: e.target.value }) } />      
            <div>
                <input type="submit" value="Register Child" className="btn-primary btn-sm btn-block" style={{width:"81%"}} onClick={this.onNameAdded}/>
            </div>
        </form>
        </div>
        )
    }
}