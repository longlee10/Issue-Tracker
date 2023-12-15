"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const PageSizeSelect = () => {
  return (
    <Select.Root defaultValue="5">
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
