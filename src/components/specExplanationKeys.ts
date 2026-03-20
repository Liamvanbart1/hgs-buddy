// Lijst van alle technische termen waarvoor HGS Buddy uitleg heeft.
// Moet overeenkomen met de keys in `technicalExplanations` in DigitalAssistant.tsx.
export const SPEC_EXPLANATION_KEYS = [
  "vermogen",
  "spanning",
  "temperatuur",
  "bak niveau",
  "koelsysteem",
  "materiaal",
  "stoomfunctie",
  "timer",
  "thermostaat",
  "capaciteit",
  "aansluitwaarde",
  "touchscreen",
  "gn",
  "kw",
];

/** Zelfde matchlogica als in DigitalAssistant.tsx */
export function hasExplanation(term: string): boolean {
  const lowerTerm = term.toLowerCase();
  return SPEC_EXPLANATION_KEYS.some((key) => {
    const lowerKey = key.toLowerCase();
    return (
      lowerTerm === lowerKey ||
      lowerTerm.includes(lowerKey) ||
      lowerKey.includes(lowerTerm) ||
      lowerKey.split(" ").some((word) => word.length > 3 && lowerTerm.includes(word))
    );
  });
}
