import React from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import { CardDescription, CardFooter, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  clientSign,
  freelancerSign,
  updateByFreelancer,
  verifyCompletion,
} from "@/web3functions/clientSign";

function AgreementReader({ agreement, setLoader, setAgreement }) {
  if (!agreement) {
    return <div>No agreement selected.</div>;
  }

  // Function to handle state updates safely
  const updateAgreementStatus = (newStatus) => {
    setAgreement((prevAgreement) => ({
      ...prevAgreement,
      status: newStatus,
    }));
  };

  const handleSignAndApprove = async () => {
    setLoader(true);
    try {
      await clientSign(agreement.id, agreement.amount);
      updateAgreementStatus("active"); // Update status locally
    } catch (error) {
      console.error("Error signing and approving", error);
    } finally {
      setLoader(false);
    }
  };

  const handleFreelancerSignAndSend = async () => {
    setLoader(true);
    try {
      await freelancerSign(
        agreement.projectDetails.description,
        agreement.amount,
        agreement.id
      );
      updateAgreementStatus("pending"); // Update status locally
    } catch (error) {
      console.error("Error signing and sending", error);
    } finally {
      setLoader(false);
    }
  };

  const handleFreelancerComplete = async () => {
    setLoader(true);
    try {
      await updateByFreelancer(agreement.id, "completed");
      updateAgreementStatus("completed"); // Update status locally
    } catch (error) {
      console.error("Error updating by freelancer", error);
    } finally {
      setLoader(false);
    }
  };

  const handleClientVerify = async () => {
    setLoader(true);
    try {
      await verifyCompletion(agreement.id);
      updateAgreementStatus("verified"); // Update status locally
    } catch (error) {
      console.error("Error verifying agreement", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="p-3 w-full flex">
        <span className="w-10">
          <Avatar>
            <AvatarFallback>{agreement.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </span>
        <div className="w-full pl-4">
          <CardTitle>{agreement.name || "Client Name"}</CardTitle>
          <CardDescription>{agreement.email}</CardDescription>
        </div>
      </div>
      <hr />
      <div className="h-fit w-full pt-4">
        <Label className="text-xl">Agreement Details</Label>
        <CardDescription className="mb-5">
          {agreement.projectDetails.description || "No description available."}
        </CardDescription>
        <hr className="mb-4" />
        <Label className="text-base">Deadline</Label>
        <CardDescription className="mb-5">
          {agreement.projectDetails.deadline
            ? new Date(agreement.projectDetails.deadline).toDateString()
            : "N/A"}
        </CardDescription>
        <hr className="mb-4" />
        <Label className="text-base">Amount</Label>
        <CardDescription className="mb-5">
          {agreement.amount ? `$${agreement.amount}` : "N/A"}
        </CardDescription>
        <hr className="mb-4" />

        {agreement.requestedBy === "client" &&
          agreement.status === "pending" && (
            <CardFooter className="mt-9 flex justify-end">
              <Button onClick={handleSignAndApprove}>Sign and Approve</Button>
            </CardFooter>
          )}

        {agreement.requestedBy === "freelancer" &&
          agreement.status === "initial" && (
            <CardFooter className="mt-9 flex justify-end">
              <Button onClick={handleFreelancerSignAndSend}>
                Sign and Send
              </Button>
            </CardFooter>
          )}

        {agreement.requestedBy === "freelancer" &&
          agreement.status === "active" && (
            <CardFooter className="mt-9 flex justify-end">
              <Button onClick={handleFreelancerComplete}>Completed</Button>
            </CardFooter>
          )}

        {agreement.requestedBy === "client" &&
          agreement.status === "completed" && (
            <CardFooter className="mt-9 flex justify-end">
              <Button onClick={handleClientVerify}>Verify</Button>
            </CardFooter>
          )}
      </div>
    </div>
  );
}

export default AgreementReader;
