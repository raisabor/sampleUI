import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { RequestRideSelect} from "./RequestRideSelect.jsx"
import Child from '../models/Child'
import {Redirect} from 'react-router-dom';
import axios from 'axios'
export class Dashboard extends React.Component {
    constructor(props){
        super(props)

    this.state = {
        user:0,
        children:[
            new Child(0, "No Child has been created","Adam",12,"262-123-1231"),
        ],
        child:'1',
        goToProfile: false,
    };
    this.onChildChoice = this.onChildChoice.bind(this);
}
    onChildChoice(e){
        e.persist();
        console.log(e.target.value)
        this.setState(({
            child: e.target.value,
            goToProfile: true
        }))
    }

    async populateChildren(){
        return await new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/child/')
            .then(x => {
                console.log(x.data.action_result)
                if(x.data.action_result){
                    this.setState(()=>({
                        children:[]
                    }))
                    for(let i=0; i< x.data.action_result.length;i++){
                        var joined = this.state.children.concat(new Child(x.data.action_result[i].id, x.data.action_result[i].first_name, '', '', '',''));
                        console.log(joined)
                        this.setState(() =>({
                        children:x.data.action_result
                        }))
                        console.log("test",x.data.action_result[i])
                        localStorage.setItem('child', x.data.action_result[i].child_id);
                        
            }
            }})
            .catch(x => alert(x));
            })
        }
    componentDidMount(){
        this.populateChildren()
    }

    render() {
        if(this.state.goToProfile){
            console.log(this.state.child)
            return <Redirect to={String('/'+ this.state.child + '/profile')} />
        }
        let children = this.state.children;
        return (
            <div className="App">
                <header className="App-header">
                    <span>
                        <h2 style={{display:"inline"}} className ="p-4"> Baby Driver</h2>
                        <Link className ="p-4" to={String("/"+this.state.user+"/pickups")}>Track Today's Pickups </Link>
                        <label className="p-2">
                            <select onChange={this.onChildChoice.bind(this)} value={this.state.child}>
                                <option value='1'>Choose a child to navigate to their profile</option>

                                {children.map(element=>{
                                    console.log("afsdf",element)
                                    return <option key={element.child_id} value={element.child_id}>{String(element.first_name +" " + element.last_name)} </option>
                                })}
                            </select>
                        </label>
                        <Link to="/:username/pickups">
                            <button type="button" className="btn-sm btn-info">
                                <img src="https://cdn2.iconfinder.com/data/icons/social-productivity-line-art-2/128/notification-512.png" height="24" width="24"/>
                            </button>
                        </Link>
                       
                    </span>
                </header>
                <body className="App-body"> 
                    <div className="col-md-3">
                        <h3>Registration:</h3>
                        <ul class="list-unstyled">
                            <li class="nav-item">
                                <Link to= "/add-a-child">
                                    <button type="button" className="btn btn-block btn-info">
                                        Register Child
                                    </button>
                                </Link>
                            </li>
                            
                        </ul>
                        
                        <Link to= "/add-a-vehicle">
                            <button type="button" className="btn btn-block btn-light">
                                Register Vehicle
                            </button>
                        </Link>
                                               
                    </div>
                    <div className="col-md-3">
                        <div class="text-white bg-dark mb-3">
                            <div class="card-body">
                                <h4 class="card-title">Pickups and Dropoffs:</h4>
                                
                                <Link to="/verify">
                                        <button type="button" className="btn-sm btn-secondary">
                                            Verify Dropoffs 
                                        </button>
                                </Link>
                            </div>
                        </div>
                    
                    </div>
                </body>
                <div>
                    
                </div>
                <div className="requestRide">
                        <RequestRideSelect/>
                </div>
                <div className="App-span">
                    <Sidebar />
                </div>
            </div>
        )
    }
}