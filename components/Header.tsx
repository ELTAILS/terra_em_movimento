import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-zinc-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <h1 className="text-2xl font-bold">Terra em Movimento</h1>
        </Link>
      </div>
    </header>
  );
}
