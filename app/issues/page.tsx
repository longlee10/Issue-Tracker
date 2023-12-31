import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueAction from "./IssueAction";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: Props) => {
  // data for filtering and sorting
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const orderBy =
    searchParams.orderBy === undefined
      ? { [(searchParams.orderBy = "title")]: searchParams.sortOrder || "asc" }
      : { [searchParams.orderBy]: searchParams.sortOrder };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 5;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize, // the number of records to be skipped
    take: pageSize,
  });

  // get total number of records to pass to pagination component
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="5">
      <IssueAction />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all the project issues",
};
export const dynamic = "force-dynamic";
export default IssuePage;
