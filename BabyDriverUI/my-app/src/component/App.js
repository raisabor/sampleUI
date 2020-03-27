import React from 'react';
import "./App.css";
const App = () => {
  return (
  <body>
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap" rel="stylesheet"></link>
    <header>
    <h1>Update Account Information</h1>
    </header>
    <div id="accountInformationForms">
      <span>Please fill in the following forms for account information</span>
      <br/>
      <input type="text" name ="FirstName" placeholder="First Name" />
      <br/>
      <input type="text" name ="LastName" placeholder="Last Name"/>
      <br/>
      <input type="text" name ="EMail" placeholder="E-mail"/>
      <br/>
      <input type="submit" value="Update Information" />
    </div>
  </body>
    );
};

export default App;