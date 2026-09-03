import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader, Panel, inputClass, btnPrimaryClass } from "@/components/admin/ui";
import { Loader2, User } from "lucide-react";

// Types
interface AdminProfile {
  id: string;
  full_name: string;
  email: string;
  bio: string;
  avatar_url: string | null;
  notify_waitlist: boolean;
  notify_newsletter: boolean;
  notify_assessments: boolean;
  notify_comments: boolean;
}

const NOTIFY: { key: keyof AdminProfile; label: string; hint: string }[] = [
  { key: "notify_waitlist", label: "Waitlist signups", hint: "Email me when someone joins the waitlist." },
  { key: "notify_newsletter", label: "Newsletter signups", hint: "Email me when someone subscribes." },
  { key: "notify_assessments", label: "Assessment completions", hint: "Email me when a quiz is completed." },
  { key: "notify_comments", label: "Blog comments", hint: "Email me when a reader leaves a comment." },
];

// Mock data
const mockProfile: AdminProfile = {
  id: "1",
  full_name: "Temi Egenti",
  email: "temi@chonzzi.com",
  bio: "Founder & Lead Instructor at The Chonzzi Company. Helping people understand money.",
  avatar_url: null,
  notify_waitlist: true,
  notify_newsletter: true,
  notify_assessments: false,
  notify_comments: true,
};

// Mock API functions
const mockApi = {
  getProfile: async (): Promise<AdminProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...mockProfile }), 500);
    });
  },
  updateProfile: async (patch: Partial<AdminProfile>): Promise<AdminProfile> => {
    return new Promise((resolve) => {
      // Merge the patch into the mock profile
      Object.assign(mockProfile, patch);
      setTimeout(() => resolve({ ...mockProfile }), 500);
    });
  },
};

export function SettingsPage() {
  const [data, setData] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<AdminProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load profile data
  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const result = await mockApi.getProfile();
      setData(result);
      setForm(result);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Save profile
  const saveProfile = async (patch: Partial<AdminProfile>) => {
    try {
      setIsSaving(true);
      const updated = await mockApi.updateProfile(patch);
      setData(updated);
      setForm(updated);
      toast.success("Settings saved");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !form) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-plum" />
      </div>
    );
  }

  const set = <K extends keyof AdminProfile>(key: K, value: AdminProfile[K]) =>
    setForm({ ...form, [key]: value });

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Your admin profile and the alerts you want to receive."
      />

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Panel className="p-6">
          <h3 className="m-0 text-[1.05rem]">Profile</h3>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[color:var(--tint)] text-plum">
              {form.avatar_url ? (
                <img src={form.avatar_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <User size={24} />
              )}
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-plum">
                Avatar URL
              </label>
              <input
                value={form.avatar_url ?? ""}
                onChange={(e) => set("avatar_url", e.target.value || null)}
                className={`${inputClass} w-full`}
                placeholder="https://"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-plum">
                Full name
              </label>
              <input
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-plum">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-plum">
              Short bio
            </label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              className={`${inputClass} w-full resize-y`}
            />
          </div>

          <button
            onClick={() => saveProfile(form)}
            disabled={isSaving}
            className={`${btnPrimaryClass} mt-5`}
          >
            {isSaving && <Loader2 size={14} className="animate-spin" />}
            Save changes
          </button>
        </Panel>

        <Panel className="p-6">
          <h3 className="m-0 text-[1.05rem]">Notifications</h3>
          <p className="mt-1 text-[0.85rem] text-muted-foreground">
            Choose what lands in your inbox.
          </p>
          <div className="mt-5 space-y-3">
            {NOTIFY.map((n) => {
              const on = form[n.key] as boolean;
              return (
                <button
                  key={n.key}
                  onClick={() => {
                    const next = { ...form, [n.key]: !on };
                    setForm(next);
                    saveProfile({ [n.key]: !on });
                  }}
                  disabled={isSaving}
                  className="flex w-full items-start gap-3 rounded-xl border border-line p-4 text-left transition hover:bg-[color:var(--tint)] disabled:opacity-50"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${
                      on ? "bg-emerald" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-white transition ${on ? "translate-x-4" : ""}`}
                    />
                  </span>
                  <span>
                    <span className="block text-[0.9rem] font-semibold text-plum">{n.label}</span>
                    <span className="block text-[0.82rem] text-muted-foreground">{n.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}

export default SettingsPage;