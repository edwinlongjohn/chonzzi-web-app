import { useState, type FormEvent, useRef } from "react";
import { BrandButton } from "./BrandButton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSubscribeMutation } from "@/store/api/subscriptionApi";
import { useJoinWaitlistMutation } from "@/store/api/waitlistApi";

// Add reCAPTCHA script to your index.html or head
// <script src="https://www.google.com/recaptcha/api.js" async defer></script>

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface EmailCaptureProps {
  buttonLabel: string;
  buttonVariant?: "primary" | "green" | "gold";
  successMessage: string;
  nameField?: boolean;
  placeholder?: string;
  className?: string;
  source?: string;
  showRecaptcha?: boolean;
  type?: "newsletter" | "waitlist";
}

export function EmailCapture({
  buttonLabel,
  buttonVariant = "primary",
  successMessage,
  nameField = false,
  placeholder = "Your email",
  className,
  source = "website",
  showRecaptcha = true,
  type = "newsletter",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [subscribe] = useSubscribeMutation();
  const [joinWaitlist] = useJoinWaitlistMutation();

  // Get reCAPTCHA site key from environment
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMsg("");
    
    // Validate email
    if (!email || !email.includes("@")) {
      setMsg("Enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    // If name field is required but empty
    if (nameField && !name.trim()) {
      setMsg("Please enter your name.");
      toast.error("Please enter your name.");
      return;
    }

    setIsLoading(true);

    try {
      let recaptchaToken: string | undefined;

      // Get reCAPTCHA token if enabled
      if (showRecaptcha && recaptchaSiteKey) {
        try {
          await window.grecaptcha.ready(async () => {
            recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, {
              action: type === "waitlist" ? "join_waitlist" : "subscribe",
            });
          });
        } catch (recaptchaError) {
          console.error("reCAPTCHA error:", recaptchaError);
        }
      }

      // Call the appropriate API based on type
      if (type === "waitlist") {
        await joinWaitlist({
          email: email.trim(),
          name: nameField ? name.trim() : email.trim().split('@')[0],
          source,
        }).unwrap();
      } else {
        await subscribe({
          email: email.trim(),
          name: nameField ? name.trim() : undefined,
          recaptchaToken,
        }).unwrap();
      }

      // Show success message
      setMsg(successMessage);
      setIsSuccess(true);
      toast.success(successMessage);
      
      // Clear form
      setEmail("");
      setName("");
    } catch (error: any) {
      console.error("Submission error:", error);
      
      const errorMessage = error?.data?.message || "Failed to submit. Please try again.";
      setMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // If already successful, show success state
  if (isSuccess) {
    return (
      <div className={cn("text-[0.95rem] text-emerald", className)}>
        <p className="font-semibold">✓ {msg || successMessage}</p>
      </div>
    );
  }

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className={cn("flex flex-wrap items-center gap-3", className)}
    >
      {nameField && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          disabled={isLoading}
          className="w-full max-w-[340px] placeholder-[#333232] text-gray-900 placeholder-black rounded-lg border border-line bg-white px-[15px] py-3 font-serif text-[0.95rem] focus:outline-2 focus:outline-gold disabled:opacity-60"
          required={nameField}
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="w-full max-w-[340px] placeholder-[#333232] text-gray-900 rounded-lg border border-line bg-white px-[15px] py-3 font-serif text-[0.95rem] focus:outline-2 focus:outline-gold disabled:opacity-60"
        required
      />
      
      {/* Hidden reCAPTCHA badge */}
      {showRecaptcha && recaptchaSiteKey && (
        <div 
          className="g-recaptcha" 
          data-sitekey={recaptchaSiteKey} 
          data-size="invisible"
          data-badge="inline"
        />
      )}
      
      <BrandButton type="submit" variant={buttonVariant} disabled={isLoading}>
        {isLoading ? "Submitting..." : buttonLabel}
      </BrandButton>
      
      {msg && !isSuccess && (
        <p className="w-full text-[0.85rem] text-destructive">{msg}</p>
      )}
      
      {/* reCAPTCHA notice */}
      {showRecaptcha && recaptchaSiteKey && (
        <p className="mt-1 w-full text-[0.65rem] text-muted-foreground">
          Protected by reCAPTCHA
        </p>
      )}
    </form>
  );
}