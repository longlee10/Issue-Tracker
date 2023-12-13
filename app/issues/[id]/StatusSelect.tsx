"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  return (
    <Select.Root defaultValue={issue.status || "OPEN"}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Change Status</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
