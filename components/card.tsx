export default function Card ({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col p-8 gap-6 rounded-2xl overflow-hidden bg-neutral-200/30 border dark:bg-neutral-900">
        {children}
    </section>
  )
}
