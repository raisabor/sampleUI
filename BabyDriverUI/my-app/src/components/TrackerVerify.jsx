import React from "react";
import { Redirect } from "react-router-dom";
import Vehicle from '../models/Vehicle';
import Pickup from '../models/Pickup';
import Child from '../models/Child';
import Parent from '../models/Parent';
import axios from 'axios';

export class TrackerVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pickups: [
        new Pickup(
          0,
          "1:00",
          "University Boulevard",
          new Parent(
            0,
            "Adam",
            [new Child(0, "Jon", "Adam", 12, "262-123-1231")],
            [
              new Vehicle(0, "Toyota", "Camery"),
              new Vehicle(1, "Toyota", "Tacoma")
            ]
          ),
          [new Child(0, "Jon", "Adam", 12, "262-123-1231")], "Dropped Off"
        ),
      ],
      toDashboard: false,
    };
  }
  onSubmit = () => {
    this.setState(() => ({
      toDashboard: true
    }));
  };
  
async changeStatus(index){
    let body = {
        pickup_id:this.state.pickups[index].pickup_id,
        status:1,
    }
    return await new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/pickups/status',body)
            .then(x => resolve(x.data))
    });
}
  componentWillUnmount(){
  } 

  render() {
    if (this.state.toDashboard) {
      return <Redirect to="/dash" />;
    }
    let pickups = this.state.pickups
    return (
      <div>
        <div id="Pickups" className="jumbotron">
        <h2>Verify today's Dropoffs</h2>
        <hr class="my-4"/>
            {pickups.map(pickup =>{
                return(
                    <div>
                      <h4>Verify Dropoff for:</h4>
                      <div>Children: 
                        <ul className="text-info"> {
                            pickup.children.map(element=>{
                                return <li key={element.pickup_id}> {element.child_name} </li> 
                            })
                            } 
                        </ul> 
                      </div>
                    
                    <div>Pickup Time: <span className="text-info">{pickup.time}</span></div>    
                    <div>Parent picking up: <span className="text-info">{pickup.parent.name}</span></div>
                    <div>Location: <span className="text-info">{pickup.location} </span> </div>
                    
                    
                <hr class="my-4"/>
                  <input
                    type="submit"
                    value="Confirm Dropoff"
                    onClick={this.changeStatus.bind(this, pickup.pickup_id)}
                    className="btn-primary btn-sm btn-block"
                  />
                </div>
                );
            })
           }
          <input
            type="submit"
            value="Return to homepage"
            onClick={this.onSubmit}
            className="btn-primary btn-sm btn-block"
          />
        </div>
      </div>
    );
  }
}
