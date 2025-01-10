export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 overflow-hidden rounded-2xl border bg-neutral-200/30 p-8 dark:bg-neutral-900">
      {children}
    </section>
  )
}
