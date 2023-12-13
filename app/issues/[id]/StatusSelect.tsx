"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  const changeStatus = (issueStatus: string) => {
    if (issue.assignedToUserId && issueStatus === "OPEN") {
      toast.error(
        "Cannot change status of an assigned issue to OPEN. Please unassign first."
      );
      return;
    }
    if (!issue.assignedToUserId && issueStatus === "IN_PROGRESS") {
      toast.error(
        "Cannot change status of an unassigned issue. Please assign first."
      );
      return;
    }
    axios
      .patch(`/api/issues/${issue.id}`, {
        status: issueStatus,
      })
      .catch(() => toast.error("Changes cannot be saved."))
      .then(() => router.refresh());
  };

  return (
    <Select.Root
      defaultValue={issue.status || "OPEN"}
      onValueChange={changeStatus}
    >
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
