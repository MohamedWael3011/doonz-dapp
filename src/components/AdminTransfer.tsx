/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useContractMetadata,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import { RAFFLE_ADDRESS } from "../consts/addresses";
import { Box, Flex,Text } from "@chakra-ui/react";
import { ethers } from "ethers";

interface Props {
  nftAddress: string;
  tokenId: string;
}
export default function AdminTransfer({ nftAddress, tokenId }: Props) {
  const { contract: raffleContract } = useContract(RAFFLE_ADDRESS);
  const { data: raffleStatus } = useContractRead(
    raffleContract,
    "raffleStatus"
  );
  const { contract: NFTContract } = useContract(nftAddress,"nft-drop");
  const { data: PrizeNftMetadata } = useContractMetadata(NFTContract);
  const { data: nft, isLoading: LoadingNFT } = useNFT(NFTContract, tokenId);
  return (
    <Box>
      <Flex flexDirection={"row"} my={10} alignItems={"center"}>
        {!LoadingNFT && (
          <ThirdwebNftMedia
            metadata={nft?.metadata!}
          />
        )}
        <Box ml={4}>
          <Text fontSize="2xl" fontWeight={"bold"}>
            {PrizeNftMetadata?.name}
          </Text>
          <Text fontWeight={"bold"}>{nft?.metadata.name}</Text>
        </Box>
      </Flex>
      <Web3Button
      contractAddress={RAFFLE_ADDRESS}
      action={async () =>{
        await NFTContract?.setApprovalForToken(RAFFLE_ADDRESS,tokenId);
        await raffleContract?.call("selectWinner",[ethers.utils.parseEther(Math.random().toString())])
      }}
      isDisabled={raffleStatus}>Select Winner</Web3Button>
    </Box>
  );
}
