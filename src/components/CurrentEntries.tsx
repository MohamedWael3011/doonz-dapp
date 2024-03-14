import { useContract, useContractRead } from "@thirdweb-dev/react"
import { RAFFLE_ADDRESS } from "../consts/addresses"
import { Container } from "@chakra-ui/react";
import EntryRow from "./EntryRow";

export default function CurrentEntries() {
    const {contract} = useContract(RAFFLE_ADDRESS);
    const {data: currentEntries, isLoading: loadingCurrentEntries} = useContractRead(contract, "getPlayers");
    
    return (
        <Container>
            {!loadingCurrentEntries && (
                currentEntries.map((entry: string, index: number) => (
                    <EntryRow walletAddress={entry} key={index}/>
                ))
            )}
        </Container>
    );
}
