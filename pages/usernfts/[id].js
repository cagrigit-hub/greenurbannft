import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NavBar from '../../components/NavBar';
import GreenItem from "../../artifacts/contracts/GreenItem.sol/GreenItem.json";
import { ethers } from 'ethers';
import Footer from '../../components/Footer';

function Mynfts() {
  
  const router = useRouter()
  const [green, setGreen] = useState(0);
  const [green2, setGreen2] = useState(0);
  const [green3, setGreen3] = useState(0);
  const [yellow, setYellow] = useState(0);
  const [yellow2, setYellow2] = useState(0);
  const [yellow3, setYellow3] = useState(0);
  const [blue, setBlue] = useState(0);
  const [blue2, setBlue2] = useState(0);
  const [blue3, setBlue3] = useState(0);
  const [recycler, setRecycler] = useState(0);

  const user = router.query.id;

  const array = [
    { color: "bg-green-200", val: green },
    { color: "bg-green-500", val: green2 },
    { color: "bg-green-700", val: green3 },
    { color: "bg-yellow-200", val: yellow },
    { color: "bg-yellow-500", val: yellow2 },
    { color: "bg-yellow-700", val: yellow3 },
    { color: "bg-blue-200", val: blue },
    { color: "bg-blue-500", val: blue2 },
    { color: "bg-blue-700", val: blue3 },
    { color: "bg-purple-500", val: recycler },
  ];

  async function getBalances() {
    const addr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const abi = GreenItem.abi;
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(addr, abi, provider);
      try {
        const green = await contract.balanceOf(user, 0);
        console.log(green.toNumber());
        setGreen(green.toNumber());
        const green2 = await contract.balanceOf(user, 3);
        setGreen2(green2.toNumber());
        const green3 = await contract.balanceOf(user, 6);
        setGreen3(green3.toNumber());
        const yellow = await contract.balanceOf(user, 1);
        setYellow(yellow.toNumber());
        const yellow2 = await contract.balanceOf(user, 4);
        setYellow2(yellow2.toNumber());
        const yellow3 = await contract.balanceOf(user, 7);
        setYellow3(yellow3.toNumber());
        const blue = await contract.balanceOf(user, 2);
        setBlue(blue.toNumber());
        const blue2 = await contract.balanceOf(user, 5);
        setBlue2(blue2.toNumber());
        const blue3 = await contract.balanceOf(user, 8);
        setBlue3(blue3.toNumber());
        const recycler = await contract.balanceOf(user, 9);
        setRecycler(recycler.toNumber());
      } catch (error) {
        console.log(error);
      }
     
    }
  }
  useEffect(() => {
    
      getBalances();
    
  } , [])
  
  return (
    <>
      <NavBar user={user} />
      <div className='flex  justify-center items-center mt-48'>
      <div className="grid grid-cols-3 gap-4 f">
        {array.map((item, i) => (
          
          <>
            {i !== array.length - 1 && item.val !== 0 && (
              <div
                key={i}
                id={i}
               
                className={
                  item.color +
                  "  w-40 h-40 flex justify-center items-center text-center "
                }
              >
                
            
                  
               
                
              </div>
            )}
            {i === array.length - 1 &&  item.val !== 0 &&(
              <>
                <div></div>
                <div
                key={i}
                id={i}
             
                  className={
                    item.color +
                    "  w-40 h-40 flex justify-center items-center text-center "
                  
                  }
                 
                >
                  <div className="flex flex-col space-y-2">
                  
                </div>
                </div>
                <div></div>
              </>
            )}
          </>
        ))}
      </div>
      </div>
      <Footer id={true} />

    </>
  )
}

export default Mynfts