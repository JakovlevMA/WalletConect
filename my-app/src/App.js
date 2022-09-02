import React from 'react';
import './App.css';
import MetaMaskAuth from "./metamask-auth";
import MetaMaskLogo from "./favicon.png"

function App() {
  return (
    <main>
      <div className="logoContainer">
        <img src={MetaMaskLogo} height={160}/>
      </div>
      <MetaMaskAuth onAddressChanged={address => {}}/>
    </main>
  );
}

export default App;


