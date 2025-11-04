type StarRatingProps = {
  rating: number; // 0-5
  filledColor?: string; // default #FF8C00
  emptyColor?: string; // default #d1d5db
  sizeClassName?: string; // default w-5 h-5
};

export default function StarRating({ rating, filledColor = "#FF8C00", emptyColor = "#d1d5db", sizeClassName = "w-5 h-5" }: StarRatingProps) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? filledColor : emptyColor}
          className={`${sizeClassName} hover:scale-110 transition-transform`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.288-3.967z" />
        </svg>
      ))}
    </div>
  );
}


