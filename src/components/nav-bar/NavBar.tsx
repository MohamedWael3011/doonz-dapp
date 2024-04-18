import {  Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BsDiscord, BsTwitterX } from "react-icons/bs";
import Logo from "../../assets/DOONZ_LOGO.png"
import { ConnectWallet, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_ADDRESS } from "../../consts/addresses";
import { Link } from "react-router-dom";

export default function NavBar() {

  const address  = useAddress();
  const {contract} = useContract(RAFFLE_ADDRESS);

  const {data:isOwner, isLoading: isLoadingOwner} = useContractRead(contract,"isOwner",[address]);

  const [sideBar, setSideBar] = useState(false);
  const navRef = useRef(null);
  const handleSideBar = () => {
    setSideBar((prev) => !prev);
  };

  useEffect(() => {
    const tl = gsap.timeline();

    const ctx = gsap.context(() => {
      tl.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className="fixed top-0 w-full  z-20 flex justify-center text-2xl md:mt-0 mt-5">
      <div
        ref={navRef}
        className="flex  xl:max-w-[1280px] bg-[#3978ae]  w-full justify-between items-center max-w-[1240px] mx-auto p-5 text-white  md:mt-4  rounded-xl"
      >
        {/* <h2 className="text-3xl font-bold w-full">LOGO</h2> */}
        <img src={Logo} alt="bug" width={120} />

        <ul className="hidden md:flex uppercase">
          <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
            <a href="/home">home</a>
          </li>
          {/* <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
            <a href="/nfts">nfts</a>
          </li> */}
          {/* <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
            <a  href="/erc20">erc-20</a>
          </li> */}
                    <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
            <a href="/raffle">{"marketplace (coming soon)"}</a>
          </li>
          <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
            <a href="/stake">{"staking"}</a>
          </li>
          {/* <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
            <a href="/freebies">freebies</a>
          </li> */}
          <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
            <a href="/raffle">raffle</a>
          </li>

          <div className="flex items-center gap-4 navitem px-4 whitespace-nowrap">
            <a
              href="https://twitter.com/doonznft"
              className="hover:bg-[#4e94c8] hover:rounded-lg hover:duration-300   hover:underline hover:decoration-pink-400 hover:ease-in p-2"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://discord.gg/ud2zmMxcBT"
              className="hover:bg-[#4e94c8] hover:rounded-lg hover:duration-300   hover:underline hover:decoration-pink-400 hover:ease-in p-2"
            >
              <BsDiscord />
            </a>
            {!isLoadingOwner && isOwner && (<Link to="/raffle-admin">Admin Panel</Link>)}
            <ConnectWallet/>
          </div>
        </ul>
        <div onClick={handleSideBar} className="block md:hidden">
          {!sideBar ?( <><div className="flex items-center gap-5"><ConnectWallet /><Menu size={20} /></div></>) : <X size={20} />}
        </div>
        <div
          className={
            sideBar
              ? `fixed left-0 top-0 w-[80%] h-screen border-r bg-[#3978ae] text-white ease-in-out duration-500`
              : "fixed left-[-100%]"
          }
        >
                  <img src={Logo} alt="bug" width={120} />


          <ul className="uppercase flex flex-col gap-10 p-4">
            <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
              <a href="#">home</a>
            </li>
            {/* <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
              <a href="#">nfts</a>
            </li>
            <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
              <a href="#">erc-20</a>
            </li> */}
                        <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
              <a href="#">{"marketplace (coming soon)"}</a>
            </li>
            <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
              <a href="/stake">{"staking"}</a>
            </li>
            {/* <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
              <a href="#">freebies</a>
            </li> */}
            <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
              <a href="/raffle">raffle</a>
            </li>
            {!isLoadingOwner && isOwner && (            <li className="flex items-center navitem px-4 whitespace-nowrap hover:tracking-widest   hover:underline hover:decoration-pink-400  hover:duration-300 hover:ease-in">
              <a href="/raffle-admin">Admin Panel</a>
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
