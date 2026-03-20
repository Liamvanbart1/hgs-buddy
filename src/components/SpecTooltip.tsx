import { useState, useRef } from 'react';
import Group from '../imports/Group';
import { hasExplanation } from './specExplanationKeys';

interface SpecTooltipProps {
  term: string;
  onAskAssistant: (term: string) => void;
}

export function SpecTooltip({ term, onAskAssistant }: SpecTooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInfo = hasExplanation(term);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    onAskAssistant(`Leg uit: "${term}"`);
  };

  return (
    <span
      className="relative inline-flex items-center gap-1 cursor-pointer group/spec"
      onMouseEnter={hasInfo ? handleMouseEnter : undefined}
      onMouseLeave={hasInfo ? handleMouseLeave : undefined}
    >
      {/* Term tekst met subtiele stippellijn */}
      <span
        className={hasInfo
          ? "border-b-2 border-dashed border-gray-400 group-hover/spec:border-[#86a201] group-hover/spec:text-[#86a201] group-hover/spec:bg-[#86a201]/10 group-hover/spec:px-1 group-hover/spec:rounded transition-all duration-200 cursor-pointer"
          : ""}
        onClick={hasInfo ? handleClick : undefined}
      >
        {term}
      </span>

      {/* Tooltip */}
      {visible && (
        <span
          className="absolute bottom-full left-0 mb-2 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2 whitespace-nowrap hover:border-[#86a201] transition-colors group/tip"
          >
            {/* HGS Buddy icoon in groen */}
            <span className="w-4 h-4 text-[#86a201] flex-shrink-0">
              <Group />
            </span>
            {/* Tekst */}
            <span className="text-sm font-semibold text-gray-900 group-hover/tip:text-[#86a201] transition-colors">
              Vraag aan HGS Buddy
            </span>
          </button>
          {/* Pijltje naar beneden */}
          <span className="absolute left-4 top-full -mt-px">
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
              <path d="M0 0L6 6L12 0" fill="white" />
              <path d="M0 0L6 6L12 0" stroke="#e5e7eb" strokeWidth="1" />
            </svg>
          </span>
        </span>
      )}
    </span>
  );
}