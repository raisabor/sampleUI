import React from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
export class ModifyChild extends React.Component {
    state = {
        first_name: "",
        last_name:"",
        height: 0,
        age: 0,
        childId:this.props.match.params.childname,
        child:'',
        toDashboard: false,
    };
    onSubmit(){
        this.setState(() => ({
             toDashboard: true
        }))
    }
    async populateChild(){
        return await new Promise ((resolve, reject) => {
          axios.get(String('http://localhost:3000/child/'+this.state.childId))
          .then(x => {
            console.log(x.data)
            resolve(x.data)
            this.setState({ 
                child: x.data.action_result,
                first_name: x.data.action_result.first_name,
                last_name: x.data.action_result.last_name,
                age: x.data.action_result.age,
                height: x.data.action_result.height
            })
          })
          .catch(x => alert("Something went wrong"));
        })
      }
    componentDidMount(){
        this.populateChild()
    }
    async updateChild(){
        let body = {
            height:this.state.height,
            age:this.state.age,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            school_id:1
        }
        return await new Promise((resolve, reject) => {
            axios.post(String('http://localhost:3000/child/school/'+this.state.childId),body)
                .then(x => resolve(x.data))
        });
    }
    componentWillUnmount(){
        this.updateChild()
    }
    render() {    
        if (this.state.toDashboard == true) {
            return <Redirect push to='/dash' />
        }
        return (
            <div className="form-group jumbotron">
            <form>
                <label htmlFor="first_name">
                    First Name:
                </label>
                <input type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                        value={this.state.first_name}
                        onChange={e => this.setState({ first_name: e.target.value }) } />
                <label htmlFor="last_name">
                    Last Name:
                </label>
                <input type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control"
                        value={this.state.last_name}
                        onChange={e => this.setState({ last_name: e.target.value }) } />

                <label htmlFor="age">
                   Age
                </label>
                <input type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        value={this.state.age}
                        onChange={e => this.setState({ age: e.target.value }) } />
                
                <label htmlFor="height">
                    Height:
                </label>
                <input type="text"
                        id="height"
                        name="height"
                        className="form-control"
                        value={this.state.height}
                        onChange={e => this.setState({ height: e.target.value }) } />          
            <div>
                <input type="submit" value="Update information for Child" className="btn-primary btn-sm btn-block" style={{width:"81%"}} onClick={this.onSubmit.bind(this)}/>
            </div>
        </form>
        </div>
        )
    }
}