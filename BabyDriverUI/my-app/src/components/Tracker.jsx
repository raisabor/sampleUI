import React from "react";
import { Redirect } from "react-router-dom";
import Vehicle from '../models/Vehicle';
import Pickup from '../models/Pickup';
import Child from '../models/Child';
import Parent from '../models/Parent';
export class Tracker extends React.Component {
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
        new Pickup(
          1,
          "2:00",
          "University Street",
          new Parent(
            0,
            "Bob",
            [new Child(1, "Ron", "Adam", 11, "262-123-1211")],
            [new Vehicle(0, "Ford", "Camery"), new Vehicle(1, "Ford", "Tacoma")]
          ),
          [new Child(1, "Ron", "Adam", 11, "262-123-1211")],"Picking Up"
        )
      ],
      toDashboard: false,
    };
  }
  onSubmit = () => {
    this.setState(() => ({
      toDashboard: true
    }));
  };
  render() {
    if (this.state.toDashboard) {
      return <Redirect to="/dash" />;
    }
    let pickups = this.state.pickups
    return (
      <div>
        <div id="Pickups" className="jumbotron">
        <h2> Your children's pickups today</h2>
        <hr class="my-4"/>
            {pickups.map(pickup =>{
                return(
                    <div>
                     <div>Pickup Status: <span className="text-primary">{pickup.status}</span></div>
                    <div>Pickup Time: <span className="text-info">{pickup.time}</span></div>    
                    <div>Parent picking up: <span className="text-info">{pickup.parent.name}</span></div>
                    <div>Location: <span className="text-info">{pickup.location} </span> </div>
                    <div>Owned Vehicles: 
                        <ul className="text-info"> {
                            pickup.parent.vehicles.map(element => {
                                return <li key={element.id}> {String(element.make+ " " +element.model +"\n")} </li> 
                            })
                            } 
                        </ul>
                    </div>
                    <div>Children Picking up: 
                        <ul className="text-info"> {
                            pickup.children.map(element=>{
                                return <li key={element.id}> {element.name} </li> 
                            })
                            } 
                        </ul> 
                    </div>
                <hr class="my-4"/>
                </div>
                );
            })}
          <input
            type="submit"
            value="Done reviewing"
            onClick={this.onSubmit}
            className="btn-primary btn-sm btn-block"
          />
        </div>
      </div>
    );
  }
}
