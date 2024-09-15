import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

function TextEditor({
  values,
  handleChange,
  errors,
  touched,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <>
      <Label
        htmlFor="description"
        className={`text-xl font-bold mb-5 ${
          errors.clientEmail && touched.clientEmail ? "border-red-600" : ""
        }`}
      >
        Agreement Description
      </Label>
      <Textarea
        placeholder="Type you Agreement details here..."
        id="description"
        name="description"
        onChange={handleChange}
        value={values.description}
        className={`${
          errors.description && touched.description ? "border-red-600" : ""
        }`}
      />
      {errors.description && touched.description && (
        <span className="text-xs text-red-600">{errors.description}</span>
      )}
      <div className="flex justify-end">
        <Button
          className="mt-16 pl-9 pr-9"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default TextEditor;
