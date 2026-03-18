import { ImageWithFallback } from './figma/ImageWithFallback';
import img from "figma:asset/7491f0510532ce890505f64557e4dea3f659cee0.png";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

export function CategoryCard({ title, imageUrl }: CategoryCardProps) {
  return (
    <div className="relative group cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-shadow w-[320px] h-[420px]">
      <div className="relative w-full h-full">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div className="bg-white shadow-lg rounded-[50px] w-[200px] h-[45px] flex items-center justify-center">
          <h3 className="text-center font-bold text-[20px] font-[Open_Sans]">{title}</h3>
        </div>
      </div>
    </div>
  );
}