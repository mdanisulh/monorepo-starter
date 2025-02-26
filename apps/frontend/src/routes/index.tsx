import { Button } from "@monorepo/ui/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button>Click me!</Button>
    </div>
  );
}
