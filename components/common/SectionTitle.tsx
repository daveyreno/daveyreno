export default function SectionTitle({ title }: { title: string }) {
  return (
    <p className="uppercase text-xs sm:text-sm text-muted-foreground tracking-widest mb-4 px-2">
      {title}
    </p>
  );
}
