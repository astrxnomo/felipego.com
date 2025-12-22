import { BlogHeader } from "@/components/blog-header"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative z-10">
      <BlogHeader lang="en" />

      <main className="pt-20">{children}</main>

      <footer className="py-6">
        <div className="container mx-auto px-4 text-center font-mono text-xs">
          <p>
            © {new Date().getFullYear()} Felipe Giraldo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
