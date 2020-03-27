import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './SideBar.css';

export class Sidebar extends React.Component {
    async handleLogOut(){
        return await new Promise((resolve, reject) => {
        axios.delete('http://localhost:3000/user/session')
        .then(x => resolve(x.data))
        .catch(x => alert(x));
        })
        localStorage.clear()
    }
    render() {

        return(
            <div className="a">
                {/* This will be changed later I guess */}
                <h3>Welcome User</h3> 
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <Link to= "/update-account" class="nav-link active">
                            <button type="button" className="btn btn-md btn-info">
                                Account
                            </button>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to= "/" onClick={this.handleLogOut}>
                            <button type="button" className="btn btn-md btn-light">
                                Log Out
                            </button>
                        </Link>
                    </li>
                </ul>
                <img className="img-thumbnail" src="BD_Logo.jpg" alt="Logo-W"/>     
            </div>
        )
    }
}
