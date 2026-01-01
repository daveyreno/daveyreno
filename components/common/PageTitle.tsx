export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight py-8">
      {title}
    </h1>
  );
}
