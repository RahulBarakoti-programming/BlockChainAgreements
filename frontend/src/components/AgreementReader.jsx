import { Avatar } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback } from "./ui/avatar";
import { CardDescription, CardFooter, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

function AgreementReader({ agreement }) {
  return (
    <div className="w-full h-full ">
      <div className="p-3 w-full flex">
        <span className="w-10">
          <Avatar>
            <AvatarFallback>
              RB
              {/* {agreement.clientName.subString(0,3)} */}
            </AvatarFallback>
          </Avatar>
        </span>
        <div className="w-full pl-4">
          <CardTitle className="">
            {/* {agreement.clientName} */}
            Rahul Barakoti
          </CardTitle>
          <CardDescription>
            {/* {String(agreement.deadLine)} */}
            18 oct 2024
          </CardDescription>
        </div>
      </div>
      <hr />
      <div className="h-fit w-full pt-4">
        <Label className="text-xl">Agreement Details</Label>
        <CardDescription className="mb-5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
          numquam iure illum tempora nisi debitis tempore? Deleniti doloremque
          repellendus, explicabo ex sunt provident enim a iste deserunt, magni
          nostrum illo harum nisi eos vitae, ipsa earum aliquid facere quisquam
          facilis voluptatem delectus odit! Consequatur est molestias dicta hic,
          numquam nobis non enim obcaecati recusandae laboriosam consequuntur
          dolores ea similique doloremque.
        </CardDescription>
        <hr className="mb-4" />
        <Label className="text-base">Dead Line</Label>
        <CardDescription className="mb-5">18 oct 2024</CardDescription>
        <hr className="mb-4" />

        <CardFooter className="mt-9 flex justify-end">
          <Button>Sign and Approve</Button>
        </CardFooter>
      </div>
    </div>
  );
}

export default AgreementReader;
