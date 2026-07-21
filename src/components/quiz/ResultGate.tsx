import type { ReactNode } from "react";
import { EmailCapture } from "@/components/site/EmailCapture";

export function ResultGate({
  title,
  description,
  buttonLabel,
  buttonVariant,
  children,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  buttonVariant?: "primary" | "green" | "gold";
  children?: ReactNode;
}) {
  return (
    <div className="mt-6 rounded-[10px] border border-dashed border-gold bg-[color:var(--tint)] p-6">
      <h3>{title}</h3>
      <p className="text-[0.85rem] text-muted-foreground">{description}</p>
      <div className="mt-3">
        <EmailCapture
          buttonLabel={buttonLabel}
          buttonVariant={buttonVariant}
          successMessage="Sent — check your inbox. (Prototype: this connects to Kit in the live build.)"
        />
      </div>
      <p className="mt-2.5 text-[0.85rem] text-muted-foreground">
        By sending, you join the free Money Simplified weekly letter. Leave any time.
      </p>
      {children}
    </div>
  );
}
