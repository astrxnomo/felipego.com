import { BlogHeader } from "@/components/blog-header"

export default function BlogLayoutEs({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative z-10 min-h-screen">
      <BlogHeader lang="es" />

      <main className="pt-20">{children}</main>

      <footer className="border-t py-6">
        <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Felipe Giraldo. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
