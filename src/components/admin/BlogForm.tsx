import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Save, Clock } from "lucide-react";
import { Panel, inputClass, btnClass, btnPrimaryClass } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { BlogCategory, BlogStatus } from "@/types";
// import { 
//   localToNigeriaTime,
//   utcToLocalInput, 
//   formatNigeriaDate,
//   formatNigeriaShort,
//   isFutureDate,
//   getCurrentNigeriaTime,
// } from "@/utils/date";

export const STATUSES: BlogStatus[] = ["draft", "scheduled", "published"];
export const CATEGORIES = ["letters", "character_stories", "women_stories", "others"];

export interface BlogDraft {
  title: string;
  excerpt: string;
  body: string;
  category: BlogCategory;
  status: BlogStatus;
  image_url: string | null;
  scheduled_publish_at: string | null; // Will be stored as WAT
}

export const emptyDraft: BlogDraft = {
  title: "",
  excerpt: "",
  body: "",
  category: "letters",
  status: "draft",
  image_url: null,
  scheduled_publish_at: null,
};

export function BlogForm({
  initial,
  saving,
  onSave,
  onCancel,
}: {
  initial: BlogDraft;
  saving: boolean;
  onSave: (draft: BlogDraft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<BlogDraft>(initial);
  const set = <K extends keyof BlogDraft>(key: K, value: BlogDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (draft.title.trim().length < 3) {
      toast.error("Give the post a title.");
      return;
    }
    
    if (!draft.excerpt.trim()) {
      toast.error("Please add an excerpt.");
      return;
    }
    
    if (!draft.body.trim() || draft.body === "<p><br></p>") {
      toast.error("Please add content to the post.");
      return;
    }
    
    if (!draft.category.trim()) {
      toast.error("Please add a category.");
      return;
    }
    
    // if (draft.status === "scheduled" && !draft.scheduled_publish_at) {
    //   toast.error("Please set a scheduled publish date.");
    //   return;
    // }

    // if (draft.status === "scheduled" && draft.scheduled_publish_at) {
    //   if (!isFutureDate(draft.scheduled_publish_at)) {
    //     toast.error("Scheduled publish date must be in the future (Nigerian time).");
    //     return;
    //   }
    // }

    onSave(draft);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Panel className="p-5 sm:p-6">
        <div className="space-y-4">
          <Field label="Title">
            <input
              value={draft.title}
              onChange={(e) => set("title", e.target.value)}
              className={`${inputClass} w-full text-[1.05rem]`}
              placeholder="My First Blog Post"
              required
            />
          </Field>

          <Field label="Excerpt">
            <textarea
              value={draft.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={3}
              className={`${inputClass} w-full resize-y`}
              placeholder="This is a short summary of my blog post"
              required
            />
          </Field>

          <Field label="Content">
            <RichTextEditor
              value={draft.body}
              onChange={(html) => set("body", html)}
              minHeight={340}
            />
          </Field>
        </div>
      </Panel>

      <div className="space-y-5">
        <Panel className="p-5">
          <div className="space-y-4">
            <Field label="Status">
              <select
                value={draft.status}
                onChange={(e) => {
                  const newStatus = e.target.value as BlogStatus;
                  set("status", newStatus);
                  if (newStatus !== "scheduled") {
                    set("scheduled_publish_at", null);
                  }
                }}
                className={`${inputClass} w-full`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </Field>

            {/* {draft.status === "scheduled" && (
              <Field label="Schedule Publish Date & Time (Nigerian Time)">
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={utcToLocalInput(draft.scheduled_publish_at)}
                    onChange={(e) => {
                      const localValue = e.target.value;
                      // Convert to Nigerian time (WAT) for storage
                      const nigeriaTime = localToNigeriaTime(localValue);
                      console.log('Local value:', localValue);
                      console.log('Nigeria time (WAT):', nigeriaTime);
                      set("scheduled_publish_at", nigeriaTime);
                    }}
                    className={`${inputClass} w-full pl-10`}
                    min={getCurrentNigeriaTime()}
                  />
                  <Clock 
                    size={16} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
                
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-blue-50/10 p-2">
                  <span className="text-[0.7rem] font-medium text-blue-600">🇳🇬</span>
                  <span className="text-[0.7rem] text-muted-foreground">
                    Nigerian Time (WAT - UTC+1)
                  </span>
                </div>

                {draft.scheduled_publish_at && (
                  <div className="mt-2 rounded-lg bg-emerald/5 p-3 space-y-1 border border-emerald/20">
                    <p className="text-[0.75rem] font-medium text-emerald">
                      📅 Scheduled for Nigeria time:
                    </p>
                    <p className="text-[0.85rem] font-semibold text-plum">
                      {formatNigeriaDate(draft.scheduled_publish_at)}
                    </p>
                    <p className="text-[0.65rem] text-muted-foreground">
                      Stored as: {draft.scheduled_publish_at}
                    </p>
                  </div>
                )}
              </Field>
            )} */}

            <Field label="Category">
              <select name="category" value={draft.category} onChange={(e) => {
                  const newCategory = e.target.value as BlogCategory;
                  set("category", newCategory);
                }} id="" className={`${inputClass} w-full`}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
                
              </select>
              
            </Field>

            <Field label="Image URL">
              <input
                value={draft.image_url ?? ""}
                onChange={(e) => set("image_url", e.target.value || null)}
                className={`${inputClass} w-full`}
                placeholder="https://example.com/image.jpg"
              />
            </Field>

            {draft.image_url && (
              <div className="mt-2">
                <img
                  src={draft.image_url}
                  alt="Image preview"
                  className="h-32 w-full rounded-xl object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-plum">Post Preview</h4>
            <div className="rounded-lg bg-[color:var(--tint)] p-4">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {draft.status}
              </p>
              <p className="mt-1 text-sm font-semibold line-clamp-2">
                {draft.title || "Untitled"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {draft.excerpt || "No excerpt"}
              </p>
              {/* {draft.status === "scheduled" && draft.scheduled_publish_at && (
                <div className="mt-2 rounded-lg bg-gold/5 p-2 border border-gold/20">
                  <p className="text-[0.65rem] text-gold font-medium">Scheduled for:</p>
                  <p className="text-[0.75rem] text-plum font-medium">
                    {formatNigeriaShort(draft.scheduled_publish_at)} (WAT)
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </Panel>

        <div className="flex gap-3">
          <button onClick={onCancel} className={`${btnClass} flex-1 justify-center`}>
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className={`${btnPrimaryClass} flex-1 justify-center`}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Saving..." : "Save post"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-plum">
        {label}
      </label>
      {children}
    </div>
  );
}