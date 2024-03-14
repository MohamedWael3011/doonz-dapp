/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ThirdwebNftMedia, useContract, useContractMetadata, useContractRead, useNFT } from "@thirdweb-dev/react"
import { RAFFLE_ADDRESS } from "../consts/addresses"
import { Box, Card, Flex, Stack,Text,Heading } from "@chakra-ui/react";

export default function PrizeNFT() {

    const {contract:raffleContract} = useContract(RAFFLE_ADDRESS);
    const{data:prizeNFTContractAddress} = useContractRead(raffleContract,"nftAddress");
    const{data:nftTokenId} = useContractRead(raffleContract,"nftId");

    const{contract:NftContract} = useContract(prizeNFTContractAddress);

    const{data:prizeNftMetadata, isLoading:LoadingPrizeNft} = useContractMetadata(NftContract);


    const{data:nft, isLoading:LoadingNft} = useNFT(NftContract,nftTokenId);




  return (
    <Card p={'15%'}>
        <Heading p={'2'} textAlign={"center"}>Prize NFT</Heading>
        {!LoadingPrizeNft  && !LoadingNft && (
            <Stack  textAlign={'center'}>
                <Flex justifyContent={"center"}>
                    <ThirdwebNftMedia metadata={nft?.metadata!} height="80%" width="80%"/>
                </Flex>
                <Box>

                    <Text fontSize="2xl" fontWeight={"bold"}>{prizeNftMetadata?.name}</Text>
                    <Text fontWeight={"bold"}>{nft?.metadata.name}</Text>

                </Box>
            </Stack>
        )}

    </Card>
  )
}
