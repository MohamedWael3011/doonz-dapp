/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
} from "@thirdweb-dev/react";
import {
  DOONZ_ADDRESS,
  STAKE_ADDRESS,
  TOKEN_ADDRESS,
} from "../../../consts/addresses";
import NFTCard from "../../NFTCard";
import { BigNumber, ethers } from "ethers";
import BoosterButton from "../../BoosterButton";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../../assets/styles/Button.css";
import { useState } from "react";

export default function Stake() {
  const address = useAddress();
  const { contract, isLoading: isLoadingStake } = useContract(STAKE_ADDRESS);
  const { data: NFTContract } = useContract(DOONZ_ADDRESS, "nft-drop");
  const { data: boosterPercent, isLoading } = useContractRead(
    contract,
    "getMultiplier",
    [address]
  );
  const { data: userStakeInfo } = useContractRead(contract, "userStakeInfo", [
    address,
  ]);
  const actualPercentage = boosterPercent ? boosterPercent.toString() : 0;
  const { data: ownedNFTs } = useOwnedNFTs(NFTContract, address);

  const { contract: tokenContract } = useContract(TOKEN_ADDRESS, "token");

  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  async function stakeSelectedNft() {
    if (!address) return;

    const isApproved = await NFTContract?.isApproved(address, STAKE_ADDRESS);
    if (!isApproved) {
      await NFTContract?.setApprovalForAll(STAKE_ADDRESS, true);
    }
    await contract?.call("stake", [selectedUnstakedNFTs]);
  }

  async function unstakeSelectedNft() {
    if (!address) return;

    await contract?.call("withdraw", [selectedStakedNFTs]);
  }
  async function stakeAllNft(ids: any[]) {
    if (!address) return;

    const isApproved = await NFTContract?.isApproved(address, STAKE_ADDRESS);
    if (!isApproved) {
      await NFTContract?.setApprovalForAll(STAKE_ADDRESS, true);
    }
    await contract?.call("stake", [ids]);
  }

    // States for selected NFTs
    const [selectedStakedNFTs, setSelectedStakedNFTs] = useState<string[]>([]);
    const [selectedUnstakedNFTs, setSelectedUnstakedNFTs] = useState<string[]>([]);
  
    // Functions to handle selections
    const toggleStakedSelection = (tokenId:string) => {
      const newSelection = selectedStakedNFTs.includes(tokenId)
        ? selectedStakedNFTs.filter((id: string) => id !== tokenId)
        : [...selectedStakedNFTs, tokenId];
      setSelectedStakedNFTs(newSelection);
    };
  
    const toggleUnstakedSelection = (tokenId:string) => {
      const newSelection = selectedUnstakedNFTs.includes(tokenId)
        ? selectedUnstakedNFTs.filter((id: string) => id !== tokenId)
        : [...selectedUnstakedNFTs, tokenId];
      setSelectedUnstakedNFTs(newSelection);
    };


  if (isLoadingStake) {
    return <div>Loading...</div>;
  }


  return (
    <div className="w-full flex items-start justify-evenly h-full">
      <div className="lg:grid lg:grid-cols-2 lg: flex flex-col justify-evenly  xl:max-w-[1280px] w-full mt-[11vw] relative z-10  m-0 overflow-hidden">
        <div className="border-white border-4 bg-opacity-65 rounded-3xl max-h-[60vh] bg-white flex flex-col items-center justify-between mt-[110px] p-5">
          <div className="w-full flex justify-center">
            <div className="w-fit h-auto p-2 m-2 flex flex-col justify-center items-center whitespace-nowrap bg-blue-500 rounded-md text-white">
              <span>Accumulated Rewards:</span>
              <span>
                {!userStakeInfo
                  ? "Loading..."
                  : ethers.utils.formatUnits(userStakeInfo[1], 18)}{" "}
                {tokenBalance?.symbol}
              </span>
            </div>
          </div>
          <BoosterButton />
          {!isLoading && (
            <CircularProgressbar
              className="m-10"
              value={actualPercentage}
              maxValue={100}
              text={`+${actualPercentage}%`}
            />
          )}

          <Web3Button
            className="button"
            action={(contract) => contract.call("claimRewards")}
            contractAddress={STAKE_ADDRESS}
          >
            Claim Rewards
          </Web3Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl text-white">Staked NFTs</span>
            <div className="p-4 m-5 border-white border-4 bg-opacity-65 rounded-3xl overflow-auto max-h-[60vh] bg-white flex flex-wrap justify-center md:grid md:grid-cols-2">
              {userStakeInfo && userStakeInfo[0].length === 0 && (
                <div>You do not have any NFT Staked</div>
              )}
              {userStakeInfo &&
                userStakeInfo[0]?.map((stakedToken: BigNumber) => (
                  <NFTCard
                    tokenId={stakedToken.toString()}
                    key={stakedToken.toString()}
                    toggleSelection={toggleStakedSelection}
                    isSelected={selectedStakedNFTs.includes(stakedToken.toString())} variant={"staked"}          />
                ))}
            </div>
            {userStakeInfo && userStakeInfo[0]?.length > 0 && (
              <Web3Button
                className="button"
                contractAddress={STAKE_ADDRESS}
                action={() => {
                  const tokenIds = userStakeInfo[0]?.map((stakedToken:BigNumber) => stakedToken.toString());
                  if (!tokenIds) return;
                  return contract?.call("withdraw", [tokenIds]);
                }}
              >
                Withdrw all
              </Web3Button>
            )}
                          {selectedStakedNFTs && selectedStakedNFTs?.length > 0 && (
                <Web3Button
                  className="button"
                  contractAddress={STAKE_ADDRESS}
                  action={unstakeSelectedNft}
                >
                  Withdraw Selected
                </Web3Button>
              )}

            <div className="flex flex-col items-center">
              <span className="text-2xl text-white">Unstaked NFTs</span>

              <div className="p-4 m-5 border-white border-4 bg-opacity-65 rounded-3xl overflow-auto max-h-[60vh] bg-white flex flex-wrap justify-center md:grid md:grid-cols-2">
                {ownedNFTs && ownedNFTs.length === 0 && (
                  <div>You do not own any unstaked NFTs</div>
                )}
                {ownedNFTs?.map((nft) => (
                  <NFTCard
                    tokenId={nft.metadata.id}
                    key={nft.metadata.id.toString()}
                    toggleSelection={toggleUnstakedSelection}
                    isSelected={selectedUnstakedNFTs.includes(nft.metadata.id)} variant={"unstaked"}          />
                ))}
              </div>
              {ownedNFTs && ownedNFTs?.length > 0 && (
                <Web3Button
                  className="button"
                  contractAddress={STAKE_ADDRESS}
                  action={() => {
                    const tokenIds = ownedNFTs?.map((nft) => nft.metadata.id);
                    if (!tokenIds) return;
                    return stakeAllNft(tokenIds);
                  }}
                >
                  Stake all
                </Web3Button>
              )}
              {selectedUnstakedNFTs && selectedUnstakedNFTs?.length > 0 && (
                <Web3Button
                  className="button"
                  contractAddress={STAKE_ADDRESS}
                  action={stakeSelectedNft}
                >
                  Stake Selected
                </Web3Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
