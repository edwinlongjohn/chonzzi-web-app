export function Quote({ children, attribution }: { children: string; attribution: string }) {
  return (
    <blockquote className="my-5 border-l-4 border-gold pl-5 py-1.5 italic text-muted-foreground">
      "{children}"
      <b className="mt-2 block not-italic font-mono text-[0.76rem] font-bold tracking-[0.06em] text-plum">
        {attribution}
      </b>
    </blockquote>
  );
}
