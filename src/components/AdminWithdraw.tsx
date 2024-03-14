import { Box, Divider, Stack, Text } from '@chakra-ui/react'
import { Web3Button, useContract, useContractRead } from '@thirdweb-dev/react'
import { RAFFLE_ADDRESS } from '../consts/addresses'
import { ethers } from 'ethers';

export default function AdminWithdraw() {

    const {contract} = useContract(RAFFLE_ADDRESS);
    const{data:maticBalance, isLoading:LoadingMaticBalance} = useContractRead(contract,"getBalance")
    const{data:tokenBalance, isLoading:LoadingTokenBalance} = useContractRead(contract,"getTokenBalance")

  return (
    <Stack spacing={4}>
        <Box>
            <Text fontSize="x-large" fontWeight={"bold"}>Contract Balance</Text>
            {!LoadingMaticBalance && <Text>{ethers.utils.formatEther(maticBalance)} MATIC</Text>}
        </Box>

        <Web3Button contractAddress={RAFFLE_ADDRESS} action={c => c.call("withdrawBalance")}>Withdraw MATIC</Web3Button>
        <Divider/>
            {!LoadingTokenBalance && <Text>{ethers.utils.formatEther(tokenBalance)} $DNZ</Text>}

        <Web3Button contractAddress={RAFFLE_ADDRESS} action={c => c.call("withdrawTokenBalance")}>Withdraw $DNZ</Web3Button>
    </Stack>
  )
}
