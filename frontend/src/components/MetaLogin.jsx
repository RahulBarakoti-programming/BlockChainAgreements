import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import metaLogo from "@/assets/meta.png";
import AlertDialogA from "./Alert";
import { checkMetaMaskAvailability } from "@/web3functions/metaCheck";

function MetaLogin({ setStat }) {
  let [retry, setRetry] = useState(0);
  let [metaMaskStatus, setMetaMaskStatus] = useState(
    "fetching Meta Mask Details..."
  );
  useEffect(() => {
    async function fetchMetaMaskAvailability() {
      const status = await checkMetaMaskAvailability();
      if (status === "connected") {
        setMetaMaskStatus("MetaMask is connected.");
        setStat("signup");
      } else if (status === "connecting") {
        setMetaMaskStatus("Connecting to MetaMask...");
      } else if (status === "rejected") {
        setMetaMaskStatus("MetaMask connection was rejected.");
      } else if (status === "notAvailable") {
        setMetaMaskStatus(false);
      } else {
        setMetaMaskStatus("Unknown status.");
        setMetaMaskStatus(false);
      }
    }

    fetchMetaMaskAvailability();
  }, [retry]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-[350px] min-h-28">
        <div className="w-full flex justify-center mt-3 mb-3">
          <img src={metaLogo} width="60px" />
        </div>

        {metaMaskStatus && (
          <span className="w-full flex justify-center mb-8 mt-8">
            <CardTitle>{metaMaskStatus}</CardTitle>
          </span>
        )}

        {!metaMaskStatus && (
          <span>
            <CardHeader className="flex w-full items-center">
              <CardTitle>Unable to Detect Meta Mask</CardTitle>
              <CardDescription>
                Please Install Meta Mask Before going further!!
              </CardDescription>
            </CardHeader>
            <span></span>
            <CardFooter className="flex justify-center">
              <Button
                onClick={() => {
                  window.open(
                    "https://metamask.io/",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                Download Meta Mask
              </Button>
            </CardFooter>
          </span>
        )}
      </Card>
    </div>
  );
}

export default MetaLogin;
