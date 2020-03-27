import React from "react";
import { Redirect } from "react-router-dom";
import Child from "../models/Child";
import axios from 'axios'
export default class ChildProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "example",
      child: new Child(0, "Jon", "Adam", 12, "262-123-1231"),
      toDashboard: false,
      toModify: false,
      childId:this.props.match.params.childname,
    };
  }
  onSubmit = () => {
    this.setState(() => ({
      toDashboard: true
    }));
  };
  onModify = () =>{
    this.setState(() => ({
        toModify: true
      }));
  }
  async populateChild(){
    return await new Promise ((resolve, reject) => {
      axios.get(String('http://localhost:3000/child/'+this.state.childId))
      .then(x => {
        console.log(x.data)
        resolve(x.data)
        this.setState({ 
          child: x.data.action_result,
        })
      })
      .catch(x => alert("Something went wrong"));
    })
  }
  componentDidMount(){
    this.populateChild()
  }
  render() {
    if (this.state.toDashboard) {
      return <Redirect to="/dash" />;
    }
    if (this.state.toModify){
        return <Redirect to={String("/" + this.state.child.child_id + "/update-child-info")}/>;
    }
    return (
      <div>
        <header>
          <h1>{this.state.child.first_name}'s Profile</h1>
        </header>
        <div class="jumbotron text-center hoverable p-4">
          <div class="row">
            <div class="col-md-4 offset-md-1 mx-3 my-3">
              <div class="view overlay">
                <img
                  src="data:image/png;base64,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"
                  class="img-fluid"
                  alt="Sample image for first version of blog listing"
                />
                <a>
                  <div class="mask rgba-white-slight"></div>
                </a>
              </div>
            </div>

            <div class="col-md-7 text-md-left ml-3 mt-3">
              <h4 class="h4 pb-1">Currently Stored Information</h4>
              <h6 class="h6 pb-1">Name: <span className="text-info">{String(this.state.child.first_name+" "+ this.state.child.last_name)}</span></h6>
              <h6 class="h6 pb-1">Age: <span className="text-info">{this.state.child.age}</span></h6>
              <h6 class="h6 pb-1">Height: <span className="text-info">{this.state.child.height}</span></h6>
              <input
                type="submit"
                value="Return to homepage"
                onClick={this.onSubmit}
                className="btn-primary btn-sm btn-block"
              /> 
            <input
                type="submit"
                value="Edit Child's information"
                onClick={this.onModify}
                className="btn-primary btn-sm btn-block"
              /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}
