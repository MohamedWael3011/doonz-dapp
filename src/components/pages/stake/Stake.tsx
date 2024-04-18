import { SmartContract, Web3Button, useAddress, useContract, useContractRead, useOwnedNFTs } from "@thirdweb-dev/react";
import { DOONZ_ADDRESS, FOOTBALL_ADDRESS, STAKE_ADDRESS } from "../../../consts/addresses";
import NFTCard from "../../NFTCard";
import { BaseContract, ethers } from "ethers";
import SwitchableItems from "../../ui/SwitchableItems";
import { useState } from "react";
import BoosterButton from "../../BoosterButton";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import '../../../assets/styles/Button.css'

export default function Stake() {
  const address = useAddress();
  const { contract } = useContract(STAKE_ADDRESS);
  const { data:NFTContract } = useContract(DOONZ_ADDRESS, 'nft-drop');
  const { data:NFTNftContract } = useContract(FOOTBALL_ADDRESS, 'nft-drop');

  const { data: accumlatedRewards } = useContractRead(
    contract,
    "viewAccumulatedRewards",
    [address]
  );
  const { data: boosterPercent,isLoading } = useContractRead(
    contract,
    "getMultiplier",
    [address]
  );
  const actualPercentage = boosterPercent? boosterPercent.toString() : 0;
  const { data: ownedNFTs } = useOwnedNFTs(NFTContract, address);
  const { data: ownedFootballNFTs } = useOwnedNFTs(NFTNftContract, address);

  const [selectedNFT, setSelectedNFT] = useState<number>(1);
  const handleItemClick = (item: number) => {
    setSelectedNFT(item);
  };
  return (
    <div className="w-full flex items-start justify-evenly h-full">
      <div className="lg:grid lg:grid-cols-2 lg: flex flex-col justify-evenly  xl:max-w-[1280px] w-full mt-[11vw] relative z-10  m-0 overflow-hidden">
      <div className="border-white border-4 bg-opacity-65 rounded-3xl max-h-[60vh] bg-white flex flex-col items-center justify-between mt-[110px] p-5">
      <div className="w-full flex justify-center">
          <div className="w-fit h-auto p-2 m-2 flex flex-col justify-center items-center whitespace-nowrap bg-blue-500 rounded-md text-white">
            <span>Accumulated Rewards:</span>
            <span>{accumlatedRewards && parseFloat(ethers.utils.formatUnits(accumlatedRewards, 18)).toFixed(2)} $DNZ</span>
          </div>
        </div>
        <BoosterButton/>
        {!isLoading && <CircularProgressbar className="m-10" value={actualPercentage} maxValue={100} text={`+${boosterPercent.toString()}%`}/>}
        <div className="flex gap-5">
        <Web3Button className="button" contractAddress={STAKE_ADDRESS} action={ async function (contract: SmartContract<BaseContract>) {
                if (!address) return;
                  selectedNFT == 1? await contract?.call("stake"): await contract?.call("fbstake");
          } }>Stake All {selectedNFT==1?"Doonz":"Football Doonz"}</Web3Button>
                  <Web3Button className="button" contractAddress={STAKE_ADDRESS} action={ async function (contract: SmartContract<BaseContract>) {
                if (!address) return;
                  await contract?.call("claimRewards");
          } }>Claim Rewards </Web3Button>
          </div>
      </div>
      <div className="flex flex-col items-center">
      <SwitchableItems selectedItem={selectedNFT} onItemClick={handleItemClick} />
        <span className="text-2xl text-white">Owned NFTs</span>
        <div className="p-4 m-5 border-white border-4 bg-opacity-65 rounded-3xl overflow-auto max-h-[60vh] bg-white flex flex-wrap justify-center md:grid md:grid-cols-2"> 
        {selectedNFT === 1 && (!ownedNFTs || ownedNFTs.length === 0) && (
  "You don't own any Doonz!"
)}

{selectedNFT === 1 && ownedNFTs && ownedNFTs.length > 0 && (
  ownedNFTs.map((nft, i) => (
    <NFTCard
      key={i}
      tokenId={Number(nft.metadata.id)}
      contractAddress={DOONZ_ADDRESS}
      selectedNFT={selectedNFT}
    />
  ))
)}

{selectedNFT === 2 && (!ownedFootballNFTs || ownedFootballNFTs.length === 0) && (
  "You don't own any football NFTs!"
)}

{selectedNFT === 2 && ownedFootballNFTs && ownedFootballNFTs.length > 0 && (
  ownedFootballNFTs.map((nft, i) => (
    <NFTCard
      key={i}
      tokenId={Number(nft.metadata.id)}
      contractAddress={FOOTBALL_ADDRESS}
      selectedNFT={selectedNFT}
    />
  ))
)}
        </div>
      </div>

      </div>
    </div>
  );
}
