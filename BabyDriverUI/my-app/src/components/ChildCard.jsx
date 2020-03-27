import React from "react";
import { ChildForm } from "./ChildForm";

export class ChildCard extends React.Component {

    render() {
        return(
                <div class="jumbotron">
                    <div>
                        <h5 class="card-title ">Add a Child</h5>
                    </div>
                        <div class="form-group pr-20"><ChildForm /></div>
                </div> 
        )
    }
}