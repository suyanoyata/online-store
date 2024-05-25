export const NotationAlert = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-2 py-2 px-3 bg-red-300/70 rounded-[4px] border-l-4 border-red-400">
      <p className="text-sm font-medium">{children}</p>
    </div>
  );
};
