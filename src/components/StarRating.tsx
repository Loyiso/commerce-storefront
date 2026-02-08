type Props = {
  value?: number; 
};

export default function StarRating({ value = 0 }: Props) {
  const rounded = Math.round(value);  
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rounded ? "text-amber-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}
