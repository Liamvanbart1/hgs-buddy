import { WebshopHeader } from './components/WebshopHeader';
import { CategoryCard } from './components/CategoryCard';
import { DigitalAssistant } from './components/DigitalAssistant';
import { ProductCard } from './components/ProductCard';
import { CompactProductCard } from './components/CompactProductCard';
import { CategoryPage } from './components/CategoryPage';
import { ProductPage } from './components/ProductPage';
import { ComparisonView } from './components/ComparisonView';
import { Search, Sparkles, X, ArrowRight } from 'lucide-react';
import imgAchtergrond from "figma:asset/6f4181edf0c44bcc0d04ceee1c1a1dbeb2e6c2d5.png";
import imgKeuken from "figma:asset/e16c2cd80d7afae77491a18d1b0b72aa69be0860.png";
import imgCafe from "figma:asset/f00c06b27c3fe8b16b876bcad09796415a270a8a.png";
import imgKoelen from "figma:asset/e110d7bc90dd4bf3bde74650d8ca52bffac8123a.png";
import imgAccessoires from "figma:asset/7491f0510532ce890505f64557e4dea3f659cee0.png";
import imgHeroBackground from "figma:asset/469f4876443979436aced52dec6018f75b1352f0.png";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Group from './imports/Group';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Check } from 'lucide-react';

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'category' | 'product'>('home');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAssistantPeeking, setIsAssistantPeeking] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [assistantQuery, setAssistantQuery] = useState<string | null>(null);
  const [comparisonProducts, setComparisonProducts] = useState<Product[] | null>(null);
  const [comparisonContext, setComparisonContext] = useState<any>(null);
  const [comparisonSelection, setComparisonSelection] = useState<number[]>([]);

  const handleCloseAssistant = () => {
    setIsAssistantOpen(false);
    setIsAssistantPeeking(false);
    // Reset recommendation state — page is only accessible via fresh chat search
    setRecommendedProducts([]);
    setComparisonProducts(null);
    setComparisonContext(null);
  };

  const handleAskAssistant = (text: string) => {
    setIsAssistantOpen(true);
    setAssistantQuery(`Leg uit: \"${text}\"`);
  };

  const handleToggleComparison = (productId: number) => {
    setComparisonSelection(prev => {
      if (prev.includes(productId)) {
        // Remove from comparison
        return prev.filter(id => id !== productId);
      } else {
        // Add to comparison (max 2 products)
        if (prev.length >= 2) {
          // Replace the first product
          return [prev[1], productId];
        }
        return [...prev, productId];
      }
    });
  };

  const handleStartComparison = () => {
    const selectedProducts = recommendedProducts.filter(p => 
      comparisonSelection.includes(p.id)
    );
    if (selectedProducts.length === 2) {
      setComparisonProducts(selectedProducts);
      setComparisonContext({}); // You can pass context here if needed
      setRecommendedProducts([]);
    }
  };

  // If we're on the category page, render that component instead
  if (currentPage === 'category') {
    return <CategoryPage 
      onNavigateHome={() => setCurrentPage('home')}
      onNavigateToProduct={() => setCurrentPage('product')}
      comparisonSelection={comparisonSelection}
      onToggleComparison={handleToggleComparison}
      onStartComparison={handleStartComparison}
    />;
  }

  // If we're on the product page, render that component instead
  if (currentPage === 'product') {
    return <ProductPage 
      onNavigateHome={() => setCurrentPage('home')}
      onNavigateCategory={() => setCurrentPage('category')}
    />;
  }

  const categories = [
    {
      title: 'Keuken',
      imageUrl: imgKeuken
    },
    {
      title: 'Café',
      imageUrl: imgCafe
    },
    {
      title: 'Koelen',
      imageUrl: imgKoelen
    },
    {
      title: 'Accessoires',
      imageUrl: imgAccessoires
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Webshop - Full width */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <WebshopHeader 
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onHoverAssistantButton={(isHovering) => setIsAssistantPeeking(isHovering)}
          onNavigateToCategory={() => setCurrentPage('category')}
          onNavigateHome={() => setCurrentPage('home')}
        />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Hero section with background image */}
          <div className="relative h-[400px]">
            <img 
              src={imgHeroBackground}
              alt="Hero background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
              <h1 className="text-4xl mb-8 font-bold text-[40px] font-[Open_Sans]">Waar bent u naar op zoek?</h1>
              <div className="w-full max-w-4xl px-4 relative z-20">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <input
                    type="text"
                    placeholder="Zoek naar een product of merk..."
                    className="w-full pl-12 pr-4 py-4 rounded-[50px] text-gray-800 bg-[#f2f2f2] focus:outline-none focus:ring-2 focus:ring-[#86a201] text-[16px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearchResults(true)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  />
                  
                  {/* Expanded Search Dropdown */}
                  {showSearchResults && searchQuery.length > 0 && (
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-50"
                      style={{ width: '920px' }}
                      onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-[300px_1fr] gap-6">
                          {/* Left Column - Suggestions */}
                          <div className="space-y-6">
                            {/* HGS Buddy option */}
                            <button
                              onClick={() => {
                                setIsAssistantOpen(true);
                                setAssistantQuery(searchQuery);
                                setShowSearchResults(false);
                              }}
                              onMouseEnter={() => setIsAssistantPeeking(true)}
                              onMouseLeave={() => setIsAssistantPeeking(false)}
                              className="group w-full flex items-center gap-3 p-3 bg-[#86a201] hover:bg-white text-white hover:text-[#86a201] border-2 border-transparent hover:border-solid hover:border-[#86a201] rounded-[50px] transition-colors"
                            >
                              <div className="w-5 h-5 flex-shrink-0 text-white group-hover:text-[#86a201]">
                                <Group />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-sm">Vraag het aan HGS Buddy</div>
                                <div className="text-xs opacity-90">"{searchQuery}"</div>
                              </div>
                            </button>

                            {/* Popular Suggestions */}
                            <div>
                              <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase">POPULAIRE SUGGESTIES</h3>
                              <ul className="space-y-2">
                                {["pizza oven", "hete lucht oven", "bartscher oven", "hetelucht oven", "unox oven", "pizza ovens"].map((suggestion, index) => (
                                  <li key={index}>
                                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#86a201] w-full text-left">
                                      <Search className="w-4 h-4" />
                                      {suggestion}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Categories */}
                            <div>
                              <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase">CATEGORIEËN</h3>
                              <ul className="space-y-2">
                                {["Fornuizen met Oven", "Heteluchtovens", "Bakkersovens", "Ovens, Combisteamers en Magnetrons", "Rookovens", "Droogovens"].map((category, index) => (
                                  <li key={index}>
                                    <a href="#" className="text-sm text-gray-700 hover:text-[#86a201] block">
                                      {category}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#86a201] mt-3">
                                More
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Right Column - Products */}
                          <div>
                            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase">ARTIKELEN</h3>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              {[
                                {
                                  id: 1,
                                  name: "Diamond | Spoelmiddel product ovens met auto...",
                                  image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=200",
                                  price: "€ 128,25",
                                  oldPrice: "€ 171,00",
                                },
                                {
                                  id: 2,
                                  name: "Diamond | Wasmiddel product ovens met auto...",
                                  image: "https://images.unsplash.com/photo-1563979355-c6c0146d4a23?w=200",
                                  price: "€ 117,00",
                                  oldPrice: "€ 156,00",
                                },
                                {
                                  id: 3,
                                  name: "Diamond | Elektrische oven stoom/convectieoven, 7x...",
                                  image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200",
                                  price: "€ 3.354,00",
                                  oldPrice: "€ 4.472,00",
                                },
                                {
                                  id: 4,
                                  name: "Diamond | TOUCH SCREEN oven elektrische...",
                                  image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=200",
                                  price: "€ 4.585,00",
                                  oldPrice: "€ 6.113,00",
                                },
                                {
                                  id: 5,
                                  name: "Diamond | TOUCH SCREEN oven gas...",
                                  image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200",
                                  price: "€ 5.803,00",
                                  oldPrice: "€ 7.737,00",
                                },
                                {
                                  id: 6,
                                  name: "Diamond | Elektrische oven stoom/convectieoven, 11x...",
                                  image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=200",
                                  price: "€ 5.966,00",
                                  oldPrice: "€ 7.954,00",
                                },
                              ].map((product) => (
                                <div key={product.id} className="group cursor-pointer">
                                  <div className="aspect-square bg-gray-50 rounded mb-2 overflow-hidden">
                                    <ImageWithFallback
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                  </div>
                                  <div className="text-xs text-[#86a201] font-medium mb-1 line-clamp-2">
                                    {product.name}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-900">{product.price}</span>
                                    <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* View All Button */}
                            <button className="w-full bg-[#ff6b35] hover:bg-[#ff5520] text-white py-3 rounded font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                              BEKIJK ALLE ITEMS
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-4 gap-6 mb-12">
              {categories.map((category) => (
                <CategoryCard
                  key={category.title}
                  title={category.title}
                  imageUrl={category.imageUrl}
                />
              ))}
            </div>

            {/* Featured products section */}
            <div className="bg-gray-900 text-white rounded-lg p-8 mb-12">
              <div className="grid grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl mb-4">Nieuw in ons assortiment, Tormek</h2>
                  <p className="mb-4">Ontdek de nieuwste professionele keukenapparatuur</p>
                  <button className="bg-[#86a201] hover:bg-[#6d8301] text-white px-6 py-3 rounded-lg transition-colors">
                    Bekijk collectie
                  </button>
                </div>
                <div className="bg-gray-800 rounded-lg h-64"></div>
              </div>
            </div>

            {/* Product highlight */}
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl mb-4">Gekocht wandmeubel - strak zwart, maximale koeling, minimale ruimte!</h3>
              <div className="grid grid-cols-2 gap-8 items-start">
                <div>
                  <h4 className="text-xl mb-2">Diamond | Gekoeld wandmeubel, zwentkleuren - ZWART | MD15/RS-B2B</h4>
                  <p className="text-gray-700 mb-4">
                    Extra grote koelcapaciteit - Bereikt meest efficiënte en producten vrijwel onmiddellijk 
                    en langdurig, ideaal voor drukke horecagelegenheden
                  </p>
                  <p className="text-gray-700 mb-4">
                    Volledig Gekoeld - Perfect voor gekoelde drankjes, cocktail of 
                    aperitief. Hangt aan een wandmontage opslag meer gemakkelijk dan ooit.
                  </p>
                  <button className="bg-[#86a201] hover:bg-[#6d8301] text-white px-6 py-3 rounded-lg transition-colors">
                    2 Slots beschikbaar
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="bg-gray-200 rounded h-80"></div>
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
              className="fixed inset-0 bg-black/50"
              style={{ zIndex: 55 }}
              onClick={handleCloseAssistant}
            />
            
            {/* Products Grid OR Comparison View - Takes remaining space left of assistant */}
            {(recommendedProducts.length > 0 || comparisonProducts) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="fixed top-0 left-0 h-screen overflow-hidden flex flex-col"
                style={{ 
                  zIndex: 56,
                  width: 'calc(100% - 25vw)',
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              >
                {comparisonProducts ? (
                  // Comparison view fills exact screen height, scrolls internally
                  <div className="h-full flex flex-col px-8 py-6">
                    <ComparisonView 
                      products={comparisonProducts} 
                      userContext={comparisonContext}
                      onBackToRecommendations={() => {
                        setComparisonProducts(null);
                        setComparisonContext(null);
                      }}
                      showBackButton={true}
                    />
                  </div>
                ) : (
                  // Product recommendations scroll normally
                  <div className="h-full overflow-y-auto px-8 py-6">
                    <div className="space-y-8">
                      {/* Top 2 Recommended Products */}
                      <div>
                        <div className="grid grid-cols-2 gap-6">
                          {recommendedProducts.slice(0, 2).map((product, index) => (
                            <div key={product.id} className="relative">
                              {/* Badge for Best Match */}
                              {index === 0 && (
                                <div className="absolute -top-3 -left-3 z-10 bg-[#86a201] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                  🏆 Beste Match
                                </div>
                              )}
                              {index === 1 && (
                                <div className="absolute -top-3 -left-3 z-10 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                  ⭐ Beste Prijs-Kwaliteit
                                </div>
                              )}
                              <ProductCard 
                                {...product}
                                onAddToComparison={handleToggleComparison}
                                isInComparison={comparisonSelection.includes(product.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Other Options - Horizontal Scroll */}
                      {recommendedProducts.length > 2 && (
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Andere opties</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendedProducts.slice(2).map((product) => (
                              <CompactProductCard 
                                key={product.id}
                                {...product}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
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
                onCompareProducts={(products, context) => {
                  setComparisonProducts(products);
                  setComparisonContext(context);
                  setRecommendedProducts([]); // Clear product grid when showing comparison
                }}
                externalQuery={assistantQuery}
                onExternalQueryHandled={() => setAssistantQuery(null)}
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


    </div>
  );
}