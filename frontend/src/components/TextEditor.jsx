import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor() {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <Label>Agreement Details</Label>
      <ReactQuill
        className="h-full w-full"
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </>
  );
}

export default TextEditor;
