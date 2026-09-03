import { useEffect, useState, type FormEvent, useMemo } from "react";
import { useNavigate} from "react-router-dom";
import { fieldClass, labelClass, submitClass } from "@/components/layout/auth/AuthLayout";
import { Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/store/api/authApi";
import { loginSchema } from "@/lib/formSchema";
import { z } from "zod";
import { useAppSelector } from "@/store/hooks";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  // Real-time validation for email
  const emailErrors = useMemo(() => {
    if (!touched.email) return [];
    try {
      loginSchema.shape.email.parse(email);
      return [];
    } catch (err) {
      if (err instanceof z.ZodError) {
        return err.issues.map(issue => issue.message);
      }
      return [];
    }
  }, [email, touched.email]);

  // Real-time validation for password
  const passwordErrors = useMemo(() => {
    if (!touched.password) return [];
    try {
      loginSchema.shape.password.parse(password);
      return [];
    } catch (err) {
      if (err instanceof z.ZodError) {
        return err.issues.map(issue => issue.message);
      }
      return [];
    }
  }, [password, touched.password]);

  const isEmailValid = emailErrors.length === 0 && email.length > 0;
  const isPasswordValid = passwordErrors.length === 0 && password.length > 0;
  const isFormValid = isEmailValid && isPasswordValid;
  const { isAuthenticated } = useAppSelector(state => state.auth);


  useEffect(() => {
    // Check if user is already logged in
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      navigate("/chonzzi-admin", { replace: true });

    }

  }, [navigate, isAuthenticated]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTouched({ email: true, password: true });

    try {
      // Validate with Zod
      const validated = loginSchema.parse({ email, password, rememberMe: remember });

      // Call the actual login API
      const result = await login(validated).unwrap();

      if (result.success && result.data) {
        setLoading(false);
        navigate("/chonzzi-admin");
      }
    } catch (err: any) {
      setLoading(false);
      if (err?.issues) {
        // Zod validation error - fields will show errors via touched state
        setTouched({ email: true, password: true });
      } else {
        // API error
        setError(err?.data?.message || "That email and password combination did not work.");
      }
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    // Clear field error when typing
    if (touched[field]) {
      setTouched(prev => ({ ...prev, [field]: true }));
    }
  };

  const isLoading = loading || isLoginLoading;

  return (
    <>
      <p className="eyebrow">Admin</p>
      <h1 className="mt-3 text-[1.85rem] leading-tight">Sign in to your workspace</h1>
      <p className="mt-2 text-[0.92rem] text-muted-foreground">
        Use the email and password tied to your admin account.
      </p>

      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        {error && (
          <div className="flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-[0.85rem] text-destructive">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="email">
            Email address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`${fieldClass} ${touched.email && !isEmailValid && email.length > 0
                  ? "border-destructive ring-destructive/20 focus:ring-destructive/20"
                  : touched.email && isEmailValid && email.length > 0
                    ? "border-emerald-500 ring-emerald-500/20 focus:ring-emerald-500/20"
                    : ""
                }`}
              placeholder="you@chonzzi.com"
            />
            {touched.email && email.length > 0 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isEmailValid ? (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={18} className="text-destructive" />
                )}
              </div>
            )}
          </div>
          {touched.email && emailErrors.length > 0 && (
            <div className="mt-2 space-y-1">
              {emailErrors.map((err, index) => (
                <p key={index} className="text-sm text-destructive flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  <span>{err}</span>
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`${fieldClass} ${touched.password && !isPasswordValid && password.length > 0
                  ? "border-destructive ring-destructive/20 focus:ring-destructive/20"
                  : touched.password && isPasswordValid && password.length > 0
                    ? "border-emerald-500 ring-emerald-500/20 focus:ring-emerald-500/20"
                    : ""
                }`}
              placeholder="••••••••"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isPasswordVisible ? (
                    <EyeOff onClick={() => setIsPasswordVisible(!isPasswordVisible)} size={18} className="text-emerald-500" />
                  ) : (
                    <Eye onClick={() => setIsPasswordVisible(!isPasswordVisible)} size={18} className="text-emerald-500" />
                  )}
                </div>
            {touched.password && password.length > 0 && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                {isPasswordValid ? (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={18} className="text-destructive" />
                )}
              </div>
            )}
          </div>
          {touched.password && passwordErrors.length > 0 && (
            <div className="mt-2 space-y-1">
              {passwordErrors.map((err, index) => (
                <p key={index} className="text-sm text-destructive flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  <span>{err}</span>
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-[0.85rem] text-muted-foreground">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-[oklch(0.28_0.11_318)]"
            />
            Remember me
          </label>
         
        </div>

        <button type="submit" disabled={isLoading || !isFormValid} className={submitClass}>
          {isLoading && <Loader2 size={15} className="animate-spin" />}
          {isLoading ? "Signing in" : "Sign in"}
        </button>
      </form>

     
    </>
  );
}