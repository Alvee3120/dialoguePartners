import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center"
      aria-label="Dialogue Partners — home"
    >
      <Image
        src="/images/logo.svg"
        alt=""
        width={661}
        height={429}
        loading="eager"
        className="h-10 w-auto"
      />
    </Link>
  );
}
