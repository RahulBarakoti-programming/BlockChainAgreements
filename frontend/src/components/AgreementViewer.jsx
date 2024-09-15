import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";

function AgreementViewer({ agreements, active, fetchAgreement }) {
  const getBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  console.log(active, agreements[0]);

  return (
    <ScrollArea className="h-full w-full rounded-md border p-3">
      {agreements.length == 0 && <Label>Nothing To Show Yet</Label>}
      {agreements.map((agreement) => (
        <Card
          key={agreement._id}
          className={`w-full  cursor-pointer mt-3 ${
            active.id == agreement._id ? "bg-gray-200" : "hover:bg-gray-50"
          }`}
          onClick={() => {
            fetchAgreement(agreement._id);
          }}
        >
          <CardHeader className="text-base font-semibold p-2">
            {agreement.name}
          </CardHeader>
          <CardContent className="p-2 pt-0 text-gray-600 text-sm">
            {agreement.shortDescription}
          </CardContent>
          <CardFooter className="p-0 pt-0">
            <CardDescription className="p-2 text-xs font-normal pt-0">
              <Badge
                variant="secondary"
                className={getBadgeColor(agreement.status)}
              >
                {agreement.status}
              </Badge>
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
    </ScrollArea>
  );
}

export default AgreementViewer;
