import {
  Search,
  Phone,
  User,
  ShoppingCart,
  Star,
  Home,
  ArrowRight,
  Truck,
  Clock,
  ThumbsUp,
  Award,
} from "lucide-react";
import { useState } from "react";
import Group from "../imports/Group";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgLogo from "figma:asset/2280106c426bb5fdc0c34172afb11fc1ded0f16d.png";

const megaMenuContent = {
  Keukenapparatuur: {
    columns: [
      {
        title: "Aziatische Keuken",
        items: [
          "Rijstkokers",
          "Teppanyakiplaten",
          "Wadijantafels",
          "Wokbranders en Kooktoestellen",
          "Wokafels",
        ],
      },
      {
        title: "Bakkerijmachines",
        items: [
          "Bakkersovens",
          "Broodsnijmachines",
          "Deegmengers en Kneedmachines",
          "Remrijskasten",
        ],
      },
      {
        title: "Slagerijmachines",
        items: [
          "Beenderzagen",
          "Gehaktmolens",
          "Hakblokken en Vleessnijafels",
          "Hamburgerpersen",
          "Vleesmenges",
          "Vleesverwarmers",
          "Worstvulmachines",
          "Vleesmenges",
        ],
      },
      {
        title: "Kooklijnen",
        items: [
          "Kooklijn 600",
          "Kooklijn 650",
          "Kooklijn 700",
          "Kooklijn 900",
        ],
      },
    ],
  },
  Keukenaccessoires: {
    columns: [
      {
        title: "Fornuizen en Kookplaten",
        items: [
          "Fornuizen met Onderstel",
          "Fornuizen met Oven",
          "Tafelmodel Fornuizen en Kookplaten",
          "Pannenwasteenfornuizen",
        ],
      },
      {
        title: "Kookketels, Braadpannen en Multicookers",
        items: [
          "Kantelbare Braadpannen",
          "Kookketels",
          "Aftapkranen",
          "Multicookers",
        ],
      },
      {
        title: "Grillplaten en Bakplaten",
        items: [
          "Barbecues",
          "Contactgrills en Panini Grills",
          "Wafelijzers en Crêpe platen",
          "Tafelmodel behaplaten en grillplaten",
          "Grills & bakplaten - tafelmodel",
          "Kebab, Döner en Shoarmagrills",
          "Kippengrills",
          "Lavasteeen Grills",
          "Losse Grillplaten",
          "Poffertjeslplaten",
          "Watergrills",
        ],
      },
    ],
  },
  "Koelen & Vriezen": {
    columns: [
      {
        title: "Friteuses",
        items: [
          "Bakkerijfriteuses en Visfriteuses",
          "Friteuses met Onderstel",
          "Tafelmodel Friteuses",
          "Inbouw Friteuses",
        ],
      },
      {
        title: "Ovens, Combisteamers en Magnetrons",
        items: [
          "Combisteamers",
          "Droogovens",
          "Heteluchtovens",
          "Magnetrons",
          "Pizza ovens",
          "Rookovens",
          "Houtskool Ovens - BBQ Ovens",
        ],
      },
      {
        title: "Pizza en Pasta Apparatuur",
        items: [
          "Deegmachines",
          "Deegrollers",
          "Pastakookers",
          "Pastamachines",
          "Pizzaplettes",
        ],
      },
      {
        title: "Toasters",
        items: [
          "Doorlooptoasters",
          "Toasters en Broodroasters",
          "Tosti apparaten",
        ],
      },
    ],
  },
};

interface WebshopHeaderProps {
  onOpenAssistant?: () => void;
  onHoverAssistantButton?: (isHovering: boolean) => void;
  onNavigateToCategory?: () => void;
  onNavigateHome?: () => void;
}

const mockProducts = [
  {
    id: 1,
    name: "Diamond | Spoelmiddel product ovens met auto...",
    image:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=200",
    price: "€ 128,25",
    oldPrice: "€ 171,00",
  },
  {
    id: 2,
    name: "Diamond | Wasmiddel product ovens met auto...",
    image:
      "https://images.unsplash.com/photo-1563979355-c6c0146d4a23?w=200",
    price: "€ 117,00",
    oldPrice: "€ 156,00",
  },
  {
    id: 3,
    name: "Diamond | Elektrische oven stoom/convectieoven, 7x...",
    image:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200",
    price: "€ 3.354,00",
    oldPrice: "€ 4.472,00",
  },
  {
    id: 4,
    name: "Diamond | TOUCH SCREEN oven elektrische...",
    image:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=200",
    price: "€ 4.585,00",
    oldPrice: "€ 6.113,00",
  },
  {
    id: 5,
    name: "Diamond | TOUCH SCREEN oven gas...",
    image:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200",
    price: "€ 5.803,00",
    oldPrice: "€ 7.737,00",
  },
  {
    id: 6,
    name: "Diamond | Elektrische oven stoom/convectieoven, 11x...",
    image:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=200",
    price: "€ 5.966,00",
    oldPrice: "€ 7.954,00",
  },
];

export function WebshopHeader({
  onOpenAssistant,
  onHoverAssistantButton,
  onNavigateToCategory,
  onNavigateHome,
}: WebshopHeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const showSearchDropdown =
    isSearchFocused && searchQuery.length > 0;

  const popularSuggestions = [
    "pizza oven",
    "hete lucht oven",
    "bartscher oven",
    "hetelucht oven",
    "unox oven",
    "pizza ovens",
  ];

  const categories = [
    "Fornuizen met Oven",
    "Heteluchtovens",
    "Bakkersovens",
    "Ovens, Combisteamers en Magnetrons",
    "Rookovens",
    "Droogovens",
  ];

  return (
    <header className="bg-white border-b">
      {/* Top bar */}
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span>Gratis verzending vanaf €250,-</span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                Levertijd 1 tot 4 werkdagen, mits op voorraad
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>Uitstekende klantservice</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Elders goedkoper? Bel ons!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-col">
            <img
              src={imgLogo}
              alt="Horeca Grootkeukenshow logo"
              className="h-16 w-auto"
            />
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="Waar bent u naar op zoek?"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#86a201] text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={(e) => {
                  // Delay to allow clicks on dropdown items
                  setTimeout(
                    () => setIsSearchFocused(false),
                    200,
                  );
                }}
              />
            </div>

            {/* Search Dropdown */}
            {showSearchDropdown && (
              <div
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-50"
                style={{ width: "920px", marginLeft: "-180px" }}
              >
                <div className="p-6">
                  <div className="grid grid-cols-[300px_1fr] gap-6">
                    {/* Left Column - Suggestions */}
                    <div className="space-y-6">
                      {/* HGS Buddy option */}
                      <button
                        onClick={() => {
                          onOpenAssistant?.();
                          setIsSearchFocused(false);
                        }}
                        className="group w-full flex items-center gap-3 p-3 bg-[#86a201] hover:bg-white text-white hover:text-[#86a201] border-2 border-transparent hover:border-[#86a201] rounded-[50px] transition-colors"
                      >
                        <div className="w-5 h-5 flex-shrink-0 text-white group-hover:text-[#86a201]">
                          <Group />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-sm">
                            Vraag het aan HGS Buddy
                          </div>
                          <div className="text-xs opacity-90">
                            "{searchQuery}"
                          </div>
                        </div>
                      </button>

                      {/* Popular Suggestions */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase">
                          POPULAIRE SUGGESTIES
                        </h3>
                        <ul className="space-y-2">
                          {popularSuggestions.map(
                            (suggestion, index) => (
                              <li key={index}>
                                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#86a201] w-full text-left">
                                  <Search className="w-4 h-4" />
                                  {suggestion}
                                </button>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* Categories */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase">
                          CATEGORIEËN
                        </h3>
                        <ul className="space-y-2">
                          {categories.map((category, index) => (
                            <li key={index}>
                              <a
                                href="#"
                                className="text-sm text-gray-700 hover:text-[#86a201] block"
                              >
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
                      <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase">
                        ARTIKELEN
                      </h3>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {mockProducts.map((product) => (
                          <div
                            key={product.id}
                            className="group cursor-pointer"
                          >
                            <div className="aspect-square bg-gray-50 rounded mb-2 overflow-hidden">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="text-xs text-[#86a201] font-medium mb-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-gray-900">
                                {product.price}
                              </span>
                              <span className="text-xs text-gray-400 line-through">
                                {product.oldPrice}
                              </span>
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

          {/* Right side */}
          <div className="flex items-center gap-6">
            {/* Reviews */}
            <div className="flex flex-col items-end">
              <div className="flex gap-0.5 text-[#86a201]">
                {[1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                  />
                ))}
                <Star className="w-4 h-4 fill-current opacity-50" />
              </div>
              <span className="text-xs text-gray-600">
                8.9 op basis van
              </span>
              <span className="text-xs text-gray-600">
                3840 klanten
              </span>
            </div>

            {/* Icons */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="bg-white border-t border-gray-200 relative"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="container mx-auto px-4">
          <ul className="flex gap-8 py-3 text-sm text-black items-center">
            <li>
              <button
                onClick={onNavigateHome}
                className="flex items-center gap-1 hover:text-[#86a201] py-3 font-bold text-[24px]"
              >
                <Home className="w-4 h-4" />
              </button>
            </li>
            <li>
              <button
                onClick={onOpenAssistant}
                onMouseEnter={() =>
                  onHoverAssistantButton?.(true)
                }
                onMouseLeave={() =>
                  onHoverAssistantButton?.(false)
                }
                className="group flex items-center gap-2 bg-[#86a201] hover:bg-white text-white hover:text-[#86a201] px-4 py-2 rounded-[50px] transition-all font-bold border-2 border-[#86a201] hover:scale-105"
              >
                <div className="w-4 h-4 [&_path]:fill-white group-hover:[&_path]:fill-[#86a201] [&_svg]:fill-white group-hover:[&_svg]:fill-[#86a201] transition-all">
                  <Group />
                </div>
                <span>HGS Buddy</span>
              </button>
            </li>
            <li
              onMouseEnter={() =>
                setActiveMenu("Keukenapparatuur")
              }
              className="relative"
            >
              <button
                onClick={onNavigateToCategory}
                className="hover:text-[#86a201] border-b-2 border-transparent hover:border-[#86a201] py-3 inline-block font-bold"
              >
                Keukenapparatuur
              </button>
            </li>
            <li
              onMouseEnter={() =>
                setActiveMenu("Keukenaccessoires")
              }
              className="relative"
            >
              <a
                href="#"
                className="hover:text-[#86a201] border-b-2 border-transparent hover:border-[#86a201] py-3 inline-block font-bold"
              >
                Keukenaccessoires
              </a>
            </li>
            <li
              onMouseEnter={() =>
                setActiveMenu("Koelen & Vriezen")
              }
              className="relative"
            >
              <a
                href="#"
                className="hover:text-[#86a201] border-b-2 border-transparent hover:border-[#86a201] py-3 inline-block font-bold"
              >
                Koelen & Vriezen
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#86a201] border-b-2 border-transparent hover:border-[#86a201] py-3 inline-block font-bold"
              >
                Warmhouden
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#86a201] border-b-2 border-transparent hover:border-[#86a201] py-3 inline-block font-bold"
              >
                Cafe, Bar & Buffet
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#86a201] border-b-2 border-transparent hover:border-[#86a201] py-3 inline-block font-bold"
              >
                Hygiëne
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#86a201] border-b-2 border-transparent hover:border-[#86a201] py-3 inline-block font-bold"
              >
                RVS
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#86a201] border-b-2 border-transparent hover:border-[#86a201] py-3 inline-block font-bold"
              >
                Actie
              </a>
            </li>
          </ul>
        </div>

        {/* Mega Menu */}
        {activeMenu &&
          megaMenuContent[
            activeMenu as keyof typeof megaMenuContent
          ] && (
            <div className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-50 pt-4">
              <div className="container mx-auto px-4 pb-8">
                <div className="grid grid-cols-4 gap-6">
                  {megaMenuContent[
                    activeMenu as keyof typeof megaMenuContent
                  ].columns.map((column, index) => (
                    <div key={index}>
                      <h3 className="mb-3">{column.title}</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <a
                              href="#"
                              className="hover:text-[#86a201]"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </nav>
    </header>
  );
}