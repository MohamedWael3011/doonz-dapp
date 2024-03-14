import {
  Card,
  Container,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import AdminLotteryStatusCard from "../AdminRaffleStatus";
import AdminEntryCost from "../AdminEntryCost";
import AdminWithdraw from "../AdminWithdraw";
import AdminRaffleWinner from "../AdminRaffleWinner";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_ADDRESS } from "../../consts/addresses";
export default function AdminPage() {
  const address = useAddress();
  const {contract} = useContract(RAFFLE_ADDRESS);
  const {data:isOwner, isLoading: isLoadingOwner} = useContractRead(contract,"isOwner",[address]);
  return (
    <Container maxW={"1440px"} py={8} mt={'15vh'}>
      {!isLoadingOwner && isOwner &&(
        <><Heading>Admin Dashboard</Heading><Flex flexDirection={"row"}>
          <AdminLotteryStatusCard />
          <Card p={4} mt={4} mr={5} w={"25%"}>
            {<AdminEntryCost />}
            <Divider mt={4} />
            <AdminWithdraw />
          </Card>
          <AdminRaffleWinner />


        </Flex></>
      )}
    </Container>
  );
}
