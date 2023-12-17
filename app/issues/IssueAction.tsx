import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import PageSizeSelect from "./PageSizeSelect";
import SortOrderSelect from "./SortOrderSelect";

const IssueAction = () => {
  return (
    <Flex justify="between">
      <Flex gap="3">
        <IssueStatusFilter />
        <PageSizeSelect />
        <SortOrderSelect />
      </Flex>
      <Button>
        <Link href="/issues/new">Create Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
