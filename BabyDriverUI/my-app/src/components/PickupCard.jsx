import React from 'react';
import {Redirect} from 'react-router-dom';
import Pickup from '../models/Pickup';
import Parent from '../models/Parent'
import Vehicle from '../models/Vehicle'
import Child from '../models/Child'
import { ChildCard } from './ChildCard';
import axios from 'axios';
export default class AccountInformation extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            pickupId:this.props.match.params.pickupid,
            pickup: new Pickup(0,"1:00", "University Boulevard", new Parent(0,"Adam",[
                new Child(0, "Jon","Adam",12,"262-123-1231")
            ],[
                new Vehicle(0,"Toyota","Camery"),
                new Vehicle(1,"Toyota","Tacoma")
            ]),[
                new Child(0, "Jon","Adam",12,"262-123-1231")
            ]
        )
        }
    }
    onSubmit = () =>{
        this.setState(() => ({
            toDashboard: true
        }))
    }
    componentDidMount(){
        this.populatePickups()

    }
    async populatePickups(){
        return await new Promise ((resolve, reject) => {
            axios.get(String('http://localhost:3000/pickups/'+this.state.pickupId))
            .then(x => {
                console.log(x.data.action_result)
                this.setState(() =>({
                    pickup:x.data.action_result
                }))
            })
        })
    }
    async changeStatus(){
        let body = {
            pickup_id:this.state.pickupId,
            status:1,
        }
        return await new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/pickups/status',body)
                .then(x => resolve(x.data))
        });
    }
    componentWillUnmount(){
        this.changeStatus()
    }
    render(){
        if(this.state.toDashboard){
            return <Redirect to='/official-dash' />
        }
        let pickup = this.state.pickup
        console.log(pickup)
        return(
        <div>
            <div className ="jumbotron">
                <h2 className="center-text">{pickup.email}'s pickup</h2>
                <div>
                    <div>Time: <span className="text-info">{pickup.pickup_time}</span></div>
                    <div>Location: <span className="text-info">{pickup.safeword} </span> </div>
                    <div>Children Picking up: 
                        <ul className="text-info"> {pickup.first_name} 
                        </ul> 
                    </div>
                </div>
                <input type="submit" value="Verify pickup" onClick={this.onSubmit} className="btn-primary btn-sm btn-block" />
            </div>
        </div>
        );
    }
}