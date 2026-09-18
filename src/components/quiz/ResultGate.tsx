import type { ReactNode } from "react";
import { EmailCapture } from "../site/EmailCapture";

interface AssessmentData {
  assessmentName: 'Money Personality' | 'Financial Health Check' | 'Risk Profile';
  assessmentDescription?: string;
  resultsSummary?: React.ReactNode | string;
}

export function ResultGate({
  title,
  description,
  buttonLabel,
  buttonVariant,
  children,
  assessmentData,
  userName,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  buttonVariant?: "primary" | "green" | "gold";
  children?: ReactNode;
  assessmentData?: AssessmentData;
  userName?: string;
}) {
  return (
    <div className="mt-6 rounded-[10px] border border-dashed border-gold bg-[color:var(--tint)] p-6">
      <h3>{title}</h3>
      <p className="text-[0.85rem] text-muted-foreground">{description}</p>
      <div className="mt-3">
        <EmailCapture
          buttonLabel={buttonLabel}
          buttonVariant={buttonVariant}
          successMessage="Sent, check your inbox!"
          type={assessmentData ? "assessment" : "newsletter"}
          assessmentData={assessmentData}
          userName={userName}
          placeholder="Your email"
        />
      </div>
      <p className="mt-2.5 text-[0.85rem] text-muted-foreground">
        By sending, you join the free Money Simplified weekly letter.
      </p>
      {children}
    </div>
  );
}
