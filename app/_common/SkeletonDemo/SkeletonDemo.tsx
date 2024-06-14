import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDemo = () => {
  return (
    <div
      style={{ width: "200px" }}
      className="flex items-center space-x-4 w-12"
    >
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonDemo;
