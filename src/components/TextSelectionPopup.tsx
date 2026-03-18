import { useEffect, useState } from 'react';
import Icon from '../imports/Icon';

interface TextSelectionPopupProps {
  onAskAssistant: (text: string) => void;
}

export function TextSelectionPopup({ onAskAssistant }: TextSelectionPopupProps) {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectedText(text);
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
          });
        }
      } else {
        setSelectedText('');
        setPosition(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('selectionchange', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, []);

  const handleAskAI = () => {
    onAskAssistant(selectedText);
    setSelectedText('');
    setPosition(null);
    window.getSelection()?.removeAllRanges();
  };

  if (!position || !selectedText) return null;

  return (
    <div
      className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <button
        onClick={handleAskAI}
        className="flex items-center gap-2 bg-[#86a201] hover:bg-[#6d8301] text-white px-3 py-2 rounded-md shadow-lg transition-colors whitespace-nowrap"
      >
        <div className="w-4 h-4 flex-shrink-0">
          <Icon />
        </div>
        <span className="text-sm">HGS Buddy</span>
      </button>
    </div>
  );
}