  
import React from "react";
import { FriendForm } from "./FriendForm";
export class FriendCard extends React.Component {

    render() {
        return(
            <div className="col-sm-6">
                <div class="card text-white bg-dark mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Add a Friend</h5>
                        <FriendForm />
                    </div>
                </div>
            </div>
            
        )
    }
}