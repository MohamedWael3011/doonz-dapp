import { useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_ADDRESS } from "../consts/addresses";
import { Card, Flex,Text } from "@chakra-ui/react";

interface Props{
    walletAddress:string
}
export default function EntryRow({walletAddress}:Props) {
    const {contract} = useContract(RAFFLE_ADDRESS);
    const {data:numOfEntries, isLoading:LoadingNumOfEntries} = useContractRead(contract,"entryCount", [walletAddress]);
function truncateAdd(add:string){
    return add.slice(0,6) + "..." + add.slice(-4);
}
  return (
    <Card p={8} mb={3}>
        {!LoadingNumOfEntries && (
            <Flex flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} >
                <Text border={"1px solid"} borderRadius={"6px"}>{truncateAdd(walletAddress)}</Text>
                <Text>{numOfEntries.toNumber()}</Text>

            </Flex>
        )}
    </Card>
  )
}
