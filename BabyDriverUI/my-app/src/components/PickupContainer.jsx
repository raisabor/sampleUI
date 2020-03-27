import PickupCard from './PickupCard'
import {Sidebar} from'./Sidebar'
import React from 'react';
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";
import Parent from '../models/Parent';
import Vehicle from '../models/Vehicle';
import Pickup from '../models/Pickup';
import axios from 'axios';
export default class PickupContainer extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            username:"",
            toDashboard:false,
            pickups:[
                new Pickup(0,"1:00", "University Boulevard", new Parent(0,"Adam",[],[
                    new Vehicle(0,"Toyota","Camery"),
                    new Vehicle(1,"Toyota","Tacoma")
                ],[]
            ))
            ],
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
            axios.get('http://localhost:3000/pickups')
            .then(x => {
                console.log(x.data.result)
                this.setState(() =>({
                    pickups:x.data.result
                }))
            })
        })
    }
    render(){
        if(this.state.toDashboard){
            return <Redirect to='/dash' />
        }
        let pickups = this.state.pickups
        return(
            <div className="App">
            <header className="App-header">
                <h2>Baby Driver</h2>
            </header>
            <div className="jumbotron center-text"> 
            <h3>Today's Pickups:</h3>
                    {pickups.map(pickup => {
                            return <Link to= {String("/pickup/"+ pickup.id)} key={pickup.id}>{pickup.email} at {String(pickup.pickup_time + " " + pickup.date_created)}<br/></Link>
                    })}
            </div>
            <div className="App-span">
                <Sidebar />
            </div>
        </div>
        );
    }
}