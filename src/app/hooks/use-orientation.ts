import { parseAsString, useQueryState } from "nuqs";
import { useTransition } from "react";

export function useOrientation() {
  const [isLoading, startTransition] = useTransition();
  const [orientation, setOrientation] = useQueryState(
    "orientation",
    parseAsString.withDefault("all").withOptions({ history: "push" })
  );

  return {
    orientation,
    setOrientation,
  };
}
