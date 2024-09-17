import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";

function AgreementViewer({ agreements, active, fetchAgreement }) {
  const getBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-500";
      case "active":
        return "bg-cyan-400";
      case "completed":
        return "bg-emerald-600 text-white";
      case "verified":
        return "bg-green-600 text-white";
      case "disputed":
        return "bg-red-600 text-white";
      default:
        return "bg-red-600 text-white";
    }
  };

  const getBadgeText = (requestedBy, status) => {
    if (requestedBy === "freelancer") {
      if (status === "initial") return "Not Signed";
      if (status === "pending") return "Awaiting Signature";
      if (status === "completed") return "Awaiting Review";
    }
    if (requestedBy === "client") {
      if (status === "pending") return "Not Signed";
      if (status === "completed") return "Review Requested";
    }
    if (status === "verified") return "Paid";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <ScrollArea className="h-full w-full rounded-md border p-3">
      {agreements.length === 0 && <Label>Nothing To Show Yet</Label>}
      {agreements.map((agreement) => (
        <Card
          key={agreement._id}
          className={`w-full cursor-pointer mt-3 ${
            active && active.id === agreement._id
              ? "bg-gray-200"
              : "hover:bg-gray-50"
          }`}
          onClick={() => {
            if (active.id !== agreement._id) {
              fetchAgreement(agreement._id);
            }
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
                {getBadgeText(agreement.requestedBy, agreement.status)}
              </Badge>
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
    </ScrollArea>
  );
}

export default AgreementViewer;
