import {
  ThirdwebNftMedia,
  useNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { DOONZ_ADDRESS, STAKE_ADDRESS } from "../consts/addresses";

interface NFTCardProp {
  tokenId: number;
}
const NFTCard = ({ tokenId }: NFTCardProp) => {
  const { contract } = useContract(DOONZ_ADDRESS, "nft-drop");
  const { data: nft } = useNFT(contract, tokenId);
  return (
    <div className="text-center bg-white p-4 m-2 rounded-lg w-[200px]">
      {nft && <h3>Doonz {nft.metadata.name}</h3>}
      {nft?.metadata && <ThirdwebNftMedia metadata={nft.metadata} />}
      <Web3Button
        action={(contract) => contract?.call("withdraw", [[nft?.metadata.id]])}
        contractAddress={STAKE_ADDRESS}
      >
        Withdraw
      </Web3Button>
    </div>
  );
};

export default NFTCard;
