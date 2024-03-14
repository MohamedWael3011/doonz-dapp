import { Box, Card, Divider, Input, Stack, Text } from "@chakra-ui/react";
import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import { useState } from "react";
import RaffleStatus from "./RaffleStatus";
import { RAFFLE_ADDRESS } from "../consts/addresses";

export default function AdminLotteryStatusCard() {
    const {
        contract
    } = useContract(RAFFLE_ADDRESS);

    const {
        data: lotteryStatus
    } = useContractRead(contract, "raffleStatus");

    const {
        data: allowMatic
    } = useContractRead(contract, "allowMatic");

    const {
        data: allowERC20
    } = useContractRead(contract, "allowERC20");


    const [contractAddress, setContractAddress] = useState("");
    const [tokenId, setTokenId] = useState(0);
    const [maxEntries, setMaxEntries] = useState(0);


    function reset() {
        setContractAddress("");
        setTokenId(0);
    }
    
    return (
        <Card p={4} mt={4} mr={10} w={"25%"}>
            <Text fontWeight={"bold"} mb={4} fontSize={"xl"}>Raffle Status</Text>
            <RaffleStatus
                raffleStatus={lotteryStatus}
            />
            {!lotteryStatus ? (
                <Stack spacing={4} mt={4}>
                <Box>
                    <Text>Prize Contract Address:</Text>
                    <Input
                        placeholder={"0x00000"}
                        type="text"
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                    />
                </Box>
                <Box>
                    <Text>Prize Token ID:</Text>
                    <Input
                        placeholder={"0"}
                        type="number"
                        value={tokenId}
                        onChange={(e) => setTokenId(parseInt(e.target.value))}
                    />
                </Box>

                <Box>
                    <Text>Max Entries</Text>
                    <Input
                        placeholder={"0"}
                        type="number"
                        value={maxEntries}
                        onChange={(e) => setMaxEntries(parseInt(e.target.value))}
                    />
                </Box>

                <Web3Button
                    contractAddress={RAFFLE_ADDRESS}
                    action={(contract) => {
                        contract.call(
                        "startRaffle",
                        [
                            contractAddress,
                            tokenId,
                            maxEntries
                        ]
                    )}}
                    onSuccess={reset}
                >Start Raffle</Web3Button>
                </Stack>
            ) : (
                <Stack spacing={4} mt={4}>
                    <Web3Button
                        contractAddress={RAFFLE_ADDRESS}
                        action={(contract) => contract.call(
                            "endRaffle"
                        )}
                    >End Raffle</Web3Button>
                </Stack>
            )}
        <Divider mt={2}/> 
        <Stack mt={4}>   
        <Web3Button isDisabled={lotteryStatus}  contractAddress={RAFFLE_ADDRESS} action={(c)=>c.call("toggleMaticAllowance")}>{allowMatic? "Disallow MATIC":"Allow MATIC"}</Web3Button>
        <Web3Button isDisabled={lotteryStatus} contractAddress={RAFFLE_ADDRESS} action={(c)=>c.call("toggleERC20Allowance")}>{allowERC20? "Disallow DNZ":"Allow DNZ"}</Web3Button>
        </Stack>
        </Card>
    )
}