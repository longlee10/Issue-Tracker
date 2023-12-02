import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const LoadingNewIssueForm = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" className="mb-3" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssueForm;
