"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Issue title..." />
      </TextField.Root>
      <SimpleMDE placeholder="Please describe your issue..." />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssue;
