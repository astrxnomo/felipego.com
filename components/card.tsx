export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-background flex flex-col gap-6 overflow-hidden rounded-xl border p-8">
      {children}
    </section>
  )
}
