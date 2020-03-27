import React from 'react';
import { Dashboard } from "./components/Dashboard";
import { Splash } from './components/Splash';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Login from './components/Login';
import LoginOfficial from './components/LoginOfficial'
import {TrackerVerify} from './components/TrackerVerify'
import  Signup from './components/Signup';
import {ChildCard} from "./components/ChildCard"
import './App.css';
import AccountInformation from './components/AccountInformation';
import Schedule from "./components/Schedule"
import PickupContainer from './components/PickupContainer'
import PickupCard from './components/PickupCard'
import {Tracker} from './components/Tracker'
import {VehicleForm} from './components/VehicleForm'
import ChildProfile from './components/ChildProfile';
import {ModifyChild} from './components/ModifyChild';
import {ConfirmationAction} from './components/ConfirmationPage';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Switch>
        <Route path="/Answer" component={ConfirmationAction} />
        <Route path="/login" component={Login} />
        <Route path="/login-official" component={LoginOfficial} />
        <Route path="/verify" component={TrackerVerify} />
        <Route path="/signup" component={Signup} />
        <Route path="/dash" component={Dashboard} />
        <Route path="/official-dash" component={PickupContainer} />
        <Route path="/official-login" component={LoginOfficial} />
        <Route path="/add-a-vehicle" component={VehicleForm} />
        <Route path="/add-a-child" component={ChildCard} />
        <Route path="/update-account" component={AccountInformation} />
        <Route path="/pickup/:pickupid" component={PickupCard} />
        <Route path="/:username/pickups" component={Tracker} />
        <Route path="/:parentname/schedule/" component={Schedule}/>
        <Route path="/:childname/profile" component={ChildProfile}/>
        <Route path="/:childname/update-child-info" component={ModifyChild}/>
        <Route path="/" component={Splash} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
          
export default App;