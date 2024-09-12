import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { sampleAgreements } from "@/dummyData.js/sampleAgreements";
import { Badge } from "@/components/ui/badge";
function AgreementViewer() {
  return (
    <ScrollArea className="h-full w-full rounded-md border p-3">
      {sampleAgreements.map((agreement) => (
        <Card className="w-full hover:bg-gray-50 cursor-pointer mt-3">
          <CardHeader className="text-base font-semibold p-2">
            {agreement.clientName}
          </CardHeader>
          <CardContent className="p-2 pt-0 text-gray-600 text-sm">
            {agreement.projectDetails.description.length > 80
              ? `${agreement.projectDetails.description.substring(0, 80)}...`
              : agreement.projectDetails.description}
          </CardContent>
          <CardFooter className="p-0 pt-0">
            <CardDescription className="p-2 text-xs font-normal pt-0">
              {
                <Badge variant="secondary" className="hover:bg-green-200">
                  {agreement.status}
                </Badge>
              }
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
    </ScrollArea>
  );
}

export default AgreementViewer;
