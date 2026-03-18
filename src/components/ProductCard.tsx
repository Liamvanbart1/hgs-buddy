import { ShoppingCart, Info, Star, Check, Scale } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Group from '../imports/Group';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: string;
  specs: Record<string, string>;
  description?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  imageUrl?: string;
  onAddToComparison?: (productId: number) => void;
  isInComparison?: boolean;
  recommendationReason?: string;
}

export function ProductCard({ 
  id, 
  name, 
  category, 
  price, 
  specs, 
  description,
  rating = 4.5,
  reviews = 0,
  inStock = true,
  imageUrl,
  onAddToComparison,
  isInComparison,
  recommendationReason
}: ProductCardProps) {
  // Generate star rating
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-3.5 h-3.5 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden flex flex-col group">
      {/* Top Section: Image and Name/Description side by side */}
      <div className="flex gap-4 p-4 border-b border-gray-200">
        {/* Product Image */}
        <div className="relative w-[200px] h-[200px] flex-shrink-0">
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Name and Description */}
        <div className="flex-1 flex flex-col justify-center" style={{ userSelect: 'text' }}>
          {/* Product Name */}
          <h3 className="text-gray-900 mb-2">{name}</h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>

      {/* Bottom Section: Everything else */}
      <div className="p-4 flex flex-col flex-1" style={{ userSelect: 'text' }}>
        {/* Category Tag and Compare Button */}
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <span className="inline-block bg-[#86a201] text-white text-xs px-2 py-1 rounded">
              {category.split(' › ')[0]}
            </span>
          </div>
          
          {onAddToComparison && (
            <button
              className="flex items-center gap-2 px-3 py-2 border border-[#86a201] text-[#86a201] hover:bg-[#86a201] hover:text-white rounded-full transition-colors text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToComparison(id);
              }}
            >
              <div className="w-5 h-5 flex-shrink-0">
                <Group />
              </div>
              <span className="whitespace-nowrap">Vergelijk met de HGS Buddy</span>
            </button>
          )}
        </div>

        {/* Specifications with checkmarks */}
        <div className="space-y-1.5 mb-4 flex-1">
          {Object.entries(specs).slice(0, 4).map(([key, value]) => (
            <div key={key} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{key}: {value}</span>
            </div>
          ))}
        </div>

        {/* Price and Rating */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-gray-500 text-xs">Prijs</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl text-gray-900">{price}</span>
            <div className="flex items-center gap-1">
              {renderStars()}
            </div>
          </div>
          {reviews > 0 && (
            <p className="text-xs text-gray-500">{reviews} reviews</p>
          )}
        </div>

        {/* Stock Status */}
        {inStock && (
          <div className="mb-3">
            <p className="text-sm text-[#86a201] flex items-center gap-1">
              <Check className="w-4 h-4" />
              Op voorraad
            </p>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full bg-[#86a201] hover:bg-[#6d8301] text-white py-3 rounded-lg transition-colors mb-3">
          Toevoegen aan winkelwagen
        </button>

        {/* Recommendation Reason - Below the button */}
        <div className="bg-[#86a201]/10 border border-[#86a201]/30 rounded-lg p-3">
          <p className="text-sm text-gray-800 leading-relaxed">
            <span className="font-semibold text-[#86a201]">Waarom deze oven?</span><br />
            {recommendationReason || "Deze combisteamer sluit goed aan bij jouw situatie als groot restaurant met ongeveer 200 couverts per dag. Dankzij de ruime capaciteit en betrouwbare prestaties is dit model geschikt voor intensief gebruik tijdens piekmomenten. Binnen jouw budget biedt deze oven een goede balans tussen gebruiksgemak, capaciteit en constante kookkwaliteit."}
          </p>
        </div>
      </div>
    </div>
  );
}