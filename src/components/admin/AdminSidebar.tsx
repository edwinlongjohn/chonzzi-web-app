import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Mail,
  ClipboardList,
  FileText,
  Home,
  Menu,
  X,
  LogOut,
  Loader2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logout } from "@/store/slices/authSlice";

import LOGO_WHITE from "@/assets/chonzzi-logo-white.png";

const NAV: {
  to: "/chonzzi-admin" | "/chonzzi-admin/waitlist" | "/chonzzi-admin/newsletter" | "/chonzzi-admin/assessments" | "/chonzzi-admin/blog" | "/chonzzi-admin/settings";
  label: string;
  icon: typeof Users;
  exact?: boolean;
}[] = [
    { to: "/chonzzi-admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/chonzzi-admin/waitlist", label: "Waitlist", icon: Users },
    { to: "/chonzzi-admin/newsletter", label: "Newsletter", icon: Mail },
    { to: "/chonzzi-admin/assessments", label: "Assessments", icon: ClipboardList },
    { to: "/chonzzi-admin/blog", label: "Blog", icon: FileText },
    // { to: "/chonzzi-admin/settings", label: "Settings", icon: Settings },
  ];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.06em] no-underline transition",
              active
                ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                : "text-[#EDE6F0]/70 hover:bg-white/8 hover:text-white",
            )}
          >
            <item.icon size={17} className={active ? "text-gold-soft" : ""} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // Clear Redux state
      dispatch(logout());

      // Navigate to login page
      navigate('/authentication/login', { replace: true });

      // Show success message
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);

      // Even if something fails, try to clear everything
      dispatch(logout());

      toast.info('Logged out');
      navigate('/authentication/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className="flex h-full flex-col py-6"
      style={{
        background:
          "linear-gradient(170deg, oklch(0.20 0.08 320) 0%, oklch(0.16 0.06 318) 60%, oklch(0.14 0.05 316) 100%)",
      }}
    >
      <Link to="/" className="mb-8 flex items-center gap-3 px-6 no-underline">
        <img src={LOGO_WHITE} alt="The Chonzzi Company" className="h-9 w-auto" />
      </Link>
      <NavList onNavigate={onNavigate} />
      <div className="mt-6 border-t border-white/10 px-4 pt-4">
        <p className="px-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-[#EDE6F0]/45">
          Team workspace
        </p>
        <Link
          to="/"
          onClick={onNavigate}
          className="mt-2 flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.06em] text-[#EDE6F0]/70 no-underline transition hover:bg-white/8 hover:text-white"
        >
          <Home size={17} />
          Back to site
        </Link>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.06em] text-[#EDE6F0]/70 no-underline transition hover:bg-destructive/25 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Logging out...
            </>
          ) : (
            <>
              <LogOut size={17} />
              Log out
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-[254px] shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-[254px]">
          <SidebarInner />
        </div>
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-plum text-white shadow-lg lg:hidden"
      >
        <Menu size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-plum-deep/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="relative h-full w-[264px]"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X size={16} />
              </button>
              <SidebarInner onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}