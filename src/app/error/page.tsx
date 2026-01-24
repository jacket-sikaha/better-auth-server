"use client";
import { Button } from "antd";
import { redirect, useSearchParams } from "next/navigation";

// Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const searchParams = useSearchParams();
  console.log("error:", error);

  return (
    <div className=" h-svh flex flex-col items-center justify-center gap-4">
      <h2>Something went wrong!</h2>
      <div>错误详情:</div>
      {searchParams.entries().map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
      {error && <div>错误信息: {error.message}</div>}
      <Button onClick={() => redirect(searchParams.get("redirect") || "/")}>
        Try again
      </Button>
    </div>
  );
}
