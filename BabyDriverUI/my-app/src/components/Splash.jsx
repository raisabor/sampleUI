import React from "react";
import { Link } from "react-router-dom";
import './Splash.css';

export class Splash extends React.Component {

    render() {
        return(
            <div className="row">
                <div className="col-lg-5">
                    <img className="bg-img" src="https://assets.dmagstatic.com/wp-content/uploads/2019/08/Alto_Dec2018_0370-2-Edit-Edit-1-768x512.jpg" alt="Logo-W"/>
                </div>
                <div className="col-lg-3">
                    <img className="logo-img rounded" src="BD_Logo.jpg" alt="Logo-W"/>
                </div>
                <div className="col-lg-4">
                    <h2 className="title-splash">Welcome to Baby Driver</h2>
                    <h5>Sign up or Login to your account</h5>
                    <Link to= "/signup">
                        <button tag="button" className="btn btn-primary btn-block">
                            Register
                        </button>
                    </Link>
                    <Link to= "/login">
                        <button tag="button" className="btn btn-secondary btn-block">
                            Login as a parent
                        </button>
                    </Link>
                    {/* There will need to be a different portal for officials to sign into later */}
                    <Link to= "/official-login">
                        <button tag="button" className="btn btn-info btn-block">
                            Login as an official
                        </button>
                    </Link>
                    <div className="card text-black bg-white mb-3">
                    <div className="card-body">
                        <h5 className="card-title">What is Baby Driver</h5>
                        <p>
                            Baby Driver is a dedicated child safety alert system. <br/> Register you children and school
                            to be automatically notified when your children are released from school and who picks them up.
                        </p>
                        <a href="/" className="card-link">About</a>
                        <a href="/" className="card-link">Safety Policy</a>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}