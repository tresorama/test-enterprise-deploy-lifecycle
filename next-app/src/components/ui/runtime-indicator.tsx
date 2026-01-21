import { getRuntime } from "@/utils/get-runtime";

export function RuntimeIndicator() {
  const runtimeName = getRuntime();

  return (
    <div className="px-1.5 py-0.5 text-xs/[1.25] bg-zinc-950 text-zinc-500 font-medium border border-zinc-500/20 rounded">
      {runtimeName}
    </div>
  );
}