import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { type ReactNode } from "react"

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error"
  title?: string
  children: ReactNode
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    info: {
      container: "border-blue-500/50 bg-blue-50 dark:bg-blue-950/30",
      icon: <Info className="size-5 text-blue-600 dark:text-blue-400" />,
      title: "text-blue-900 dark:text-blue-100",
      content: "text-blue-800 dark:text-blue-200",
    },
    warning: {
      container: "border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/30",
      icon: (
        <AlertTriangle className="size-5 text-yellow-600 dark:text-yellow-400" />
      ),
      title: "text-yellow-900 dark:text-yellow-100",
      content: "text-yellow-800 dark:text-yellow-200",
    },
    success: {
      container: "border-green-500/50 bg-green-50 dark:bg-green-950/30",
      icon: (
        <CheckCircle className="size-5 text-green-600 dark:text-green-400" />
      ),
      title: "text-green-900 dark:text-green-100",
      content: "text-green-800 dark:text-green-200",
    },
    error: {
      container: "border-red-500/50 bg-red-50 dark:bg-red-950/30",
      icon: <AlertCircle className="size-5 text-red-600 dark:text-red-400" />,
      title: "text-red-900 dark:text-red-100",
      content: "text-red-800 dark:text-red-200",
    },
  }

  const style = styles[type]

  return (
    <div
      className={`my-6 rounded-lg border-l-4 p-4 shadow-sm ${style.container}`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-0.5">{style.icon}</div>
        <div className="flex-1 space-y-2">
          {title && <p className={`font-semibold ${style.title}`}>{title}</p>}
          <div className={`text-sm leading-relaxed ${style.content}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
