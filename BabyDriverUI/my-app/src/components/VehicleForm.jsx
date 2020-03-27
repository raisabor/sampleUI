import React from "react";
import {Redirect} from 'react-router-dom';
export class VehicleForm extends React.Component {
    onNameAdded = () => {
        this.setState(() => ({
            toDashboard: true
        }))
    }

    state = {
        make: "",
        model: "",
        license:'',
        auto: 0,
        toDashboard: false
    };

    render() {    
        if (this.state.toDashboard === true) {
            return <Redirect to='/dash' />
        }
        return (
            <div className="form-group jumbotron">
                <div>
                <h5>Add a vehicle:</h5>
                </div>
            <form>
                <label htmlFor="make">
                    Make:
                </label>
                <input type="text"
                        id="make"
                        name="make"
                        className="form-control"
                        value={this.state.make}
                        onChange={e => this.setState({ make: e.target.value }) } />

                <label htmlFor="model">
                   Model
                </label>
                <input type="text"
                        id="model"
                        name="model"
                        className="form-control"
                        value={this.state.model}
                        onChange={e => this.setState({ model: e.target.value }) } />


                <label htmlFor="license">
                    License Plate:
                </label>
                <input type="text"
                        id="license"
                        name="license"
                        className="form-control"
                        value={this.state.license}
                        onChange={e => this.setState({ license: e.target.value }) } />         
            <div>
                <input type="submit" value="Register Vehicle" className="btn-primary btn-sm btn-block" style={{width:"81%"}} onClick={this.onNameAdded}/>
            </div>
        </form>
        </div>
        )
    }
}