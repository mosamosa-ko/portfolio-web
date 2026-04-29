export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink text-white">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 text-center backdrop-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan/80">404</p>
        <h1 className="mt-3 text-2xl">Page not found</h1>
      </div>
    </main>
  );
}
