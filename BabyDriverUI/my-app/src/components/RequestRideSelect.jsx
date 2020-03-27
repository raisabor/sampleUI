import React from 'react';
import Parent from "../models/Parent"
import { Link } from "react-router-dom";
import axios from 'axios';
export class RequestRideSelect extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:"",
            parents:[],
            search:'',
            parent:"0",
        }
    }
    async populateUsers(){
        return await new Promise ((resolve, reject) => {
            axios.get('http://localhost:3000/users')
            .then(x => {
                resolve(x.data)
                console.log("pop", x.data.action_result)
                for(let i=0; i< x.data.action_result.length;i++){
                    if(!x.data.action_result[i].school_id){
                        console.log(x.data.action_result[i])
                        var joined = this.state.parents.concat(new Parent(x.data.action_result[i].user_id,x.data.action_result[i].user_email,[],[],'',''));
                        this.setState({ parents: joined })
                    }
                }
            })
            .catch(x => alert(x));
        })
    }
    componentDidMount(){
        this.populateUsers()
    }
    updateSearch (e) {
        this.setState({search: e.target.value});
    }

    render(){
        let filteredParents = this.state.parents;
        filteredParents = filteredParents.filter(parent => {
            return parent.name.toLowerCase().indexOf(this.state.search) !== -1;
        })
        return(
        <div>
            <div className='input-group jumbotron text-center' id="searchI">
                    <input type='text' className="form-control row" 
                        value={this.state.search}
                        onChange={this.updateSearch.bind(this)} 
                        placeholder = "Search for a parent and click on them to schedule a pickup"
                    />
            </div>
            <div className='ParentList row ml-4' id="parentList">
                    <ul style={{position:"absolute; top:5px"}}>
                        {filteredParents.map(parent => {
                        return (
                        <div className="fluid-container">
                        <li>
                            <Link to={String("/" + parent.id + "/schedule")} key={parent.name}>{parent.name}</Link>
                        </li>
                        </div>
                        );
                        })}
                    </ul>
             </div>
        </div>
        );
    }
}