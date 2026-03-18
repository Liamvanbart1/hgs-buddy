import image_e0058acd532f44b83d502dd04c5510c5929de1f8 from 'figma:asset/e0058acd532f44b83d502dd04c5510c5929de1f8.png';
import image_a8af63dc71704a68aeb2e8533e85598596b60568 from 'figma:asset/a8af63dc71704a68aeb2e8533e85598596b60568.png';
import image_28b60606ed251795303910ccb8b9359cffdbb88a from 'figma:asset/28b60606ed251795303910ccb8b9359cffdbb88a.png';
import image_4e06802bb42c52f11b8cd567671c285b86bd49ae from 'figma:asset/4e06802bb42c52f11b8cd567671c285b86bd49ae.png';
import image_0172a0b6601455061ae3ab93872333e514c43067 from 'figma:asset/0172a0b6601455061ae3ab93872333e514c43067.png';
import image_1ffa7b5f3104465908ba895260102fa09113200e from 'figma:asset/1ffa7b5f3104465908ba895260102fa09113200e.png';
import { useState } from 'react';
import { WebshopHeader } from './WebshopHeader';
import { ProductCard } from './ProductCard';
import { DigitalAssistant } from './DigitalAssistant';
import { TextSelectionPopup } from './TextSelectionPopup';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, ShoppingCart, Scale } from 'lucide-react';
import Group from '../imports/Group';
import { ComparisonView } from './ComparisonView';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  specs: Record<string, string>;
  inStock: boolean;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Dligi Centrifugeerschaal model DS-C/3 SX/ BT RVS',
    category: 'Keukenapparatuur',
    price: '382,-',
    oldPrice: undefined,
    inStock: true,
    imageUrl: image_1ffa7b5f3104465908ba895260102fa09113200e,
    specs: { 'Model': 'DS-C/3SX/BT' }
  },
  {
    id: 2,
    name: 'Blendtec Stealth 885 | Blender | 200 smoothies per dag',
    category: 'Keukenapparatuur',
    price: '1.436,-',
    oldPrice: '1.695,-',
    inStock: true,
    imageUrl: image_0172a0b6601455061ae3ab93872333e514c43067,
    specs: { 'Capaciteit': '200 smoothies/dag' }
  },
  {
    id: 3,
    name: 'Blendtec Connoisseur 825 | Blender | 150 Smoothies per dag',
    category: 'Keukenapparatuur',
    price: '1.227,-',
    oldPrice: '1.443,-',
    inStock: true,
    imageUrl: image_4e06802bb42c52f11b8cd567671c285b86bd49ae,
    specs: { 'Capaciteit': '150 smoothies/dag' }
  },
  {
    id: 4,
    name: 'Salter | weegschaal 60kg',
    category: 'Keukenapparatuur',
    price: '89,-',
    oldPrice: undefined,
    inStock: true,
    imageUrl: image_28b60606ed251795303910ccb8b9359cffdbb88a,
    specs: { 'Capaciteit': '60kg' }
  },
  {
    id: 5,
    name: 'Bartscher | Heteluchtoven AT90',
    category: 'Keukenapparatuur',
    price: '2.195,-',
    oldPrice: undefined,
    inStock: true,
    imageUrl: image_a8af63dc71704a68aeb2e8533e85598596b60568,
    specs: { 'Type': 'Hetelucht' }
  },
  {
    id: 6,
    name: 'Bartscher | Gasfelbraadgrill',
    category: 'Keukenapparatuur',
    price: '1.850,-',
    oldPrice: undefined,
    inStock: true,
    imageUrl: image_e0058acd532f44b83d502dd04c5510c5929de1f8,
    specs: { 'Type': 'Gas' }
  }
];

const subcategories = [
  'Aziatische Keuken',
  'Bakkerijmachines',
  'Slagenwarmers',
  'Vleesmachines',
  'Fornuizen en Kookplaten',
  'Kookketels, Braadpannen en Multicookers',
  'Grillplaten en Bakplaten',
  'Friteusen',
  'Ovens, Combisteamers en Magnetrons',
  'Pizza en Pasta Apparatuur',
  'Toasters',
  'Snijden, Mixen, Persen en Blenden',
  'Overige Keukenapparatuur'
];

const brands = [
  { name: 'Zwik (IGS, 650, ...)', count: 3 },
  { name: 'APS', count: 0 },
  { name: 'Alligator', count: 0 },
  { name: 'Aldo Sham', count: 0 },
  { name: 'Amerbox', count: 0 },
  { name: 'Anetic', count: 0 }
];

const series = [
  { name: 'Zwik (IGS, 650, ...)', count: 3 },
  { name: '600', count: 0 },
  { name: '650', count: 0 },
  { name: '650 Snack', count: 0 },
  { name: '700', count: 0 },
  { name: '900', count: 0 }
];

const assistantQuestions = [
  {
    text: '**Vraag 1 van 4:** Hoeveel personen dienen in uw horecabedrijf?',
    suggestions: ['< 50 personen', '50-100 personen', '100-200 personen', '> 200 personen']
  },
  {
    text: '**Vraag 2 van 4:** Hoeveel keer per dag wordt er gekookt?',
    suggestions: ['1 keer per dag', '2 keer per dag', '3 keer per dag', 'Meerdere keren per dag']
  },
  {
    text: '**Vraag 3 van 4:** Hoeveel vaat wast u gemiddeld per dag?',
    suggestions: ['< 500 borden/dag', '500-1000 borden/dag', '1000-2000 borden/dag', '> 2000 borden/dag']
  }
];

interface CategoryPageProps {
  onNavigateHome?: () => void;
  onNavigateToProduct?: () => void;
  comparisonSelection?: number[];
  onToggleComparison?: (productId: number) => void;
  onStartComparison?: () => void;
  onRecommendation?: (recommendation: string) => void;
}

export function CategoryPage({ 
  onNavigateHome, 
  onNavigateToProduct,
  comparisonSelection = [],
  onToggleComparison,
  onStartComparison,
  onRecommendation
}: CategoryPageProps) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAssistantPeeking, setIsAssistantPeeking] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [assistantQuery, setAssistantQuery] = useState<string | null>(null);
  const [assistantRecommendation, setAssistantRecommendation] = useState<any | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 41308]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

  const handleCloseAssistant = () => {
    setIsAssistantOpen(false);
    setIsAssistantPeeking(false);
  };

  const handleAskAssistant = (text: string) => {
    setIsAssistantOpen(true);
    setAssistantQuery(`Leg uit: \"${text}\"`);
  };

  const handleLocalStartComparison = () => {
    const selectedProducts = mockProducts.filter(p => 
      comparisonSelection.includes(p.id)
    );
    if (selectedProducts.length === 2) {
      setComparisonProducts(selectedProducts);
      setShowComparison(true);
      setIsAssistantOpen(true);
    }
  };

  const handleBackToProducts = () => {
    setShowComparison(false);
    setComparisonProducts([]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Webshop - Full width */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <WebshopHeader 
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onHoverAssistantButton={(isHovering) => setIsAssistantPeeking(isHovering)}
          onNavigateHome={onNavigateHome}
        />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* Breadcrumb */}
          <div className="border-b bg-gray-50 py-3">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <a href="/" className="hover:text-[#86a201] transition-colors">Home</a>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900">Keukenapparatuur</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-[280px_1fr] gap-8">
              {/* Left Sidebar - Filters */}
              <aside className="space-y-6">
                {/* Category Navigation */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Keukenapparatuur</h3>
                  <ul className="space-y-2">
                    {subcategories.map((cat) => (
                      <li key={cat}>
                        <a href="#" className="text-sm text-gray-700 hover:text-[#86a201] transition-colors block">
                          {cat}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brand Filter */}
                <div>
                  <button className="flex items-center justify-between w-full mb-3">
                    <h3 className="font-semibold text-gray-900">Merk</h3>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand.name} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded-full border-gray-300 text-[#86a201] focus:ring-[#86a201]"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand.name]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand.name));
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700">{brand.name}</span>
                        {brand.count > 0 && (
                          <span className="text-xs text-gray-400 ml-auto">...{brand.count}</span>
                        )}
                      </label>
                    ))}
                    <button className="text-sm text-[#86a201] hover:underline">Toon meer</button>
                  </div>
                </div>

                {/* Series Filter */}
                <div>
                  <button className="flex items-center justify-between w-full mb-3">
                    <h3 className="font-semibold text-gray-900">Serie</h3>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    {series.map((serie) => (
                      <label key={serie.name} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded-full border-gray-300 text-[#86a201] focus:ring-[#86a201]"
                          checked={selectedSeries.includes(serie.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSeries([...selectedSeries, serie.name]);
                            } else {
                              setSelectedSeries(selectedSeries.filter(s => s !== serie.name));
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700">{serie.name}</span>
                        {serie.count > 0 && (
                          <span className="text-xs text-gray-400 ml-auto">...{serie.count}</span>
                        )}
                      </label>
                    ))}
                    <button className="text-sm text-[#86a201] hover:underline">Toon meer</button>
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <button className="flex items-center justify-between w-full mb-3">
                    <h3 className="font-semibold text-gray-900">Prijs</h3>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">€ {priceRange[0].toLocaleString()}</span>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full relative">
                        <div 
                          className="absolute h-full bg-[#86a201] rounded-full"
                          style={{ 
                            left: `${(priceRange[0] / 41308) * 100}%`,
                            right: `${100 - (priceRange[1] / 41308) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">€ {priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="41308"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </aside>

              {/* Right Content - Products */}
              <div>
                {/* Category Header */}
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold mb-2">Keukenapparatuur</h1>
                  <p className="text-gray-700 text-sm mb-4">
                    Bent u op zoek naar professionele apparatuur voor uw horecabedrijf? Dan bent u bij HorecaGrootkeukensShop aan het juiste adres. Wij hebben namelijk ook meer dan een assortiment benodigde keukenapparatuur van de beste merken op het gebied van horeca-apparatuur. Deze bestaat o.a. uit eigen bekende prijzen en met ons snelle levering, maa de apparatuur op voorraad is. Bekijk snel ons aanbod!
                  </p>
                  
                  {/* Sort and Count */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Producten 1-30 van 5350</p>
                    <div className="flex items-center gap-2">
                      <label htmlFor="sort" className="text-sm text-gray-700">Sorteer op:</label>
                      <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#86a201]"
                      >
                        <option value="popular">Positie</option>
                        <option value="name">Naam</option>
                        <option value="price-low">Prijs: Laag - Hoog</option>
                        <option value="price-high">Prijs: Hoog - Laag</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white group">
                      <div 
                        className="aspect-square bg-gray-50 flex items-center justify-center relative p-4 cursor-pointer"
                        onClick={() => onNavigateToProduct?.()}
                      >
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                        {/* Badge */}
                        {product.id === 1 && (
                          <div className="absolute top-3 left-3 bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-medium">
                            RVS
                          </div>
                        )}
                        {product.id === 2 && (
                          <div className="absolute top-3 left-3 bg-[#86a201] text-white px-3 py-1 rounded text-xs font-medium">
                            BEST SELLER
                          </div>
                        )}
                        {/* Comparison button */}
                        {onToggleComparison && (
                          <button 
                            className={`group/compare absolute bottom-3 left-3 p-2.5 rounded-full border-2 transition-all ${
                                comparisonSelection.includes(product.id)
                                  ? 'bg-white border-[#86a201] text-[#86a201]'
                                  : 'bg-[#86a201] border-transparent hover:bg-white hover:border-[#86a201] text-white hover:text-[#86a201]'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleComparison(product.id);
                            }}
                          >
                            <Scale className="w-5 h-5 group-hover/compare:text-[#86a201]" />
                          </button>
                        )}
                        {/* Add to cart button */}
                        <button 
                          className="absolute bottom-3 right-3 bg-[#ff6b35] hover:bg-[#ff5520] text-white p-2.5 rounded-lg transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                          {product.name}
                        </h3>
                        <div className="text-xs text-gray-500 mb-3">
                          Art. nr. {product.specs.Model || product.id}
                        </div>
                        <div className="flex items-baseline gap-2 mb-3">
                          {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                          )}
                          <span className="text-xl font-semibold text-gray-900">{product.price}</span>
                        </div>
                        {product.inStock && (
                          <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Op voorraad
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Digital Assistant Overlay with Products - Right side */}
      <AnimatePresence>
        {isAssistantOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20"
              style={{ zIndex: 55 }}
              onClick={handleCloseAssistant}
            />
            
            {/* Comparison View or Products Grid - Takes remaining space left of assistant */}
            {showComparison && comparisonProducts.length === 2 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="fixed top-0 left-0 h-full overflow-y-auto"
                style={{ 
                  zIndex: 56,
                  width: 'calc(100% - 25vw)',
                  paddingRight: '2rem'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="container mx-auto px-8 py-8">
                  <ComparisonView 
                    products={comparisonProducts}
                    userContext={{}}
                    onBackToRecommendations={handleBackToProducts}
                    showBackButton={false}
                    onRecommendationGenerated={(recommendation) => {
                      // Send recommendation to Digital Assistant
                      setAssistantRecommendation(recommendation);
                    }}
                  />
                </div>
              </motion.div>
            ) : recommendedProducts.length > 0 && (() => {
              let gridCols = 'grid-cols-1';
              if (recommendedProducts.length <= 4) {
                gridCols = 'grid-cols-2';
              } else if (recommendedProducts.length <= 6) {
                gridCols = 'grid-cols-3';
              } else {
                gridCols = 'grid-cols-4';
              }
              
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="fixed top-0 left-0 h-full overflow-y-auto"
                  style={{ 
                    zIndex: 56,
                    width: 'calc(100% - 25vw)',
                    paddingRight: '2rem'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="container mx-auto px-8 py-8">
                    <div className={`grid ${gridCols} gap-6`}>
                      {recommendedProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
            
            {/* Assistant Panel - Fixed 25% width on right */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[25vw]"
              style={{ zIndex: 60 }}
            >
              <DigitalAssistant 
                onClose={handleCloseAssistant} 
                onRecommendProducts={(products) => setRecommendedProducts(products)}
                externalQuery={assistantQuery}
                onExternalQueryHandled={() => setAssistantQuery(null)}
                externalRecommendation={assistantRecommendation}
                onExternalRecommendationHandled={() => setAssistantRecommendation(null)}
                questions={assistantQuestions}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Peek preview when hovering over button (only when assistant is closed) */}
      <AnimatePresence>
        {!isAssistantOpen && isAssistantPeeking && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 'calc(100% - 80px)' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="fixed top-0 right-0 h-full w-1/4 pointer-events-none"
            style={{ zIndex: 100 }}
          >
            <div className="h-full bg-white shadow-2xl">
              <div className="bg-[#86a201] text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6">
                    <Group />
                  </div>
                  <div>
                    <h2 className="font-semibold">HGS Buddy</h2>
                    <p className="text-xs opacity-90">Digitale Assistent</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button to open assistant when closed */}
      {!isAssistantOpen && (
        <DigitalAssistant 
          onOpen={() => setIsAssistantOpen(true)}
          onHoverFloatingButton={(isHovering) => setIsAssistantPeeking(isHovering)}
        />
      )}

      {/* Text Selection Popup */}
      <TextSelectionPopup onAskAssistant={handleAskAssistant} />

      {/* Floating Comparison Button */}
      <AnimatePresence>
        {comparisonSelection.length === 2 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
            style={{ zIndex: 70 }}
          >
            <button
              onClick={handleLocalStartComparison}
              className="bg-[#86a201] hover:bg-[#6d8301] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-lg font-semibold">Vergelijk {comparisonSelection.length} producten</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}