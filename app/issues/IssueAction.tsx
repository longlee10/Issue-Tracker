import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import PageSizeSelect from "./PageSizeSelect";

const IssueAction = () => {
  return (
    <Flex justify="between">
      <Flex gap="3">
        <IssueStatusFilter />
        <PageSizeSelect />
      </Flex>
      <Button>
        <Link href="/issues/new">Create Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
