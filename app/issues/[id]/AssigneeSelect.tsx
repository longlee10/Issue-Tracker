"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignUser = (userId: string) => {
    const newStatus = userId ? "IN_PROGRESS" : "OPEN";
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null,
        status: newStatus,
      })
      .catch(() => toast.error("Changes cannot be saved."))
      .then(() => router.refresh());
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignUser}
      >
        <Select.Trigger placeholder="Assignee" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assignee</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3, // retry 3 times
  });

export default AssigneeSelect;
