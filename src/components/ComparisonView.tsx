import { useEffect } from "react";
import { Star, ArrowLeft, Check } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  specs: Record<string, string>;
}

interface ComparisonViewProps {
  products: Product[];
  userContext?: {
    bedrijfsgrootte?: string;
    capaciteit?: string;
    budget?: string;
  };
  onBackToRecommendations?: () => void;
  showBackButton?: boolean;
  onRecommendationGenerated?: (recommendation: any) => void;
}

export function ComparisonView({
  products,
  userContext,
  onBackToRecommendations,
  showBackButton,
  onRecommendationGenerated,
}: ComparisonViewProps) {
  const [product1, product2] =
    products.length === 2 ? products : [null, null];

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-[#86a201] text-[#86a201]"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));

  const allSpecKeys = Array.from(
    new Set([
      ...Object.keys(product1?.specs || {}),
      ...Object.keys(product2?.specs || {}),
    ]),
  );

  const parsePrice = (priceString: string): number =>
    parseInt(priceString.replace(/[^0-9]/g, ""));

  const price1 = product1 ? parsePrice(product1.price) : 0;
  const price2 = product2 ? parsePrice(product2.price) : 0;

  const getWinner = (
    key: string,
    value1: string,
    value2: string,
  ): number | null => {
    // Higher is better: Vermogen, Capaciteit (smoothies), Automatische programma's, Toerental
    if (
      key === "Vermogen" ||
      key === "Automatische programma's"
    ) {
      const v1 = parseFloat(value1.replace(/[^0-9.]/g, ""));
      const v2 = parseFloat(value2.replace(/[^0-9.]/g, ""));
      if (!isNaN(v1) && !isNaN(v2)) {
        if (v1 > v2) return 1;
        if (v2 > v1) return 2;
      }
    }
    // Higher smoothies = better
    if (key === "Capaciteit" && value1.includes("smoothies") && value2.includes("smoothies")) {
      const v1 = parseFloat(value1.replace(/[^0-9]/g, ""));
      const v2 = parseFloat(value2.replace(/[^0-9]/g, ""));
      if (v1 > v2) return 1;
      if (v2 > v1) return 2;
    }
    // Lower geluidsniveau = better
    if (key === "Geluidsniveau") {
      const v1 = parseFloat(value1.replace(/[^0-9.]/g, ""));
      const v2 = parseFloat(value2.replace(/[^0-9.]/g, ""));
      if (!isNaN(v1) && !isNaN(v2)) {
        if (v1 < v2) return 1;
        if (v2 < v1) return 2;
      }
    }
    // Touchscreen with more programmes = better
    if (
      key === "Bediening" &&
      value1.includes("Touchscreen") &&
      value2.includes("Touchscreen")
    ) {
      const v1 = parseFloat(value1.match(/\d+/)?.[0] || "0");
      const v2 = parseFloat(value2.match(/\d+/)?.[0] || "0");
      if (v1 > v2) return 1;
      if (v2 > v1) return 2;
    }
    // Ingebouwde geluidskap = better
    if (key === "Geluidskap") {
      const built1 = value1.toLowerCase().includes("ingebouwd");
      const built2 = value2.toLowerCase().includes("ingebouwd");
      if (built1 && !built2) return 1;
      if (built2 && !built1) return 2;
    }
    // Legacy support
    if (key === "Type bediening") {
      const v1 = parseFloat(value1.match(/\d+/)?.[0] || "0");
      const v2 = parseFloat(value2.match(/\d+/)?.[0] || "0");
      if (v1 > v2) return 1;
      if (v2 > v1) return 2;
    }
    return null;
  };

  const generateRecommendation = () => {
    const priceDiff = Math.abs(price1 - price2);
    const cheaperProduct =
      price1 < price2 ? product1 : product2;
    const expensiveProduct =
      price1 > price2 ? product1 : product2;
    const isBudgetSensitive =
      userContext?.budget?.includes("< €5.000") ||
      userContext?.budget?.includes("€5.000 - €10.000");
    const needsHighCapacity =
      userContext?.capaciteit?.includes("100-200") ||
      userContext?.capaciteit?.includes("> 200");

    if (expensiveProduct?.name.includes("Rational")) {
      return {
        recommended: expensiveProduct,
        title: "Onze aanbeveling: Rational iCombi Pro",
        reasons: [
          {
            title: "Beste bediening tijdens drukke diensten",
            description: `Met een ${expensiveProduct.specs["Type bediening"]} heeft u tijdens de piekuren een duidelijk overzicht.`,
          },
          {
            title: "Hoogste vermogen voor maximale productie",
            description: `Het vermogen van ${expensiveProduct.specs["Vermogen"]} betekent dat u sneller opwarmt en meer cyclussen per dag kunt draaien.`,
          },
          {
            title:
              "Lagere operationele kosten op lange termijn",
            description: `Hoewel €${(priceDiff / 1000).toFixed(1)}K duurder in aanschaf, verdient u dit terug door lagere energiekosten en minder onderhoudskosten.`,
          },
        ],
        conclusion: needsHighCapacity
          ? "Voor uw productie-eisen is de Rational iCombi Pro de beste keuze."
          : "De Rational iCombi Pro biedt de beste balans tussen prestaties en gebruiksgemak.",
      };
    }

    return {
      recommended: cheaperProduct,
      title: `Beste prijs-kwaliteit: ${cheaperProduct?.name.split(" - ")[0]}`,
      reasons: [
        {
          title: "Uitstekende prestaties voor een lagere prijs",
          description: `U bespaart €${(priceDiff / 1000).toFixed(1)}K zonder in te leveren op essentiële functionaliteit.`,
        },
        {
          title: "Vergelijkbare capaciteit en vermogen",
          description: `Met ${cheaperProduct?.specs["Capaciteit"]} en ${cheaperProduct?.specs["Vermogen"]} voldoet deze combisteamer aan uw eisen.`,
        },
        {
          title: "Betrouwbaar merk met goede service",
          description:
            "Uitstekende after-sales service en reserveonderdelen beschikbaarheid.",
        },
      ],
      conclusion: isBudgetSensitive
        ? "Voor uw budgetbereik is dit de meest verstandige keuze."
        : "Een solide keuze met uitstekende prijs-kwaliteitverhouding.",
    };
  };

  const recommendation =
    product1 && product2 ? generateRecommendation() : null;

  useEffect(() => {
    if (onRecommendationGenerated && recommendation) {
      onRecommendationGenerated(recommendation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  if (products.length !== 2) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col h-full overflow-hidden">
      {/* ── HEADER ── */}
      <div className="px-6 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
        {onBackToRecommendations && showBackButton && (
          <button
            className="mb-2 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-lg font-semibold transition-colors text-xs"
            onClick={onBackToRecommendations}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Terug naar aanbevelingen</span>
          </button>
        )}
        <h2 className="text-lg font-semibold mb-0.5">Productvergelijking</h2>
        <p className="text-xs text-gray-500">
          Bekijk de belangrijkste verschillen en onze aanbeveling voor uw situatie
        </p>
      </div>

      {/* ── PRODUCT HEADERS (fixed, no scroll) ── */}
      <div className="flex flex-shrink-0 px-6 pt-3 pb-2 border-b border-gray-100">
        <div className="w-[36%]" />
        {/* Product 1 */}
        <div className="w-[32%] px-3 flex flex-col items-center gap-1">
          <div className="w-full h-20 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1">
            <img src={product1?.imageUrl} alt={product1?.name} className="max-h-full max-w-full object-contain" />
          </div>
          <span className="font-semibold text-gray-900 text-xs text-center leading-snug line-clamp-2">{product1?.name}</span>
          <div className="flex items-center gap-0.5">
            {renderStars(product1?.rating || 0)}
            <span className="text-xs text-gray-500 ml-1">({product1?.reviews})</span>
          </div>
          <span className="text-base font-bold text-[#86a201]">{product1?.price}</span>
          {recommendation?.recommended.id === product1?.id && (
            <span className="bg-[#86a201] text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">★ Aanbevolen</span>
          )}
        </div>
        {/* Product 2 */}
        <div className="w-[32%] px-3 flex flex-col items-center gap-1">
          <div className="w-full h-20 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1">
            <img src={product2?.imageUrl} alt={product2?.name} className="max-h-full max-w-full object-contain" />
          </div>
          <span className="font-semibold text-gray-900 text-xs text-center leading-snug line-clamp-2">{product2?.name}</span>
          <div className="flex items-center gap-0.5">
            {renderStars(product2?.rating || 0)}
            <span className="text-xs text-gray-500 ml-1">({product2?.reviews})</span>
          </div>
          <span className="text-base font-bold text-[#86a201]">{product2?.price}</span>
          {recommendation?.recommended.id === product2?.id && (
            <span className="bg-[#86a201] text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">★ Aanbevolen</span>
          )}
        </div>
      </div>

      {/* ── SCROLLABLE MIDDLE: table + recommendation ── */}
      <div className="flex-1 overflow-y-auto px-6 py-3 flex flex-col gap-3">

        {/* ── COMPARISON TABLE ── */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-[36%] bg-gray-50 px-4 py-2.5 text-left border-r border-gray-200">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Specificatie</span>
                </th>
                <th className="w-[32%] bg-gray-50 border-r border-gray-200" />
                <th className="w-[32%] bg-gray-50" />
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-2.5 font-semibold text-gray-700 border-r border-gray-200 text-xs">Prijs</td>
                <td className={`px-3 py-2.5 text-center border-r border-gray-200 text-xs font-semibold ${price1 < price2 ? "text-[#86a201]" : "text-gray-900"}`}>
                  {product1?.price}
                  {price1 < price2 && <div className="text-[10px] font-normal text-[#86a201]">goedkoopst</div>}
                </td>
                <td className={`px-3 py-2.5 text-center text-xs font-semibold ${price2 < price1 ? "text-[#86a201]" : "text-gray-900"}`}>
                  {product2?.price}
                  {price2 < price1 && <div className="text-[10px] font-normal text-[#86a201]">goedkoopst</div>}
                </td>
              </tr>
            </thead>
            <tbody>
              {allSpecKeys.map((key, idx) => {
                const value1 = product1?.specs[key] || "—";
                const value2 = product2?.specs[key] || "—";
                const winner = getWinner(key, value1, value2);
                const isEven = idx % 2 === 0;
                return (
                  <tr key={key} className={`border-b border-gray-100 ${isEven ? "bg-white" : "bg-gray-50/60"}`}>
                    <td className="px-4 py-2 text-xs text-gray-600 font-medium border-r border-gray-200">{key}</td>
                    <td className={`px-3 py-2 text-xs text-center border-r border-gray-200 ${winner === 1 ? "font-semibold text-[#86a201] bg-[#86a201]/5" : "text-gray-800"}`}>
                      <div className="flex items-center justify-center gap-1">
                        {winner === 1 && <Check className="w-3 h-3 text-[#86a201] flex-shrink-0" />}
                        {value1}
                      </div>
                    </td>
                    <td className={`px-3 py-2 text-xs text-center ${winner === 2 ? "font-semibold text-[#86a201] bg-[#86a201]/5" : "text-gray-800"}`}>
                      <div className="flex items-center justify-center gap-1">
                        {winner === 2 && <Check className="w-3 h-3 text-[#86a201] flex-shrink-0" />}
                        {value2}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── RECOMMENDATION SUMMARY ── */}
        {recommendation && (
          <div className="border-2 border-[#86a201] rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#86a201] px-4 py-2.5 flex items-center gap-2">
              <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-white text-sm">{recommendation.title}</h3>
            </div>
            <div className="px-4 py-3 space-y-2.5">
              {recommendation.reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#86a201] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 text-xs">{reason.title}: </span>
                    <span className="text-xs text-gray-600">{reason.description}</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-700 pt-2 border-t border-gray-100 leading-relaxed">
                {recommendation.conclusion}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── ACTION BUTTONS (fixed at bottom) ── */}
      <div className="flex gap-3 flex-shrink-0 px-6 py-3 border-t border-gray-100">
        <button className="flex-1 bg-[#86a201] hover:bg-white hover:text-[#86a201] border-2 border-transparent hover:border-[#86a201] text-white py-2.5 px-4 rounded-[50px] font-semibold transition-colors text-xs">
          Bekijk {recommendation?.recommended.name.split(" - ")[0]}
        </button>
        <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-2.5 px-4 rounded-[50px] font-semibold transition-colors text-xs">
          Beide in winkelwagen
        </button>
      </div>
    </div>
  );
}