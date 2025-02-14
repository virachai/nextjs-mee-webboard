// components/ui/sheet.tsx
import { ReactNode } from "react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right" | "top" | "bottom";
  children: ReactNode;
  className?: string;
}

export function Sheet({
  open,
  onOpenChange,
  side = "right",
  children,
  className,
}: SheetProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform transform ${
        open
          ? "translate-x-0"
          : side === "right"
          ? "translate-x-full"
          : "-translate-x-full"
      } ${
        side === "left" || side === "right" ? "w-80" : "h-80"
      } bg-black bg-opacity-50`}
      onClick={() => onOpenChange(false)}
    >
      <div
        className={`absolute top-0 ${
          side === "left" ? "left-0" : "right-0"
        } w-full ${
          side === "top" || side === "bottom" ? "h-full" : "h-80"
        } bg-white overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface SheetTriggerProps {
  asChild: boolean;
  children: ReactNode;
}

export function SheetTrigger({ asChild, children }: SheetTriggerProps) {
  console.log(asChild);
  return <>{children}</>;
}

export function SheetContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function SheetHeader({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}
