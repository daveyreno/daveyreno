export default function PageTitle({ text }: { text: string }) {
  return (
    <h1 className="headingtype text-4xl md:text-6xl font-bold tracking-tighter py-10">
      {text}
    </h1>
  );
}
