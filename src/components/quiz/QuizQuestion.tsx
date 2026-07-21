import { cn } from "@/lib/utils";

export function QuizQuestion({
  index,
  text,
  name,
  options,
  selected,
  onSelect,
}: {
  index: number;
  text: string;
  name: string;
  options: { label: string; value: string }[];
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mb-3.5 rounded-[10px] border border-line bg-white px-[22px] py-5">
      <h4 className="mb-2.5 font-mono text-[1rem] font-semibold text-plum">
        {(index < 9 ? "0" : "") + (index + 1)} · {text}
      </h4>
      {options.map((o) => (
        <label
          key={o.value}
          className={cn(
            "mb-1.5 block cursor-pointer rounded-md border px-3 py-2.5 text-[0.92rem] leading-snug transition",
            selected === o.value
              ? "border-emerald bg-[#EDF4EF]"
              : "border-line hover:bg-[color:var(--tint)]",
          )}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            className="mr-2.5"
            checked={selected === o.value}
            onChange={() => onSelect(o.value)}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

export function PillarHead({ children }: { children: string }) {
  return (
    <div className="mb-3 mt-6 font-mono text-[0.78rem] font-bold uppercase tracking-[0.15em] text-emerald">
      {children}
    </div>
  );
}
