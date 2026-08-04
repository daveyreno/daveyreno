/**
 * Emits a JSON-LD block. Server-rendered into the HTML rather than injected on
 * the client, so it is present for crawlers that never run the bundle.
 *
 * `<` is escaped because an unescaped `</script>` inside the payload would end
 * the tag early. Nothing in lib/schema contains one today; this makes it safe
 * to keep adding to it without remembering that.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
