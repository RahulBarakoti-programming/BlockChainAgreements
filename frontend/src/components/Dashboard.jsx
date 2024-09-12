import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card.jsx";
import { Label } from "@radix-ui/react-label";
import { BackpackIcon, KeyboardIcon } from "@radix-ui/react-icons";

function Dashboard() {
  return (
    <>
      <div className="h-full w-full p-8">
        <Label className="text-3xl font-medium">Dashboard</Label>
        <div className="flex justify-between gap-5 mt-6">
          <Card className="flex grow flex-col">
            <CardHeader className="w-full pb-2.5">
              <div className="flex flex-row  items-center justify-between">
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>$</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-0">
              <Label className="font-bold text-2xl">$ ----</Label>
            </CardContent>
            <CardFooter>
              <CardDescription>nothing to show yet</CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex grow flex-col">
            <CardHeader className="w-full pb-2.5">
              <div className="flex flex-row  items-center justify-between">
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>$</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-0">
              <Label className="font-bold text-2xl">$ ----</Label>
            </CardContent>
            <CardFooter>
              <CardDescription>nothing to show yet</CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex grow flex-col">
            <CardHeader className="w-full pb-2.5">
              <div className="flex flex-row  items-center justify-between">
                <CardTitle>Total Projects</CardTitle>
                <CardDescription>
                  <BackpackIcon></BackpackIcon>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-0">
              <Label className="font-bold text-2xl">-</Label>
            </CardContent>
            <CardFooter>
              <CardDescription>nothing to show yet</CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex grow flex-col">
            <CardHeader className="w-full pb-2.5">
              <div className="flex flex-row  items-center justify-between">
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>
                  <KeyboardIcon></KeyboardIcon>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-0">
              <Label className="font-bold text-2xl">-</Label>
            </CardContent>
            <CardFooter>
              <CardDescription>nothing to show yet</CardDescription>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
