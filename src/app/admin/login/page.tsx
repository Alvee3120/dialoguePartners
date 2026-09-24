import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  if (await getSession()) redirect("/admin");

  const { next } = await searchParams;
  const target = next && next.startsWith("/admin") ? next : "/admin";

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
          Dialogue Partners
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-foreground">
          Sign in to manage job posts and applications.
        </p>
        <LoginForm next={target} />
      </div>
    </main>
  );
}
