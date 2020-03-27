import React from 'react';
import {Redirect} from 'react-router-dom';
import Calendar from 'react-calendar'
import axios from 'axios'

export default class Schedule extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            userID:this.props.match.params.parentname,
            username:"",
            toDashboard:false,
            date: new Date(),
            time: '',
            location:'',
        }
    }
    onSubmit = () =>{
        this.setState(() => ({
            toDashboard: true
        }))
    }
    onDateSelect = date => this.setState({ date })

    componentWillUnmount(){
        this.createPickupRequest()
    }
    async createPickupRequest(){
        return await new Promise((resolve, reject) => {
            let timeArr = this.state.time.split(':')
            if(timeArr[0].length < 2){
                timeArr[0]= String('0'+timeArr[0])
            }
            timeArr.push("00")
            let newTime =''
            for (let i = 0; i< timeArr.length;i++){
                newTime+=timeArr[i]
                if (i+1<timeArr.length){
                    newTime+=":"
                }
            }
            let dateArr = String(this.state.date.getFullYear()+"-" + this.state.date.getMonth()+ "-" + this.state.date.getDate())
            axios.put('http://localhost:3000/pickups/', {
            'child_id':localStorage.getItem('child'),
            'pickup_date':dateArr,
            'pickup_time':newTime,
            'dropoff_id':1,
            'assigned_to':this.state.userID,
            'safeword':this.state.location
            }
        )})
    }
    render(){
        if(this.state.toDashboard){
            return <Redirect to='/dash' />
        }
        return(
                <div className="jumbotron" style={{height:"100vh;"}}>
                    <Calendar onChange={this.onDateSelect.bind(this)} value={this.state.date}/>
                    <input 
                        type='text' 
                        className="form-control"
                        value={this.state.time}
                        onChange={e => this.setState({ time: e.target.value })} 
                        placeholder = "Type in a time for your requested appointment"
                    />
                    <input 
                        type='text' 
                        className="form-control"
                        value={this.state.location}
                        onChange={e => this.setState({ location: e.target.value })} 
                        placeholder = "Type in a Location for your requested appointment"
                    />
                    <input type="submit" value="Request Appointment" onClick={this.onSubmit.bind(this)} className="btn-primary btn-sm btn-block" />
                </div>
        );
    }
}