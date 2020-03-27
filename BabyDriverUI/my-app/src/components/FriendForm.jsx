  
import React from "react";
import { Vehicle } from "../models/Vehicle"

export class FriendForm extends React.Component {

    state = {
        name: "",
        phone: "",
        auto: 0,
    };

    autos = [
        new Vehicle(1, 'Car'),
        new Vehicle(2, 'Truck'),
        new Vehicle(3, 'SUV'),
        new Vehicle(4, 'Van'),
    ];

    render() {
        return (
            <form>
            <div className="form-group">
                <label htmlFor="name">
                    Friend Name:
                </label>
                <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value }) } />
            </div>

            <div className="form-group">
                <label htmlFor="phone">
                    Phone:
                </label>
                <input type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={this.state.phone}
                        onChange={e => this.setState({ email: e.target.value }) } />
            </div>
          
            <div className="form-group">
                <label htmlFor="auto">
                    Vehicle:
                </label>
                <select type="text"
                       id="auto"
                       name="auto"
                       className="form-control"
                       value={this.state.auto}
                       onChange={ e => this.setState({ auto: e.target.value }) }>
                       <option></option>
                        {
                            this.autos.map(x => <option key={x.id} value={x.id}>{x.name}</option> )
                        }
                </select>
            </div>      

            <div>
                <button type="button" className="btn-primary btn-sm btn-block" onClick={() => this.props.onNameAdded(this.state.name)}>
                    Add
                </button>
            </div>
        </form>
        )
    }
}