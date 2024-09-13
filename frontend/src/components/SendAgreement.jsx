import { Label } from "@radix-ui/react-label";
import { Input } from "postcss";
import React from "react";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import TextEditor from "./TextEditor";

function SendAgreement() {
  return (
    <>
      <div className="w-full h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center p-0">
              detail
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full  p-3 flex-col">
              <TextEditor></TextEditor>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export default SendAgreement;
