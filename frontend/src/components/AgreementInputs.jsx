import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

function AgreementInputs({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
}) {
  return (
    <>
      <div className="h-full w-full">
        <Label className="text-base" htmlFor="clientEmail">
          Client's Email
        </Label>

        <div className="mb-5 ">
          <Input
            className={`${
              errors.clientEmail && touched.clientEmail ? "border-red-600" : ""
            }`}
            id="clientEmail"
            name="clientEmail"
            type="email"
            onChange={handleChange}
            value={values.clientEmail}
            placeholder="john@example.com"
          ></Input>
          {errors.clientEmail && touched.clientEmail && (
            <span className="text-xs text-red-600">{errors.clientEmail}</span>
          )}
        </div>

        <Label
          className="text-base"
          htmlFor="amount"
        >{`Project Amount ($)`}</Label>

        <div className="mb-5 ">
          <Input
            className={`${
              errors.amount && touched.amount ? "border-red-600" : ""
            }`}
            name="amount"
            type="number"
            id="amount"
            placeholder="2000.00"
            onChange={handleChange}
            value={values.amount}
          ></Input>
          {errors.amount && touched.amount && (
            <span className="text-xs text-red-600">{errors.amount}</span>
          )}
        </div>

        <Label className="text-base" htmlFor="deadline">
          Select Project Deadline
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !values.deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {values.deadline ? (
                format(values.deadline, "PPP")
              ) : (
                <span>Pick a deadline</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={values.deadline}
              onSelect={(date) => setFieldValue("deadline", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.deadline && touched.deadline && (
          <span className="text-xs text-red-600">{errors.deadline}</span>
        )}
      </div>
    </>
  );
}

export default AgreementInputs;
