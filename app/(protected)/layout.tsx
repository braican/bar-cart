import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AuthGuard } from "@/components/auth/auth-guard";

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
          </div>
          <ThemeToggle />
        </header>
        {children}
      </main>
    </AuthGuard>
  );
}
