import React, { useEffect, useState } from "react";

import { Label } from "@radix-ui/react-label";
import DashboardHead from "./DashboardHead";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgreementViewer from "./AgreementViewer";
import AgreementReader from "./AgreementReader";
import SendAgreement from "./SendAgreement";
import axios from "axios";

function Dashboard() {
  let [active, setActive] = useState({});
  const fetchAgreement = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/agreement/get/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status == 200) {
        setActive(response.data);
        console.log(active);
      }
    } catch (error) {
      console.error("Error fetching agreements", error);
    }
  };

  const [agreements, setAgreements] = useState([]);
  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/agreement/get`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAgreements(response.data);
        if (response.data.length !== 0) {
          fetchAgreement(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching agreements", error);
      }
    };

    fetchAgreements();
  }, []);
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
                    <AgreementViewer
                      agreements={agreements}
                      active={active}
                      fetchAgreement={fetchAgreement}
                    ></AgreementViewer>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex h-full items-center justify-center p-6">
                    <AgreementReader active={active}></AgreementReader>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </TabsContent>
            <TabsContent className="h-full" value="password">
              <SendAgreement></SendAgreement>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
