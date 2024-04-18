import {
    Web3Button,
    useAddress,
    useContract,
    useContractEvents,
    useContractRead,
  } from "@thirdweb-dev/react";
  import ShadowLogo from "../../../assets/DOONZ_LOGO_shadow.png";
  import { ethers } from "ethers";
import { RAFFLE_ADDRESS } from "../../../consts/addresses";
import PrizeNFT from "../../PrizeNFT";
import RaffleStatus from "../../RaffleStatus";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import CurrentEntries from "../../CurrentEntries";
import { Text } from "@chakra-ui/react";

export default function NFTRaffle() {

    const address = useAddress();
    const { contract } = useContract(RAFFLE_ADDRESS);
    const { data: TokenAddress } = useContractRead(contract, "tokenAddress");
    const { contract: ERC20Contract } = useContract(TokenAddress, "token-drop");
    
    const { data: entryCost, isLoading: isEntryCostLoading } = useContractRead(
        contract,
        "enteryCost"
      );
      const { data: tokenCost, isLoading: isTokenCostLoading } = useContractRead(
        contract,
        "tokenCost"
      );
    
      const { data: isAllowedMatic, isLoading: LoadingIsAllowedMatic } =
        useContractRead(contract, "allowMatic");
      const { data: isAllowedERC20, isLoading: LoadingIsAllowedERC20 } =
        useContractRead(contract, "allowERC20");
    
        const { data: nftAddress, isLoading: LoadingNftAddress } =
        useContractRead(contract, "nftAddress");
    
      const { data: raffleStatus, isLoading: LoadingRaffleStatus } =
        useContractRead(contract, "raffleStatus");
    
      const { data: totalEnteries, isLoading: LoadingTotalEntries } =
        useContractRead(contract, "totalEntries");
    
    
      const { data: currentEntries, isLoading: LoadingCurrentEntries } =
        useContractRead(contract, "entryCount",[address]);
    
        const { data: maxEntries, isLoading: LoadingMaxEntries } =
        useContractRead(contract, "maxEntries");
    
      const entryCostInEth = entryCost ? ethers.utils.formatEther(entryCost) : "0";
      const tokenCostInEth = entryCost ? ethers.utils.formatEther(tokenCost) : "0";
    
      const [entryAmount, setEntryAmount] = useState(0);
      const [tokenAmount, setTokenAmount] = useState(0);
    
      const entryCostOnSumbit = parseFloat(entryCostInEth) * entryAmount;
      const tokenCostOnSumbit = parseFloat(tokenCostInEth) * tokenAmount;
      const { data:latestWinner, isLoading:loadingLatestWinner } = useContractEvents(contract,"WinnerSelected",{queryFilter:{
        fromBlock:0,
        toBlock:"latest",
        order:"desc"
      }});
    
     const winner = latestWinner?.at(0)?.data.winner;
    
      function increaseEntryAmount() {
        setEntryAmount(entryAmount + 1);
      }
      function decreaseEntryAmount() {
        if (entryAmount > 0) {
          setEntryAmount(entryAmount - 1);
        }
      }
      function increaseTokenAmount() {
        setTokenAmount(tokenAmount + 1);
      }
      function decreaseTokenAmount() {
        if (tokenAmount > 0) {
          setTokenAmount(tokenAmount - 1);
        }
      }
      
  return (
    <div className="w-full flex items-start justify-evenly h-full">
    <div className="lg:grid lg:grid-cols-2 flex flex-col justify-evenly  xl:max-w-[1280px] w-full mt-[11vw] relative z-10  m-0 overflow-hidden">
      <div className="flex">
        {raffleStatus || ( !LoadingNftAddress && nftAddress != "0x0000000000000000000000000000000000000000") ? <PrizeNFT /> : <img src={ShadowLogo} />}
      </div>
      <div className="flex flex-col justify-center md:items-start items-center p-[5%] gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl">Doonz Raffle</h3>
          <h3 className="text-3xl">Buy your ticket now!</h3>
        </div>
        {!LoadingRaffleStatus && (
          <RaffleStatus raffleStatus={raffleStatus} />
        )}
        {!LoadingMaxEntries && !LoadingTotalEntries && raffleStatus && (
          <h3 className="text-2xl">{totalEnteries.toString()} / {maxEntries.toString()} Ticket Bought!</h3>
        )}

        {isAllowedMatic &&
          !LoadingIsAllowedMatic &&
          !isEntryCostLoading && (
            <div className="flex flex-col gap-4 md:items-start items-center">
              <h3 className="text-2xl">
                Cost per Entry: {entryCostInEth} MATIC
              </h3>
              {address ? (
                <div className="flex md:justify-start justify-center">
                  <div className="flex w-1/2 md:mr-[40px] mr-0">
                    <Button onClick={decreaseEntryAmount}>-</Button>
                    <Input
                      className="text-center mx-5"
                      value={entryAmount}
                      onChange={(e) =>
                        setEntryAmount(parseInt(e.target.value))
                      }
                    />
                    <Button onClick={increaseEntryAmount}>+</Button>
                  </div>

                  <Web3Button
                    contractAddress={RAFFLE_ADDRESS}
                    action={(contract) =>
                      contract.call("buyEntryMatic", [entryAmount], {
                        value: ethers.utils.parseEther(
                          entryCostOnSumbit.toString()
                        ),
                      })
                    }
                    isDisabled={!raffleStatus}
                  >
                    {"Buy Ticket(s)"}
                  </Web3Button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        {isAllowedERC20 &&
          !LoadingIsAllowedERC20 &&
          !isTokenCostLoading && (
            <div className="flex flex-col gap-4 md:items-start items-center">
              <h3 className="text-2xl">
                Cost per Entry: {tokenCostInEth} $DNZ
              </h3>
              {address ? (
                <div className="flex md:justify-start justify-center">
                  <div className="flex w-1/2 mr-0 md:mr-[40px]">
                    <Button onClick={decreaseTokenAmount}>-</Button>
                    <Input
                      className="text-center mx-5"
                      value={tokenAmount}
                      onChange={(e) =>
                        setEntryAmount(parseInt(e.target.value))
                      }
                    />
                    <Button onClick={increaseTokenAmount}>+</Button>
                  </div>
                  <Web3Button
                    contractAddress={RAFFLE_ADDRESS}
                    action={async (contract) => {
                      await ERC20Contract?.call("approve",[RAFFLE_ADDRESS,ethers.utils.parseEther(
                        tokenCostOnSumbit.toString()
                      )])

                      await contract.call("buyEntryERC20", [tokenAmount]);
                    }}
                    isDisabled={!raffleStatus}
                  >
                    {"Buy Ticket(s)"}
                  </Web3Button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}

        {address ? (
          !LoadingCurrentEntries && (
            <h3 className="text-xl">
              Your Total Entries: {currentEntries.toString()}
            </h3>
          )
        ) : (
          <h3>Please connect your wallet.</h3>
        )}
      </div>
      <div className="mt-5 flex flex-col">
     {!loadingLatestWinner && <Text color={"white"} mb={4} fontWeight={"bold"}  fontSize="x-large">Last Winner: {winner} </Text>}

        <Text  fontSize="x-large">Current Entries: </Text>
        <CurrentEntries />
      </div>
    </div>
  </div>
  )
}
