import { useState, type FormEvent } from "react";
import { BrandButton } from "./BrandButton";
import { cn } from "@/lib/utils";

export function EmailCapture({
  buttonLabel,
  buttonVariant = "primary",
  successMessage,
  nameField = false,
  placeholder = "Your email",
  className,
}: {
  buttonLabel: string;
  buttonVariant?: "primary" | "green" | "gold";
  successMessage: string;
  nameField?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMsg("Enter a valid email address.");
      return;
    }
    setMsg(successMessage);
  };

  return (
    <form onSubmit={submit} className={cn("flex flex-wrap items-center gap-3", className)}>
      {nameField && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          className="w-full max-w-[340px] rounded-lg border border-line bg-white px-[15px] py-3 font-serif text-[0.95rem] focus:outline-2 focus:outline-gold"
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="w-full max-w-[340px] rounded-lg border border-line bg-white px-[15px] py-3 font-serif text-[0.95rem] focus:outline-2 focus:outline-gold"
      />
      <BrandButton type="submit" variant={buttonVariant}>
        {buttonLabel}
      </BrandButton>
      {msg && <p className="w-full text-[0.85rem] text-muted-foreground">{msg}</p>}
    </form>
  );
}

