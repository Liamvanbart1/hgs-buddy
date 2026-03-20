import image_96173051201b008cf506d7e3caf3321d388a8e6f from 'figma:asset/96173051201b008cf506d7e3caf3321d388a8e6f.png';
import image_0e87240ae992198c60d3008419bbbecb58727f3b from 'figma:asset/0e87240ae992198c60d3008419bbbecb58727f3b.png';
import image_b5c7efb4a9f821d7c3bb6b0d775cb24d3cacb10e from 'figma:asset/b5c7efb4a9f821d7c3bb6b0d775cb24d3cacb10e.png';
import image_775430214e6d77b7cfab4345edeb6db8f6535496 from 'figma:asset/775430214e6d77b7cfab4345edeb6db8f6535496.png';
import { useState } from 'react';
import { WebshopHeader } from './WebshopHeader';
import { ProductCard } from './ProductCard';
import { DigitalAssistant } from './DigitalAssistant';
import { SpecTooltip } from './SpecTooltip';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Star, ShoppingCart, FileText, ChevronLeft } from 'lucide-react';
import Group from '../imports/Group';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  specs: Record<string, string>;
  inStock: boolean;
  imageUrl: string;
  articleNumber?: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
}

const currentProduct: Product = {
  id: 5,
  name: 'Bartscher | Heteluchtoven AT90',
  category: 'Keukenapparatuur',
  price: '432,-',
  oldPrice: '575,-',
  inStock: true,
  imageUrl: image_b5c7efb4a9f821d7c3bb6b0d775cb24d3cacb10e,
  articleNumber: 'BS-A120786',
  rating: 4,
  reviewCount: 1958,
  features: [
    '5 jaar volledige garantie op storingen',
    '2 jaar garantie op slijtage onderdelen',
    'Standaard 1 jaar fabrieksgarantie',
    'Voldoet aan alle Europese veiligheidseisen',
    'Geschikt voor professioneel gebruik'
  ]
};

const productImages = [
  image_b5c7efb4a9f821d7c3bb6b0d775cb24d3cacb10e,
  image_b5c7efb4a9f821d7c3bb6b0d775cb24d3cacb10e,
  image_0e87240ae992198c60d3008419bbbecb58727f3b,
  image_0e87240ae992198c60d3008419bbbecb58727f3b,
  image_96173051201b008cf506d7e3caf3321d388a8e6f,
  image_775430214e6d77b7cfab4345edeb6db8f6535496
];

const specifications = {
  'Algemeen': {
    'Merk': 'Bartscher',
    'Serie': 'AT',
    'Type': 'Heteluchtoven',
    'Model': 'AT90'
  },
  'Kenmerken': {
    'Bak niveau': '5',
    'Vermogen': '2,8 kW',
    'Spanning': '230V',
    'Capaciteit': '4x GN 1/1 of 4x 600x400mm',
    'Temperatuur bereik': '50-300°C',
    'Materiaal buitenzijde': 'RVS',
    'Deur': 'Dubbel glas',
    'Verlichting': 'Ja',
    'Kookruimte verlichting': 'Ja',
    'Timer': 'Digitaal',
    'Thermostaat': 'Digitaal',
    'Stoomfunctie': 'Nee',
    'Oven reiniging': 'Handmatig',
    'Koelsysteem': 'Ventilator',
    'Gewicht netto': '42 kg',
    'Gewicht bruto': '45 kg'
  },
  'Afmetingen': {
    'Breedte': '595 mm',
    'Diepte': '615 mm',
    'Hoogte': '585 mm',
    'Bakplaat afmetingen': 'GN 1/1 (530x325mm)'
  },
  'Accessoires': {
    'Aantal roosters': '4',
    'Aantal bakplaten': '0',
    'Condensopvang': 'Ja'
  }
};

const relatedProducts: Product[] = [
  {
    id: 101,
    name: 'Bartscher | Bakplaat geemailleerd GN 1/1',
    category: 'Accessoires',
    price: '28,-',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300',
    specs: {}
  },
  {
    id: 102,
    name: 'Bartscher | Rooster GN 1/1',
    category: 'Accessoires',
    price: '35,-',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300',
    specs: {}
  },
  {
    id: 103,
    name: 'Bartscher | Bakplaat geperforeerd GN 1/1',
    category: 'Accessoires',
    price: '42,-',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300',
    specs: {}
  },
  {
    id: 104,
    name: 'Bartscher | Pizzaplaat Ø 320mm',
    category: 'Accessoires',
    price: '31,-',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300',
    specs: {}
  },
  {
    id: 105,
    name: 'Bartscher | Onderstel voor oven',
    category: 'Accessoires',
    price: '485,-',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300',
    specs: {}
  }
];

const alsoViewedProducts: Product[] = [
  {
    id: 201,
    name: 'Bartscher | Convectieoven E6010',
    category: 'Keukenapparatuur',
    price: '3.295,-',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300',
    specs: {}
  },
  {
    id: 202,
    name: 'Bartscher | Mini Oven',
    category: 'Keukenapparatuur',
    price: '895,-',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300',
    specs: {}
  },
  {
    id: 203,
    name: 'Bartscher | Pizza Oven',
    category: 'Keukenapparatuur',
    price: '1.650,-',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300',
    specs: {}
  }
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

interface ProductPageProps {
  onNavigateHome?: () => void;
  onNavigateCategory?: () => void;
}

export function ProductPage({ onNavigateHome, onNavigateCategory }: ProductPageProps) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAssistantPeeking, setIsAssistantPeeking] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [assistantQuery, setAssistantQuery] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specifications');

  const handleCloseAssistant = () => {
    setIsAssistantOpen(false);
    setIsAssistantPeeking(false);
  };

  const handleAskAssistant = (text: string) => {
    setIsAssistantOpen(true);
    setAssistantQuery(`Leg uit: \"${text}\"`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
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
                <button onClick={onNavigateHome} className="hover:text-[#86a201] transition-colors">Home</button>
                <ChevronRight className="w-4 h-4" />
                <button onClick={onNavigateCategory} className="hover:text-[#86a201] transition-colors">
                  Keukenapparatuur
                </button>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900">{currentProduct.name}</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            {/* Product Main Section */}
            <div className="grid grid-cols-2 gap-12 mb-12">
              {/* Left - Images */}
              <div>
                <div className="relative bg-gray-50 rounded-lg p-8 mb-4 aspect-square flex items-center justify-center">
                  <img 
                    src={productImages[selectedImage]} 
                    alt={currentProduct.name}
                    className="max-w-full max-h-full object-contain"
                  />
                  {/* Nieuw badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
                    Nieuw
                  </div>
                </div>
                {/* Thumbnails */}
                <div className="grid grid-cols-6 gap-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square bg-gray-50 rounded border-2 p-2 hover:border-[#86a201] transition-colors ${
                        selectedImage === idx ? 'border-[#86a201]' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Product Info */}
              <div>
                {/* Product Title EERST */}
                <h1 className="text-3xl font-bold mb-6">{currentProduct.name}</h1>

                {/* DAARNA: Top section with info table and logo */}
                <div className="flex justify-between items-start mb-6">
                  <table className="text-sm">
                    <tbody>
                      <tr>
                        <td className="text-gray-600 pr-8 py-1.5">Merk:</td>
                        <td className="font-medium">Bartscher</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600 pr-8 py-1.5">Artikelnummer:</td>
                        <td className="font-medium">{currentProduct.articleNumber}</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600 pr-8 py-1.5">Beschikbaarheid:</td>
                        <td className="font-medium text-[#86a201] flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Op voorraad
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  {/* Bartscher Logo */}
                  <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-700">BARTSCHER</span>
                  </div>
                </div>

                {/* Product Description - In het kort */}
                <div className="mb-6 text-sm leading-relaxed text-gray-700">
                  <p>
                    <span className="text-[#ff6b35] font-semibold">In het kort:</span> De Bartscher Heteluchtoven AT90 is een professionele, compacte heteluchtoven met 4 bakniveaus en een capaciteit van 4x GN 1/1 of 4x 600x400mm. Met een temperatuurbereik van 50-300°C en 2,8 kW vermogen is deze oven ideaal voor horecagebruik. Voorzien van dubbel glas deur, digitale bediening en binnenverlichting. Inclusief 2 jaar fabrieksgarantie.
                  </p>
                </div>

                {/* Pricing Section */}
                <div className="border border-gray-300 rounded-lg p-6 mb-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-gray-500 line-through text-2xl">{currentProduct.oldPrice}</span>
                      <span className="text-5xl font-bold text-[#86a201]">{currentProduct.price}</span>
                    </div>
                    <span className="text-sm text-gray-600">Incl. BTW: 522,72</span>
                  </div>
                  <p className="text-lg text-gray-900 font-semibold mb-6">U bespaart 143,-</p>

                  {/* Quantity Selector and Add to Cart */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col items-center border border-gray-300 rounded overflow-hidden">
                      <button className="px-4 py-1 hover:bg-gray-100 transition-colors text-lg font-bold">▲</button>
                      <input 
                        type="text" 
                        value="3" 
                        readOnly
                        className="w-12 text-center border-y border-gray-300 py-2 font-semibold"
                      />
                      <button className="px-4 py-1 hover:bg-gray-100 transition-colors text-lg font-bold">▼</button>
                    </div>
                    <button className="flex-1 bg-[#ff6b35] hover:bg-[#ff5520] text-white py-3 px-6 rounded font-semibold flex items-center justify-center gap-2 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                      In winkelwagen
                    </button>
                  </div>

                  {/* Product Details Link */}
                  <a href="#" className="text-[#86a201] hover:underline text-sm font-medium block">
                    Bekijk product details
                  </a>
                </div>

                {/* USPs Section in gray box */}
                <div className="bg-gray-100 rounded-lg p-6 space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#86a201] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-gray-900">
                      Elders goedkoper? Bel ons! <span className="font-semibold">020 - 240 66 20</span>.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#86a201] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">Verzending:</span> Gratis binnen Nederland vanaf €250,-
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#86a201] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">Levertijd:</span> 1 tot 4 werkdagen, mits op voorraad
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#86a201] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-gray-900">
                      Bij vragen, direct contact met één van onze medewerkers
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 pt-4">
                  <span className="text-5xl font-bold text-[#86a201]">8,9</span>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(currentProduct.rating || 0)}
                    </div>
                    <span className="text-sm text-gray-600">{currentProduct.reviewCount} beoordelingen</span>
                  </div>
                </div>

                {/* HGS Buddy Quick Replies */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 text-[#86a201]">
                      <Group />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Vragen over dit product?</h3>
                      <p className="text-sm text-gray-600">Stel direct een vraag aan HGS Buddy</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsAssistantOpen(true);
                        setAssistantQuery("Wat is het energieverbruik van deze oven?");
                      }}
                      className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                    >
                      Wat is het energieverbruik van deze oven?
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsAssistantOpen(true);
                        setAssistantQuery("Welke bakplaten zijn geschikt voor deze oven?");
                      }}
                      className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                    >
                      Welke bakplaten zijn geschikt voor deze oven?
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsAssistantOpen(true);
                        setAssistantQuery("Hoe reinig ik deze heteluchtoven het beste?");
                      }}
                      className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                    >
                      Hoe reinig ik deze heteluchtoven het beste?
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsAssistantOpen(true);
                        setAssistantQuery("Wat zijn vergelijkbare alternatieven voor deze oven?");
                      }}
                      className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                    >
                      Wat zijn vergelijkbare alternatieven voor deze oven?
                    </button>
                    
                    <button
                      onClick={() => setIsAssistantOpen(true)}
                      className="group w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#86a201] hover:bg-white text-white hover:text-[#86a201] border-2 border-transparent hover:border-[#86a201] rounded-[50px] transition-colors mt-2"
                      style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: '16px' }}
                    >
                      <div className="w-[18px] h-[18px] flex-shrink-0 text-white group-hover:text-[#86a201]">
                        <Group />
                      </div>
                      Stel een andere vraag aan HGS Buddy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="mb-12">
              {/* Tab Headers */}
              <div className="border-b mb-6">
                <div className="flex gap-8">
                  {[
                    { id: 'info', label: 'Meer info product' },
                    { id: 'specifications', label: 'Productspecificaties' },
                    { id: 'reviews', label: 'Beoordelingen' },
                    { id: 'warranty', label: 'Garantie' },
                    { id: 'documents', label: 'Documenten' },
                    { id: 'parts', label: 'Reserveonderdelen' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 px-2 font-medium transition-colors relative ${
                        activeTab === tab.id
                          ? 'text-[#86a201]'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#86a201]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'specifications' && (
                <div className="space-y-8">
                  {Object.entries(specifications).map(([category, specs]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-4">{category}</h3>
                      <table className="w-full">
                        <tbody>
                          {Object.entries(specs).map(([key, value], idx) => (
                            <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="py-3 px-4 text-sm font-medium text-gray-700 w-1/3">
                                <SpecTooltip term={key} onAskAssistant={(q) => {
                                  setIsAssistantOpen(true);
                                  setAssistantQuery(q);
                                }} />
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-900">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Gerelateerde producten - Accessories */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Accessoires</h2>
              <div className="grid grid-cols-5 gap-6">
                {relatedProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white group">
                    <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 relative">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                      <button className="absolute bottom-3 right-3 bg-[#ff6b35] hover:bg-[#ff5520] text-white p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                        {product.name}
                      </h3>
                      <div className="text-lg font-semibold text-gray-900">€ {product.price}</div>
                      {product.inStock && (
                        <div className="flex items-center gap-1 text-xs text-green-600 font-medium mt-2">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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

            {/* Also Viewed Products */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Klanten die dit product kochten, kochten ook</h2>
              <div className="grid grid-cols-5 gap-6">
                {alsoViewedProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white group">
                    <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 relative">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                      <button className="absolute bottom-3 right-3 bg-[#ff6b35] hover:bg-[#ff5520] text-white p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                        {product.name}
                      </h3>
                      <div className="text-lg font-semibold text-gray-900">€ {product.price}</div>
                      {product.inStock && (
                        <div className="flex items-center gap-1 text-xs text-green-600 font-medium mt-2">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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

            {/* Service Icons */}
            <div className="grid grid-cols-4 gap-8 py-12 border-t">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-8 h-8 text-[#86a201]" />
                </div>
                <h3 className="font-semibold mb-1">Gratis verzending</h3>
                <p className="text-sm text-gray-600">Vanaf €150,-</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-[#86a201]" />
                </div>
                <h3 className="font-semibold mb-1">Snelle levering</h3>
                <p className="text-sm text-gray-600">Binnen 2-3 werkdagen</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-[#86a201]" />
                </div>
                <h3 className="font-semibold mb-1">Uitstekende service</h3>
                <p className="text-sm text-gray-600">Persoonlijk advies</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ChevronRight className="w-8 h-8 text-[#86a201]" />
                </div>
                <h3 className="font-semibold mb-1">5 jaar garantie</h3>
                <p className="text-sm text-gray-600">Op geselecteerde producten</p>
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
            
            {/* Products Grid - Takes remaining space left of assistant */}
            {recommendedProducts.length > 0 && (() => {
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
    </div>
  );
}