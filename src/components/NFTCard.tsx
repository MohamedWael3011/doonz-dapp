import React from 'react';
import {
  ThirdwebNftMedia,
  useNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { DOONZ_ADDRESS, STAKE_ADDRESS } from "../consts/addresses";

interface NFTCardProps {
  tokenId: string;
  toggleSelection: (tokenId: string) => void;
  isSelected: boolean;
  variant:"staked" | "unstaked"
}

const NFTCard = ({ tokenId, toggleSelection, isSelected,variant }: NFTCardProps) => {
  const { contract } = useContract(DOONZ_ADDRESS, "nft-drop");
  const { data: nft } = useNFT(contract, tokenId);
  return (
    <div className={`text-center bg-white p-4 m-2 rounded-lg w-[200px] ${isSelected ? 'border-blue-600 border-2' : ''}`} onClick={() => toggleSelection(tokenId)}>
      {nft && <h3>Doonz {nft.metadata.name}</h3>}
      {nft?.metadata && <ThirdwebNftMedia metadata={nft.metadata} />}
      
{     variant=="staked"?  (<Web3Button
        action={(contract) => contract?.call("withdraw", [[nft?.metadata.id]])}
        contractAddress={STAKE_ADDRESS}
      >
        Withdraw
      </Web3Button>):(
        <Web3Button
        action={(contract) => contract?.call("stake", [[nft?.metadata.id]])}
        contractAddress={STAKE_ADDRESS}
      >
        Stake
      </Web3Button>
      )}
    </div>
  );
};

export default NFTCard;