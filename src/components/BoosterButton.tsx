import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import React from "react";
import { DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";

export default function BoosterButton() {
  return (
      <Dialog >
        <DialogTrigger asChild><Button className="bg-blue-500 text-white" variant="outline">Booster ?</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="text-center m-5">
                You get extra boosting percentage when you own any of the Doonz Editions<br />
                You can learn more about what percentage each NFT gives in our Discord Server! <br />
                <a  href="https://opensea.io/collection/doonzeditions" target="https://opensea.io/collection/doonzeditions"><Button className="m-5">Buy Now!</Button></a>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  );
}
