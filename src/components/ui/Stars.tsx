import { Star, PartialStar, EmptyStar } from "@/components/ui/Icons"

interface StarsProps {
  rating?: number
  reviewsLength?: number
}

export default function Stars({ rating = 5, reviewsLength = 0 }: StarsProps) {
  const safeRating = Math.max(0, Math.min(5, rating || 0))

  const fullStars = Math.floor(safeRating)
  const decimalPart = (safeRating - fullStars) * 100 // Convert to percentage

  const emptyStars = 5 - fullStars - (decimalPart > 0 ? 1 : 0) // 1 partial star if needed

  return (
    <div id="stars" className="flex items-center text-yellow-400 text-2xl">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} />
      ))}
      {decimalPart > 0 && <PartialStar fillPercentage={decimalPart} />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <EmptyStar key={i} />
      ))}
      {reviewsLength > 0 && (
        <span className="subheading">({reviewsLength} reviews)</span>
      )}
    </div>
  )
}
