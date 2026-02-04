import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Hello world</h1>
        <Link href="/users">Users</Link>
        {/* Client side navigation - LINK */}
        <ProductCard />
      </main>
    </div>
  );
}
