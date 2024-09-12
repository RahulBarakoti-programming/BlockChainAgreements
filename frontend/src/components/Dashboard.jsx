import React from "react";

import { Label } from "@radix-ui/react-label";
import DashboardHead from "./DashboardHead";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgreementViewer from "./AgreementViewer";

function Dashboard() {
  return (
    <>
      <div className="h-full w-full p-8">
        <Label className="text-3xl font-medium">Dashboard</Label>

        <DashboardHead></DashboardHead>

        <div className="flex w-full h-full">
          <Tabs defaultValue="account" className="mt-8 w-full h-full">
            <TabsList>
              <TabsTrigger value="account">Agreements</TabsTrigger>
              <TabsTrigger value="password">Send Agreement</TabsTrigger>
            </TabsList>
            <TabsContent className="h-full" value="account">
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px] rounded-lg border md:min-w-[450px]"
              >
                <ResizablePanel defaultSize={25}>
                  <div className="flex h-full items-center justify-center p-0">
                    <AgreementViewer></AgreementViewer>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Content</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </TabsContent>
            <TabsContent className="h-full" value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
