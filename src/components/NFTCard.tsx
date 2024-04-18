import { ThirdwebNftMedia, useNFT, useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { STAKE_ADDRESS } from "../consts/addresses";
import { ethers } from "ethers";

interface NFTCardProp {
    tokenId: number;
    contractAddress:string
    selectedNFT:number;
}
const NFTCard = (props: NFTCardProp) => {
    const address = useAddress();
    const { contract: NftContract } = useContract(props.contractAddress, 'nft-drop')
    const {data : nft} = useNFT(NftContract,props.tokenId)
  const { contract:StakeContract } = useContract(STAKE_ADDRESS);
    const {data:stakenNFTs} = props.selectedNFT ==1 ? useContractRead(StakeContract,"getStakedTokenIdsOfOwner",[address]): useContractRead(StakeContract,"getStakedFBTokenIdsOfOwner",[address])
    const toNumberStakedNFTs = stakenNFTs ? stakenNFTs.map((item: ethers.BigNumberish) => ethers.utils.formatUnits(item,0)) : [];
    const isStaked = toNumberStakedNFTs.includes(props.tokenId.toString());
    console.log(stakenNFTs)
    return (
        <div className="text-center bg-white p-4 m-2 rounded-lg w-[200px]">
            {nft && <h3>Doonz {nft.metadata.name}</h3>}
            {nft?.metadata && <ThirdwebNftMedia
            metadata={nft.metadata} />}
            {isStaked? (
                <div className="text-green-500 p-2 border border-black rounded-xl">Staked</div>
            ):(
                <div className="text-red-500 p-2 border-black rounded-xl">Not Staked</div>


            )}

        </div>

    )


}

export default NFTCard;