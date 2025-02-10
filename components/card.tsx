export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 overflow-hidden rounded border bg-background p-8">
      {children}
    </section>
  )
}
