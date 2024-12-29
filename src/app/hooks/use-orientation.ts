import { parseAsString, useQueryState } from "nuqs";

export function useOrientation() {
  const [orientation, setOrientation] = useQueryState(
    "orientation",
    parseAsString.withDefault("all").withOptions({ history: "push" })
  );

  return {
    orientation,
    setOrientation,
  };
}
