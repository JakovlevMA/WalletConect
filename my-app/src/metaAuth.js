import { ethers } from ethers; 
import React, { useEffect, useState } from "react";


function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }
  
  async function connect(onConnected) {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }
  
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    onConnected(accounts[0]);
  }