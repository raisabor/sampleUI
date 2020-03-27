import React from "react";
import Pickups, { Pickup } from "../models/Pickup";
import Parent from "../models/Parent";
import Vehicle from '../models/Vehicle';
import Child from '../models/Child'

export class ConfirmationAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupRequests: [
        new Pickup(
          0,
          "2/1, 1:00",
          "University Boulevard",
          new Parent(
            0,
            "Adam",
            [],
            [
              new Vehicle(0, "Toyota", "Camery"),
              new Vehicle(1, "Toyota", "Tacoma")
            ],
          ),
          [new Child(0, "Joe", "Adam", 12, "262-123-1231")],
          'Requested'
        ),
        new Pickup(
            0,
            "2/1, 1:00",
            "University Boulevard",
            new Parent(
              0,
              "Adam",
              [],
              [
                new Vehicle(0, "Toyota", "Camery"),
                new Vehicle(1, "Toyota", "Tacoma")
              ],
            ),
            [new Child(0, "Jon", "Adam", 12, "262-123-1231")],
            'Requested'
          )
      ]
    };
  }
  onConfirm() {
    return;
    // Axios post
  }
  onDeny(e){
      e.persist()
      //AxiosDelete
      console.log(e.target.parentNode)
      e.target.parentNode.remove()
  }
  render() {
    let pickups = this.state.pickupRequests;
    return (
      <div>
        {pickups.map(pickup => {
          return (
        <div className="jumbotron">
          <div>Pickup Time: <span className="text-info">{pickup.time}</span></div>
          <div>Pickup Location: <span className="text-info">{pickup.location}</span></div>
          <div>Children to Pickup : <ul><span className="text-info">{pickup.children.map(el=>{
              return <li>{el.name}</li>
          })}</span></ul></div>
              <button className="btn btn-block btn-info">Yes</button>
              <button className="btn btn-block btn-light" onClick={this.onDeny}>No</button>
        </div>
          );
        })}
      </div>
    );
  }
}
