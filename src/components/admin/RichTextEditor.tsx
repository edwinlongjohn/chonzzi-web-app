import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Eraser,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Cmd = { icon: typeof Bold; label: string; run: () => void };

/**
 * Lightweight summernote-style WYSIWYG editor.
 * Emits HTML through onChange.
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your letter...",
  minHeight = 260,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState(false);

  // Only sync from props when the editor is not the source of the change.
  useEffect(() => {
    const el = ref.current;
    if (el && !source && el.innerHTML !== value) el.innerHTML = value || "";
  }, [value, source]);

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand("styleWithCSS", false, "false");
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML ?? "");
  };

  const groups: Cmd[][] = [
    [
      { icon: Bold, label: "Bold", run: () => exec("bold") },
      { icon: Italic, label: "Italic", run: () => exec("italic") },
      { icon: Underline, label: "Underline", run: () => exec("underline") },
      { icon: Strikethrough, label: "Strikethrough", run: () => exec("strikeThrough") },
    ],
    [
      { icon: Heading1, label: "Heading 1", run: () => exec("formatBlock", "<h2>") },
      { icon: Heading2, label: "Heading 2", run: () => exec("formatBlock", "<h3>") },
      { icon: Quote, label: "Quote", run: () => exec("formatBlock", "<blockquote>") },
    ],
    [
      { icon: List, label: "Bullet list", run: () => exec("insertUnorderedList") },
      { icon: ListOrdered, label: "Numbered list", run: () => exec("insertOrderedList") },
    ],
    [
      { icon: AlignLeft, label: "Align left", run: () => exec("justifyLeft") },
      { icon: AlignCenter, label: "Align center", run: () => exec("justifyCenter") },
      { icon: AlignRight, label: "Align right", run: () => exec("justifyRight") },
    ],
    [
      {
        icon: Link2,
        label: "Insert link",
        run: () => {
          const url = window.prompt("Link URL", "https://");
          if (url) exec("createLink", url);
        },
      },
      {
        icon: ImageIcon,
        label: "Insert image",
        run: () => {
          const url = window.prompt("Image URL", "https://");
          if (url) exec("insertImage", url);
        },
      },
    ],
    [
      { icon: Undo2, label: "Undo", run: () => exec("undo") },
      { icon: Redo2, label: "Redo", run: () => exec("redo") },
      { icon: Eraser, label: "Clear formatting", run: () => exec("removeFormat") },
    ],
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white focus-within:border-plum/40">
      <div className="flex flex-wrap items-center gap-1 border-b border-line bg-[color:var(--tint)] px-2 py-1.5">
        {groups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-0.5 pr-1.5">
            {group.map((cmd) => (
              <button
                key={cmd.label}
                type="button"
                title={cmd.label}
                aria-label={cmd.label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={cmd.run}
                disabled={source}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-plum/80 transition hover:bg-white hover:text-plum disabled:opacity-40"
              >
                <cmd.icon size={15} />
              </button>
            ))}
            {gi < groups.length - 1 && <span className="ml-1 h-5 w-px bg-line" />}
          </div>
        ))}
        <button
          type="button"
          title="HTML source"
          aria-label="HTML source"
          onClick={() => setSource((s) => !s)}
          className={cn(
            "ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg transition",
            source ? "bg-plum text-white" : "text-plum/80 hover:bg-white hover:text-plum",
          )}
        >
          <Code2 size={15} />
        </button>
      </div>

      {source ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ minHeight }}
          className="w-full resize-y bg-white p-4 font-mono text-[0.82rem] leading-relaxed outline-none"
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
          onBlur={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
          style={{ minHeight }}
          className="prose-editor w-full overflow-y-auto p-4 text-[0.95rem] leading-relaxed outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        />
      )}
    </div>
  );
}

export function RichTextView({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn("prose-editor text-[1rem] leading-relaxed", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
