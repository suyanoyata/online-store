import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-screen absolute flex items-center justify-center top-0 left-0 z-20 bg-white">
      <Loader2 className="animate-spin" />
    </div>
  );
}
