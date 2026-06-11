import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AuthGuard } from "@/components/auth/auth-guard";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <main className="page-shell">
        <header className="app-header">
          <div>
            <h1 className="brand">Bar Cart</h1>
            <p className="tagline">Build your private cocktail bar.</p>
            <nav className="app-nav" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/inventory">Inventory</Link>
            </nav>
          </div>
          <ThemeToggle />
        </header>
        {children}
      </main>
    </AuthGuard>
  );
}
