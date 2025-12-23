import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          MyApp
        </Link>

        <div className="flex gap-6">
          <Link href="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
}
