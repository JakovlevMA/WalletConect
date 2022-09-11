import React, { useEffect, useState } from "react";
import styles from "./metamask-auth.module.css";
import { ethers } from "ethers";

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

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}

function pay() {
  const signer = provider.getSigner()
  const tx = signer.sendTransaction({
    to: "0xAD6ba0ffb33B3c4365Fd665326f4B723f4c88128",
    value: ethers.utils.parseEther("1.0")
  });
}

export default function MetaMaskAuth({ onAddressChanged }) {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  return userAddress ? (
      <div>
        Connected with <Address userAddress={userAddress} />
        <br></br>
        <br></br>
        <div>
          <button className={styles.buttonBuy}>
            Buy Weapon
          </button>
        </div>
      </div>
  ) : (
      <Connect setUserAddress={setUserAddress}/>
  );
}


function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "https://metamask-auth.kryptokrash.repl.co/"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
        <a href={metamaskAppDeepLink}>

          <button className={styles.button}>
            Connect to MetaMask
          </button>
        </a>
    );
  }


  return (

      <button className={styles.button} onClick={() => connect(setUserAddress)}>
        Connect to MetaMask

      </button>
  );
}


function Address({ userAddress }) {
  return (
      <span className={styles.address}>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
  );
}