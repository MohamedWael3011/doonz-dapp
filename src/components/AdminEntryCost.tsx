import { Web3Button, useContract, useContractRead } from '@thirdweb-dev/react'
import { RAFFLE_ADDRESS } from '../consts/addresses'
import { Box, Divider, Input, Stack, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';

export default function AdminEntryCost() {
    const {contract} = useContract(RAFFLE_ADDRESS);

    const{data:entryCost,isLoading:LoadingEntryCost} = useContractRead(contract,"enteryCost");
    const{data:tokenCost,isLoading:LoadingTokenCost} = useContractRead(contract,"tokenCost");

    const{data:raffleStatus} = useContractRead(contract,"raffleStatus");

    const [updatedEntryCost,setUpdatedEntryCost] = useState(0);
    const [updatedTokenCost,setUpdatedTokenCost] = useState(0);

  return ( 
    <Stack spacing={4}>
        <Box>
            <Text>Entry Cost</Text>
            {!LoadingEntryCost && <Text>{ethers.utils.formatEther(entryCost)} MATIC</Text>}
        </Box>
        <Input
        isDisabled={raffleStatus}
        type='number'

        value={updatedEntryCost}
        onChange={e => setUpdatedEntryCost(parseFloat(e.target.value))}
        ></Input>
        <Web3Button
        contractAddress={RAFFLE_ADDRESS}
        isDisabled= {raffleStatus}
        action={contract => contract.call("changeEntryCostMatic",[ethers.utils.parseEther(updatedEntryCost.toString())])}>
                Update Matic Entry Cost
        </Web3Button>
        <Divider mt={2}/>
        <Box>
            <Text>Entry Cost</Text>
            {!LoadingTokenCost && <Text>{ethers.utils.formatEther(tokenCost)} $DNZ</Text>}
        </Box>
        <Input
        isDisabled={raffleStatus}
        type='number'
        value={updatedTokenCost}
        onChange={e => setUpdatedTokenCost(parseFloat(e.target.value))}
        ></Input>
        <Web3Button
        contractAddress={RAFFLE_ADDRESS}
        isDisabled= {raffleStatus}
        action={contract => contract.call("changeEntryCostMatic",[ethers.utils.parseEther(updatedEntryCost.toString())])}>
                Update $DNZ Entry Cost
        </Web3Button>
    </Stack>
  )
}
