export default function Loading() {
  return (
    <main className="min-h-screen bg-void px-6 py-32 text-cream">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 h-4 w-40 rounded-full bg-cream/20" />

        <div className="space-y-4">
          <div className="h-16 w-full max-w-4xl rounded-2xl bg-cream/10" />
          <div className="h-16 w-full max-w-3xl rounded-2xl bg-cream/10" />
          <div className="h-16 w-full max-w-5xl rounded-2xl bg-cream/10" />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="h-48 rounded-3xl bg-cream/10" />
          <div className="h-48 rounded-3xl bg-cream/10" />
          <div className="h-48 rounded-3xl bg-cream/10" />
        </div>
      </section>
    </main>
  );
}