export function Badge({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="flex justify-center items-center gap-1 px-0.5 py-0.5 text-xs/[1.25] bg-zinc-900 text-zinc-500 font-medium border border-zinc-500/20 rounded">
      {children}
    </span>
  );
}