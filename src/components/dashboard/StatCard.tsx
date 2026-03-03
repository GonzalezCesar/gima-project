import type { ReactNode } from "react"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  count?: number;
  total?: number;
  value?: string | number
  trend?: number
  trendLabel?: string
  icon?: ReactNode
  highlighted?: boolean
  className?: string
}

export function StatCard({ title, count, total, value, trend, trendLabel, highlighted = false }: StatCardProps) {
  
  const displayValue = (count !== undefined && total !== undefined)
    ? `${count}/${total}` 
    : value;
  
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-200",
        highlighted
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-white border border-gray-200 text-gray-900 hover:shadow-md",
      )}
    >
      <p className={cn("text-sm font-medium mb-2", highlighted ? "text-blue-100" : "text-gray-600")}>{title}</p>
      <h3 className="text-4xl font-bold mb-4">{displayValue}</h3>
      {trend !== undefined && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm",
            highlighted ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600",
          )}
        >
          <TrendingUp className="w-4 h-4" />
          {trend > 0 ? "+" : ""}
          {trend}%{trendLabel && <span className="ml-1">{trendLabel}</span>}
        </div>
      )}
    </div>
  )
}
