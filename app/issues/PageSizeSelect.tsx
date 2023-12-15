"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PageSizeSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue="5"
      onValueChange={(pageSize) => {
        const params = new URLSearchParams();
        params.append("pageSize", pageSize);
        if (searchParams.get("status"))
          params.append("status", searchParams.get("status")!);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/issues/${query}`);
      }}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Page Size</Select.Label>
          <Select.Item value="5">5</Select.Item>
          <Select.Item value="10">10</Select.Item>
          <Select.Item value="15">15</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default PageSizeSelect;
