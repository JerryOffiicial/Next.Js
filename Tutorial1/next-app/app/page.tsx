import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Hello world</h1>
        <Link href="/users">Users</Link>
        {/* Client side navigation - LINK */}
      </main>
    </div>
  );
}
