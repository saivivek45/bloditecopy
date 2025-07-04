import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  label: string
  value: string
  isSelected?: boolean
  onClick?: (value: string) => void
}

const CategoryCard: React.FC<CategoryCardProps> = ({ label, value, isSelected = false, onClick }) => {
  return (
    <Card
      className={`
        h-24 w-full cursor-pointer transition-all duration-200 hover:shadow-md
        ${isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"}
      `}
      onClick={() => onClick?.(value)}
    >
      <CardContent className="flex items-center justify-center h-full p-4">
        <span
          className={`
          text-sm font-medium text-center line-clamp-2
          ${isSelected ? "text-primary" : "text-foreground"}
        `}
        >
          {label}
        </span>
      </CardContent>
    </Card>
  )
}

export default CategoryCard
