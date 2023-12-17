"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const SortOrderSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("sortOrder") || "asc"}
      onValueChange={(sortOrder) => {
        const params = new URLSearchParams();
        params.append("sortOrder", sortOrder);
        if (searchParams.get("status"))
          params.append("status", searchParams.get("status")!);
        if (searchParams.get("pageSize"))
          params.append("pageSize", searchParams.get("pageSize")!);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/issues/${query}`);
      }}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="asc">Sort by: Ascending</Select.Item>
          <Select.Item value="desc">Sort by: Descending</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SortOrderSelect;
