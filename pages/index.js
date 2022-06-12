import {ethers} from "ethers";
import { useState } from "react";
import NavBar from "../components/NavBar";
import GreenItem from "../artifacts/contracts/GreenItem.sol/GreenItem.json";
import Recycle from "../components/Recycle";
import Balance from "../components/Balance";
import Footer from "../components/Footer";

const greenItemAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export default function Home() {
  const info = [
    {
    "id" :0,
    "name":"Green Level 1",
    "image":"https://gateway.pinata.cloud/ipfs/Qmc3joRdy6naBJcFW4y68sNFbhM7MX3kSHVs3przBEcBf6"
    
    },
    {
    "id" :1,
    "name":"Yellow Level 1",
    "image":"https://gateway.pinata.cloud/ipfs/QmTfXmKKckcAV5pWZ5SK7SqarPhCJbhwoKtVdzXoUS4p4V"
    
    },
    {
    "id" :2,
    "name":"Blue Level 1",
    "image":"https://gateway.pinata.cloud/ipfs/QmdrMsxS2rhudZVf3HEDNQGzwfMBQzkYzqKDk3QTwRgSKC"
    
    },
    {
    "id" :3,
    "name":"Green Level 2",
    "image":"https://gateway.pinata.cloud/ipfs/QmUi42buR65ufHHxrYyaoUMEpZ9yx4dkLpfPsubayujgcX"
    
    },
    {
    "id" :4,
    "name":"Yellow Level 2",
    "image":"https://gateway.pinata.cloud/ipfs/QmWGxTkQbZhhSCaSfwtpXC97MucJ1MnQhuxSt6rSVNidB8"
    
    },
    {
    "id" :5,
    "name":"Blue Level 2",
    "image":"https://gateway.pinata.cloud/ipfs/Qmb8Ra3d3mUQsW1PFkyjSTiYj2ekp5LxTw68aVfCS4BDyC"
    
    },
    {
    "id" :6,
    "name":"Green Level 3",
    "image":"https://gateway.pinata.cloud/ipfs/QmeKus3kQeBBWNARCzxcBjHgfTAsCwEKqShKnjHeySnNpy"
    
    },{
    "id" :7,
    "name":"Yellow Level 3",
    "image":"https://gateway.pinata.cloud/ipfs/Qmcip9AnHyUkVQozzkTMei6THxxkW5MB67ZYkeyJr4prGh"
    
    },{
    "id" :8,
    "name":"Blue Level 3",
    "image":"https://gateway.pinata.cloud/ipfs/QmXLBEvfVGYpZobe4tdHX6rvPMbJcGH2vK4i9hqbZRsEZM"
    
    },{
    "id" :9,
    "name":"Ultimate Recycler",
    "image":"https://gateway.pinata.cloud/ipfs/QmY8DezUfCW9aoenMa1VkmrSz1LFNKWbUxDUdYHq7EPjgq"
    
    }]
  const [user,setWalletAddress] = useState();
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
  
  return (
    <div>
      {!user && (
        <div className="h-screen flex flex-col justify-center items-center bg-indigo-900 space-y-12">
          <img src="leaf.png" className="w-[25%]" />
          <button className="px-12 py-8 hover:text-black text-3xl hover:bg-white border border-blue font-bold text-white rounded-xl "
           onClick={() => {connectWallet()}}
           > Log In</button>
        </div>
      )}
     {user && (
      <>
      <NavBar user={user} />
      <Recycle addr={greenItemAddress} abi={GreenItem.abi} />
      <Balance user={user} addr={greenItemAddress} abi={GreenItem.abi} info={info} />
   
      <Footer />
      </>
     )}
    </div>
  )
}
