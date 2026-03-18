import { Star, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CompactProductCardProps {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  specs: Record<string, string>;
  inStock?: boolean;
}

export function CompactProductCard({
  name,
  category,
  price,
  rating,
  reviews,
  imageUrl,
  specs,
  inStock = true,
}: CompactProductCardProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex-shrink-0 w-[360px] hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative bg-gray-100 h-32">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Category Tag */}
        <div className="mb-2">
          <span className="inline-block bg-[#86a201] text-white text-xs px-2 py-1 rounded">
            {category.split(' › ')[0]}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 font-medium">{name}</h3>

        {/* Top 2 Specifications */}
        <div className="space-y-1 mb-3">
          {Object.entries(specs).slice(0, 2).map(([key, value]) => (
            <div key={key} className="flex items-start gap-1.5 text-xs">
              <Check className="w-3 h-3 text-gray-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{key}: {value}</span>
            </div>
          ))}
        </div>

        {/* Price and Rating */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-lg font-semibold text-gray-900">{price}</span>
            <div className="flex items-center gap-0.5">
              {renderStars()}
            </div>
          </div>
          {reviews > 0 && (
            <p className="text-xs text-gray-500">{reviews} reviews</p>
          )}
        </div>

        {/* Stock Status */}
        {inStock && (
          <div className="mb-2">
            <p className="text-xs text-[#86a201] flex items-center gap-1">
              <Check className="w-3 h-3" />
              Op voorraad
            </p>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full bg-[#86a201] hover:bg-[#6d8301] text-white py-2 rounded text-sm transition-colors">
          Bekijk product
        </button>
      </div>
    </div>
  );
}