import { Box, Card,Text } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_ADDRESS } from "../consts/addresses";
import AdminTransfer from "./AdminTransfer";

export default function AdminRaffleWinner() {
    const {contract:raffleContract} = useContract(RAFFLE_ADDRESS);
    const {data:NftContractAddress} = useContractRead(raffleContract,"nftAddress");
    const {data:NftTokenId} = useContractRead(raffleContract,"nftId");


  return (
    <Card p={4}>
        <Text fontSize={"x-large"} fontWeight={"bold"}>Raffle Winner</Text>
        {NftContractAddress == "0x0000000000000000000000000000000000000000" ? (
            <Box>
                <Text>No NFT Prize Set</Text>
                <Text>Please start a new raffle and set an NFT</Text>

            </Box>

        ):(
    
          <AdminTransfer nftAddress={NftContractAddress} tokenId={NftTokenId}/>
        )

        }
    </Card>
  )
}
