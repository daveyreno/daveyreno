import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex items-center justify-center h-12 w-12 rounded-full">
        <div className="h-8 w-8">
          <Image
            src="/daveyreno-logo-l.svg"
            width={192}
            height={218}
            alt="DaveyReno Logo"
            priority
            className="h-8 w-auto"
          />
        </div>
      </div>
    </Link>
  );
}
