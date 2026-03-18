import image_a6f21462cc405079cdd2ae34aef56a46d8e35740 from "figma:asset/a6f21462cc405079cdd2ae34aef56a46d8e35740.png";
import image_dce74fdb14eb802694d5bff3e866d069a5c57b2a from "figma:asset/dce74fdb14eb802694d5bff3e866d069a5c57b2a.png";
import image_fc9da1e3760e10a2ff2466700605b512abd4db9c from "figma:asset/fc9da1e3760e10a2ff2466700605b512abd4db9c.png";
import {
  Send,
  X,
  ShoppingBag,
  Scale,
  Info,
  ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Group from "../imports/Group";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text?: string;
  sender: "user" | "assistant";
  type?:
    | "text"
    | "product-suggestion"
    | "comparison"
    | "specification"
    | "alternatives"
    | "recommendation";
  data?: any;
  suggestions?: string[];
}

interface QuestionnaireState {
  isActive: boolean;
  currentStep: number;
  apparaatType: string;
  answers: {
    ovenType?: string;
    horecaType?: string;
    capaciteit?: string;
    gebruik?: string;
    budget?: string;
  };
}

interface ComparisonFlowState {
  isActive: boolean;
  currentStep: number;
  products: any[];
  searchQuery: string;
}

interface DigitalAssistantProps {
  onClose?: () => void;
  onOpen?: () => void;
  onHoverFloatingButton?: (isHovering: boolean) => void;
  onRecommendProducts?: (products: any[]) => void;
  onCompareProducts?: (products: any[], context: any) => void;
  externalQuery?: string | null;
  onExternalQueryHandled?: () => void;
  externalRecommendation?: any | null;
  onExternalRecommendationHandled?: () => void;
}

const mockProducts = [
  {
    id: 1,
    name: "Combisteamer - Rational iCombi Pro 10x1/1",
    category: "Keukenapparatuur › Ovens & Combisteamers",
    price: "€12.499,-",
    description:
      "Krachtige professionele combisteamer met intelligent kooksysteem voor perfecte resultaten",
    rating: 5,
    reviews: 342,
    inStock: true,
    imageUrl: image_fc9da1e3760e10a2ff2466700605b512abd4db9c,
    specs: {
      Capaciteit: "10x 1/1 GN",
      Vermogen: "18,7 kW",
      Aansluitwaarde: "400V 3N",
      Afmetingen: "847 x 771 x 1084 mm",
      "Type bediening": 'Touchscreen 7"',
    },
  },
  {
    id: 2,
    name: "Convotherm Combisteamer 10x1/1 GN",
    category: "Keukenapparatuur › Ovens & Combisteamers",
    price: "€11.299,-",
    description:
      "Ultrakompact ontwerp ideaal voor onderweg werken met premium afwerking",
    rating: 4,
    reviews: 279,
    inStock: true,
    imageUrl: image_dce74fdb14eb802694d5bff3e866d069a5c57b2a,
    specs: {
      Capaciteit: "10x 1/1 GN",
      Vermogen: "18,0 kW",
      Aansluitwaarde: "400V 3N",
      Afmetingen: "843 x 776 x 1091 mm",
      "Type bediening": 'Touchscreen 5"',
    },
  },
  {
    id: 3,
    name: "Electrolux Combisteamer 10x1/1 GN",
    category: "Keukenapparatuur › Ovens & Combisteamers",
    price: "€9.899,-",
    description:
      "Geavanceerde smartphone met professionele camera en 5G connectiviteit",
    rating: 5,
    reviews: 507,
    inStock: true,
    imageUrl: image_a6f21462cc405079cdd2ae34aef56a46d8e35740,
    specs: {
      Capaciteit: "10x 1/1 GN",
      Vermogen: "17,5 kW",
      Aansluitwaarde: "400V 3N",
      Afmetingen: "850 x 780 x 1095 mm",
      "Type bediening": "Display + knoppen",
    },
  },
];

export function DigitalAssistant({
  onClose,
  onOpen,
  onHoverFloatingButton,
  onRecommendProducts,
  onCompareProducts,
  externalQuery,
  onExternalQueryHandled,
  externalRecommendation,
  onExternalRecommendationHandled,
}: DigitalAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welkom bij HorecaGrootKeukenshop.nl\n\nIk ben de HGS Buddy, jouw digitale shoppingassistent.\n\nTwijfel je tussen producten of weet je niet waar je moet beginnen?\n\nIk help je stap voor stap bij het kiezen van de juiste horeca-apparatuur.\n\nBeschrijf je situatie, zoals het type keuken, het gebruik of de beschikbare ruimte. Ik vergelijk opties voor je en geef gericht advies dat past bij jouw situatie.",
      sender: "assistant",
      type: "text",
      suggestions: [
        "Ik ben op zoek naar een oven",
        "Is dit product geschikt voor mijn situatie",
        "Ik wil producten vergelijken",
        "Leg de specificaties uit",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [hasRecommendedProducts, setHasRecommendedProducts] =
    useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [questionnaireState, setQuestionnaireState] =
    useState<QuestionnaireState>({
      isActive: false,
      currentStep: 1,
      apparaatType: "",
      answers: {},
    });
  const [comparisonFlowState, setComparisonFlowState] =
    useState<ComparisonFlowState>({
      isActive: false,
      currentStep: 1,
      products: [],
      searchQuery: "",
    });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // If onOpen is provided, render the floating button
  if (onOpen) {
    return (
      <div
        className="fixed bottom-6 right-6"
        style={{ zIndex: 110 }}
      >
        <button
          onClick={onOpen}
          onMouseEnter={() =>
            onHoverFloatingButton && onHoverFloatingButton(true)
          }
          onMouseLeave={() =>
            onHoverFloatingButton &&
            onHoverFloatingButton(false)
          }
          className="group bg-[#86a201] hover:bg-white text-white hover:text-[#86a201] border-2 border-transparent hover:border-[#86a201] rounded-full p-4 shadow-lg transition-all flex items-center gap-2"
        >
          <div className="w-6 h-6 text-white group-hover:text-[#86a201]">
            <Group />
          </div>
        </button>
      </div>
    );
  }

  const getAssistantResponse = (
    userMessage: string,
  ): Message[] => {
    const lowerMessage = userMessage.toLowerCase();

    // Product-specific questions from ProductPage
    if (
      lowerMessage.includes("energieverbruik") &&
      lowerMessage.includes("oven")
    ) {
      return [
        {
          id: Date.now(),
          text: "Uitstekende vraag! Het energieverbruik is een belangrijke kostenpost in de horeca.\n\nVoor deze Bartscher heteluchtoven met 2,8 kW vermogen:\n\n📊 Energieverbruik berekening:\n• Vermogen: 2,8 kW\n• Per uur volledig gebruik: 2,8 kWh\n• Bij gemiddelde energieprijs van €0,30/kWh\n• Kosten per uur: €0,84\n\n💰 Praktijkvoorbeeld (dagelijks gebruik):\n• 4 uur gebruik per dag = €3,36/dag\n• 22 werkdagen per maand = €73,92/maand\n• Per jaar = €887,04\n\n💡 Besparingstips:\n• Gebruik de oven alleen wanneer volledig gevuld\n• Voorverwarm niet langer dan nodig (5-10 min is voldoende)\n• Regelmatig onderhoud houdt het apparaat efficiënt\n• Overweeg een timer om onnodig gebruik te voorkomen\n\n✅ Deze oven heeft 230V aansluiting, dus geen dure krachtstroom nodig!\n\nHeb je vragen over vergelijkbare modellen met lager verbruik?",
          sender: "assistant",
          type: "text",
          suggestions: [
            "Vergelijk met energie-efficiënte modellen",
            "Wat zijn de onderhoudskosten?",
            "Toon alternatieven",
          ],
        },
      ];
    }

    if (
      lowerMessage.includes("bakplaten") &&
      lowerMessage.includes("geschikt")
    ) {
      return [
        {
          id: Date.now(),
          text: "Goede vraag! De juiste bakplaten maken het verschil in resultaat en efficiëntie.\n\n📐 Voor deze Bartscher oven (433 x 333 x 341 mm):\n\nGeschikte bakplaten:\n• GN 1/1 formaat (530 x 325 mm) - standaard\n• 4 stuks gelijktijdig mogelijk\n• Ook geschikt: 600 x 400 mm bakplaten (standaard bakkerij formaat)\n\n🔧 Aanbevolen materialen:\n\n1. Geperforeerde aluminium bakplaten\n   ✅ Beste voor: brood, broodjes, gebak\n   ✅ Voordeel: perfecte hete lucht circulatie\n   ✅ Prijs: €25-45 per stuk\n\n2. Vlakke aluminium bakplaten\n   ✅ Beste voor: pizza, plaatkoek, vlaaien  \n   ✅ Voordeel: gemakkelijk schoon te maken\n   ✅ Prijs: €20-35 per stuk\n\n3. Anti-aanbak gecoate platen\n   ✅ Beste voor: kip, vis, groenten\n   ✅ Voordeel: minder vet nodig, makkelijk reinigen\n   ✅ Prijs: €35-60 per stuk\n\n💡 Pro tip: Investeer in minstens 8 bakplaten zodat u kunt doorwerken terwijl andere afkoelen/gereinigd worden.\n\nWilt u direct bakplaten bestellen of meer info over specifieke toepassingen?",
          sender: "assistant",
          type: "text",
          suggestions: [
            "Toon geschikte bakplaten",
            "Wat is het beste materiaal voor pizza?",
            "Hoeveel bakplaten heb ik nodig?",
          ],
        },
      ];
    }

    if (
      lowerMessage.includes("reinig") &&
      lowerMessage.includes("heteluchtoven")
    ) {
      return [
        {
          id: Date.now(),
          text: "Goed onderhoud verlengt de levensduur aanzienlijk en houdt de oven efficiënt!\n\n🧹 Dagelijks onderhoud (5-10 minuten):\n\n1. Na elk gebruik (oven nog lauw):\n   • Veeg binnenkant uit met vochtige doek\n   • Verwijder voedselresten en kruimels\n   • Reinig de deur met glasreiniger\n   • Controleer de deurrubber op beschadigingen\n\n2. Ventilatierooster:\n   • Stofzuig of borstel af\n   • Houd altijd vrij voor goede luchtcirculatie\n\n🧼 Wekelijks grondige reiniging (30 min):\n\n1. Binnenkant:\n   • Gebruik speciale ovenreiniger (ontvet)\n   • Laat 10-15 min inwerken bij hardnekkig vet\n   • Spoel goed na met schone doek\n   • Droog volledig voor gebruik\n\n2. Bakplaten en roosters:\n   • Week in heet water met afwasmiddel\n   • Gebruik nylon borstel (geen staalwol!)\n   • Spoel en droog grondig\n\n3. Buitenkant:\n   • RVS-reiniger voor glanzend resultaat\n   • Let op vingerafdrukken en spatten\n\n⚠️ NOOIT doen:\n• Hogedrukspuit gebruiken (beschadigt elektronica)\n• Schurende middelen op glas\n• Oven reinigen terwijl nog heet\n• Water in ventilatieopeningen\n\n💡 Pro tip: Plaats aluminiumfolie onder bakplaten om druipen op te vangen - scheelt reinigingstijd!\n\nWilt u een onderhoudsschema of professionele reinigingsproducten?",
          sender: "assistant",
          type: "text",
          suggestions: [
            "Aanbevolen reinigingsproducten",
            "Hoe vaak groot onderhoud?",
            "Wat bij hardnekkige aanslag?",
          ],
        },
      ];
    }

    if (
      lowerMessage.includes("alternatieven") &&
      lowerMessage.includes("oven")
    ) {
      return [
        {
          id: Date.now(),
          text: "Ik help u graag met het vinden van vergelijkbare alternatieven!\n\nOp basis van de Bartscher Mini-oven heb ik deze alternatieven geselecteerd:\n\n🔄 Vergelijkbare opties:\n\n1. Budget-vriendelijker:\n   • Hendi heteluchtoven 2,5 kW - €389,-\n   • 10% minder vermogen maar €70 goedkoper\n   • Iets compacter (ideaal bij beperkte ruimte)\n   • Geschikt voor: kleine bakkerij, lunchroom\n\n2. Meer capaciteit:\n   • Bartscher heteluchtoven 4,2 kW - €649,-  \n   • 6 GN 1/1 bakplaten (50% meer capaciteit)\n   • Hoger verbruik maar efficiënter bij grote volumes\n   • Geschikt voor: middelgroot restaurant, catering\n\n3. Premium optie met extra functies:\n   • Unox XAFT-04HS-ELDV - €1.249,-\n   • Digitale bediening met timer\n   • Stoomfunctie voor beter bakresultaat  \n   • Energiezuiniger (A+ label)\n   • Geschikt voor: banketbakkerij, hotel\n\n📊 Wat is belangrijk voor uw keuze?\n• Budget?\n• Capaciteit (hoeveel producties per dag)?\n• Type producten (brood, vlees, gebak)?\n• Beschikbare ruimte?\n• Energieverbruik?\n\nVertel me meer over uw situatie, dan kan ik de beste match maken!",
          sender: "assistant",
          type: "text",
          suggestions: [
            "Vergelijk deze opties",
            "Wat is de beste voor een bakkerij?",
            "Toon alleen energie-zuinige modellen",
          ],
        },
      ];
    }

    // Technical term explanation (when text is selected)
    if (lowerMessage.startsWith("leg uit:")) {
      const term = userMessage
        .substring(9)
        .trim()
        .replace(/^"|"$/g, ""); // Remove "Leg uit: " and any quotes
      const lowerTerm = term.toLowerCase();

      // Create a knowledge base for technical terms
      const technicalExplanations: Record<
        string,
        {
          term: string;
          explanation: string;
          practical: string;
        }
      > = {
        vermogen: {
          term: "Vermogen — 2,8 kW",
          explanation:
            "Vermogen wordt uitgedrukt in kW (kilowatt) en geeft aan hoeveel energie het apparaat verbruikt én kan leveren. De Bartscher heteluchtoven AT90 heeft een vermogen van 2,8 kW — bewust laag zodat het apparaat op een gewoon stopcontact (230V) werkt, zonder krachtstroom.",
          practical:
            "✅ Wat betekent 2,8 kW in de praktijk?\n\n• Verwarmingstijd: 50-300°C bereikt u in ca. 10-15 minuten\n• Energieverbruik per uur: 2,8 kWh\n• Kosten per uur (bij €0,30/kWh): ±€0,84\n• Dagkosten (4 uur gebruik): ±€3,36\n• Maandkosten (22 werkdagen): ±€74,-\n\n💡 Netstroom vs. Krachtstroom:\n• Deze oven gebruikt 230V (normaal stopcontact) — geen krachtstroom nodig!\n• Apparaten boven ±3,5 kW vereisen 400V krachtstroom (extra installatie €500-2000)\n\n⚡ Geschikt voor:\nKleine horecazaken, lunchrooms, cafetaria's en keukens zonder krachtstroom.",
        },
        spanning: {
          term: "Spanning — 230V",
          explanation:
            "Spanning (uitgedrukt in Volt) geeft aan op welk elektriciteitsnet het apparaat moet worden aangesloten. De Bartscher AT90 werkt op 230V — de standaard netspanning in Nederland en België. Dit past op een gewoon stopcontact, zonder speciale installatie.",
          practical:
            "🔌 Wat betekent 230V voor u?\n\n• Geen speciale elektra-installatie nodig\n• Sluit direct aan op een standaard stopcontact (max. 16A groep)\n• Geen extra kosten voor krachtstroom-installatie\n• Ideaal als uw keuken geen krachtstroom heeft\n\n📊 Spanningsvergelijking horeca:\n\n• 230V (1-fase) — deze oven ✅\n  → Standaard stopcontact\n  → Max. ±3,5 kW vermogen\n  → Geen extra installatie\n\n• 400V 3N (krachtstroom / 3-fase)\n  → Nodig voor combisteamers, grote frituurpannen\n  → Vanaf 3,5 kW vermogen\n  → Installatie kost €500-2000 extra\n\n💡 Praktische tip:\nAls u later overstapt op een grotere oven (bijv. combisteamer), zorg dan nu al voor krachtstroom in uw keuken. Dat bespaart later verbouwingskosten!",
        },
        temperatuur: {
          term: "Temperatuurbereik — 50-300°C",
          explanation:
            "Het temperatuurbereik geeft aan tussen welke temperaturen het apparaat kan werken. De Bartscher AT90 werkt van 50°C tot 300°C — een breed bereik dat geschikt is voor vrijwel alle horeca-toepassingen.",
          practical:
            "🌡️ Waarvoor gebruikt u welke temperatuur?\n\n• 50-80°C: Warmhouden van gerechten, rijzen van brooddeeg\n• 100-150°C: Zacht bakken, cakes, vlaaien\n• 160-180°C: Standaard bakken, broodjes, croissants\n• 180-220°C: Vlees, gevogelte, gegrilde groenten\n• 220-250°C: Pizza, krokante producten, bladerdeeg\n• 260-300°C: Hoge hitte bakken, gratin, bruinen\n\n✅ Voordeel van hetelucht:\nDoor de ventilator circuleert de warme lucht gelijkmatig — dit zorgt voor 15-20% kortere baktijden en gelijkmatige resultaten op álle baklagen tegelijk.",
        },
        "bak niveau": {
          term: "Bak niveau — 5",
          explanation:
            "Het aantal bakniveaus geeft aan hoeveel bakplaten of roosters tegelijk in de oven passen. De Bartscher AT90 heeft 5 bakniveaus voor maximaal 5 GN 1/1 bakplaten tegelijk.",
          practical:
            "📦 Capaciteit in de praktijk:\n\n• 5 bakniveaus × GN 1/1 (530x325mm) = 5 volledige bakplaten\n• Per bakplaat: ±12-16 broodjes, of 1 pizza, of 4-6 stukken vlees\n• Totale capaciteit per cyclus: ±60-80 producten\n\n⏱️ Rekenvoorbeeld:\n• Cyclus van 15 minuten bij 180°C\n• 4 cycli per uur = 240-320 broodjes/uur\n\n💡 Tip: Schaf extra bakplaten aan zodat u kunt laden terwijl de vorige batch afkoelt.",
        },
        koelsysteem: {
          term: "Koelsysteem — Ventilator",
          explanation:
            "Het koelsysteem beschermt de buitenwand en elektronica van de oven tegen oververhitting. De Bartscher AT90 gebruikt een ventilator als koelsysteem.",
          practical:
            "🌀 Wat doet de koelventilator?\n\n• Koelt de buitenwand af tijdens en na gebruik\n• Beschermt de elektronica en bediening\n• Zorgt dat de oven veilig te hanteren is\n• Vermindert warmte-uitstraling naar de keukenruimte\n• Verlengt de levensduur van componenten\n\n⚠️ Belangrijk: Houd minimaal 10 cm ruimte vrij rondom de oven voor optimale luchtcirculatie. Nooit afdekken tijdens gebruik!",
        },
        materiaal: {
          term: "Materiaal buitenzijde — RVS",
          explanation:
            "RVS staat voor Roestvrij Staal (ook wel inox of stainless steel). Dit is het standaardmateriaal voor professionele horecaapparatuur vanwege de hygiënische en duurzame eigenschappen.",
          practical:
            "✨ Waarom RVS in de horeca?\n\n• Hygiënisch: Gladde oppervlakte, geen bacteriën in poriën\n• Corrosiebestendig: Bestand tegen vocht en reinigingsmiddelen\n• Duurzaam: Bestand tegen intensief dagelijks gebruik\n• Makkelijk te reinigen: Met RVS-reiniger snel schoon\n• Voldoet aan HACCP-normen voor voedselveiligheid\n\n🧹 Onderhoudstips:\n• Gebruik RVS-reiniger voor een glanzend resultaat\n• Poets altijd in de richting van het draadpatroon\n• Vermijd staalwol of schurende doekjes (beschadigt oppervlak)",
        },
        stoomfunctie: {
          term: "Stoomfunctie — Nee",
          explanation:
            "Een stoomfunctie injecteert waterdamp in de oven. De Bartscher AT90 heeft géén stoomfunctie. Dit is een bewuste keuze voor een compacte en betaalbare heteluchtoven.",
          practical:
            "💧 Heeft u een stoomfunctie nodig?\n\nZonder stoom (deze oven) — geschikt voor:\n✅ Broodjes, croissants, pastei, pizza\n✅ Vlees, gevogelte, ovenschotels\n✅ Cake, gebak en patisserie\n\nMét stoom (combisteamer) — geschikt voor:\n🔵 Ambachtelijk brood met knapperige korst\n🔵 Sous-vide en gestoomde gerechten\n🔵 Professionele combi-bereidingen\n\n💡 Wilt u wel een stoomfunctie? Dan zijn dit alternatieven:\n→ Rational iCombi Pro (vanaf €12.499,-)\n→ Convotherm Combisteamer (vanaf €11.299,-)\n\nZal ik deze vergelijken?",
        },
        timer: {
          term: "Timer — Digitaal",
          explanation:
            "De digitale timer stelt u in staat om een exacte baktijd in te stellen. De oven geeft een signaal als de tijd om is.",
          practical:
            "⏱️ Voordelen digitale timer:\n\n• Exacte tijdinstelling per minuut\n• Akoestisch signaal bij verlopen tijd\n• Voorkomt verbrand product bij drukke dienst\n• Minder toezicht nodig — personeel kan andere taken doen\n• Reproduceerbare resultaten (zelfde tijd = zelfde kwaliteit)\n\n💡 Digitaal vs. analoog:\n• Analoog: Mechanische knop, minder nauwkeurig, slijt sneller\n• Digitaal: Display, nauwkeurig, langere levensduur\n\nPro tip: Maak een receptenlijst met optimale tijden per product voor consistente kwaliteit.",
        },
        thermostaat: {
          term: "Thermostaat — Digitaal",
          explanation:
            "De digitale thermostaat regelt nauwkeurig de temperatuur in de ovenruimte. Een digitale thermostaat is nauwkeuriger en stabieler dan een analoge.",
          practical:
            "🌡️ Voordelen digitale thermostaat:\n\n• Nauwkeurigheid: ±5°C (vs. ±15-20°C bij analoog)\n• Constante temperatuur door automatische bijsturing\n• Duidelijke digitale aflezing op display\n• Snellere opwarmtijd door actieve temperatuurbewaking\n\n📊 Temperatuurstabiliteit:\n• Analoog: Schommeling ±15-20°C rondom instelling\n• Digitaal: Schommeling ±3-5°C = consistenter bakresultaat\n\n✅ Belangrijk voor:\n• Precisie bij patisserie en banketbakkerij\n• HACCP-documentatie (kerntemperatuur bereikt)\n• Reproduceerbare resultaten bij groot volume",
        },
        capaciteit: {
          term: "Capaciteit",
          explanation:
            "Bij horeca-apparatuur wordt capaciteit vaak uitgedrukt in GN (Gastronorm). Dit is een Europese standaard voor de afmetingen van bakken en platen.",
          practical:
            "**Gastronorm formaten:**\n\n• **1/1 GN**: 530 x 325 mm (standaard volledig formaat)\n• **1/2 GN**: 265 x 325 mm (halve bak)\n• **1/3 GN**: 176 x 325 mm (derde bak)\n\n**Praktisch voorbeeld:**\n10x1/1 GN betekent:\n• 10 volle bakken tegelijk\n• ±80-100 porties per cyclus\n• Geschikt voor middelgroot restaurant\n\n20x1/1 GN betekent:\n• 20 volle bakken tegelijk\n• ±160-200 porties per cyclus\n• Geschikt voor groot restaurant/catering",
        },
        aansluitwaarde: {
          term: "Aansluitwaarde",
          explanation:
            "De aansluitwaarde geeft aan welke spanning en stroomtype het apparaat nodig heeft om te functioneren. Dit bepaalt welke elektra-installatie vereist is.",
          practical:
            "**Veelvoorkomende aansluitingen:**\n\n• **230V 1N**: Standaard stopcontact (huishoudelijk)\n• **400V 3N**: Krachtstroom (driefasen + nul)\n• **400V 3N+PE**: Krachtstroom met aarde (PE)\n\n**Let op:**\n• Controleer vóór aankoop of uw keuken de juiste aansluiting heeft\n• Krachtstroom installeren kost €500-2000 extra\n• Bij verbouwing direct rekening houden met toekomstige apparatuur",
        },
        touchscreen: {
          term: "Touchscreen bediening",
          explanation:
            'Moderne horecaapparatuur heeft vaak een touchscreen-interface voor intuïtieve bediening. De grootte wordt uitgedrukt in inch (").',
          practical:
            '**Voordelen touchscreen:**\n\n• Snellere bediening tijdens drukke diensten\n• Visuele weergave van bereidingsprocessen\n• Opgeslagen recepten en programma\'s\n• Minder trainingstijd voor nieuw personeel\n\n**Formaten:**\n• 5" touchscreen: Basis functionaliteit\n• 7" touchscreen: Optimale balans\n• 10"+ touchscreen: Premium met uitgebreide opties\n\nTip: Groter scherm = makkelijker tijdens stress',
        },
        gn: {
          term: "GN (Gastronorm)",
          explanation:
            "Gastronorm is de Europese standaard voor afmetingen van bakken, platen en roosters in professionele keukens. Dit zorgt voor uniformiteit tussen merken en apparaten.",
          practical:
            "**Standaard GN formaten:**\n\n• 1/1 GN: 530 x 325 mm (basis)\n• 2/1 GN: 530 x 650 mm (dubbel)\n• 1/2 GN: 265 x 325 mm\n• 1/3 GN: 176 x 325 mm\n• 1/4 GN: 265 x 162 mm\n• 1/6 GN: 176 x 162 mm\n\n**Voordelen:**\n• Bakken passen in elk merk apparaat\n• Makkelijk voorraad aanleggen\n• Efficiënte voorbereiding en opslag\n• Standaard in hele Europa",
        },
        kw: {
          term: "kW (Kilowatt)",
          explanation:
            "Kilowatt is de eenheid voor vermogen. 1 kW = 1000 Watt. Voor horeca-apparatuur bepaalt dit energieverbruik én prestaties.",
          practical:
            "**Energieverbruik berekenen:**\n\n• Apparaat van 18 kW = 18 kWh per draaiuur\n• Bij €0,30/kWh = €5,40 per draaiuur\n• Bij 8 uur/dag = €43,20 per dag\n• Per maand (22 dagen) = €950 energiekosten\n\n**Vuistregel:**\n• Hoger vermogen = sneller opwarmen\n• Maar ook hogere energiekosten\n• Moderne apparaten zijn efficiënter\n• Let op energielabel (A+++ tot D)",
        },
      };

      // Find matching explanation (case insensitive, supports multi-word keys)
      const explanation = Object.entries(
        technicalExplanations,
      ).find(([key]) => {
        const lowerKey = key.toLowerCase();
        // Exact match, substring match, or first word of key matches
        return (
          lowerTerm === lowerKey ||
          lowerTerm.includes(lowerKey) ||
          lowerKey.includes(lowerTerm) ||
          lowerKey.split(" ").some((word) => word.length > 3 && lowerTerm.includes(word))
        );
      })?.[1];

      if (explanation) {
        return [
          {
            id: Date.now(),
            sender: "assistant",
            type: "specification",
            data: explanation,
            suggestions: [
              "Zoek producten",
              "Vergelijk opties",
              "Andere term uitleggen",
            ],
          },
        ];
      } else {
        // Generic technical explanation for unknown terms
        return [
          {
            id: Date.now(),
            text: `Ik zie dat u uitleg vraagt over **"${term}"**.\n\nDit is een technische term die betrekking heeft op horeca-apparatuur. Voor meer specifieke informatie over deze term kunt u:\n\n• Mij vragen naar gerelateerde specificaties\n• Producten met deze specificatie opzoeken\n• Contact opnemen met onze specialisten\n\nWaar kan ik u verder mee helpen?`,
            sender: "assistant",
            type: "text",
            suggestions: [
              "Zoek producten",
              "Vergelijk opties",
              "Contacteer specialist",
            ],
          },
        ];
      }
    }

    // Job Story 1 & 2: Natural language product search with context
    if (
      lowerMessage.includes("zoek") ||
      lowerMessage.includes("combisteamer") ||
      lowerMessage.includes("oven") ||
      lowerMessage.includes("restaurant") ||
      lowerMessage.includes("koelkast") ||
      lowerMessage.includes("werkbank") ||
      lowerMessage.includes("vaatwasser")
    ) {
      setQuestionnaireState((prev) => ({
        ...prev,
        isActive: true,
      }));
      return [
        {
          id: Date.now(),
          text: "Ik zie dat je op zoek bent naar een oven! Om je de beste opties te kunnen tonen, heb ik wat meer informatie nodig.",
          sender: "assistant",
          type: "text",
          suggestions: [
            "Combi-oven",
            "Heteluchtoven",
            "Weet ik niet",
          ],
        },
      ];
    }

    // Job Story 3: Product comparison
    if (
      lowerMessage.includes("vergelijk") ||
      lowerMessage.includes("verschillen") ||
      lowerMessage.includes("compare")
    ) {
      setComparisonFlowState((prev) => ({
        ...prev,
        isActive: true,
        currentStep: 1,
      }));

      return [
        {
          id: Date.now(),
          text: 'Perfect! Ik help u graag met het vergelijken van producten.\n\n**Welke producten wilt u vergelijken?**\n\nU kunt bijvoorbeeld:\n• Een categorie noemen (bijv. "combisteamers")\n• Een specifiek merk of model zoeken\n• Een situatie beschrijven waarbij ik producten voor u zoek\n\nOf u kunt producten op de webshoppagina\'s selecteren met de "Toevoegen aan vergelijking" knop.',
          sender: "assistant",
          type: "text",
          suggestions: [
            "Vergelijk combisteamers",
            "Vergelijk koelkasten",
            "Vergelijk friteuses",
          ],
        },
      ];
    }

    // Job Story 4: Specification explanation
    if (
      lowerMessage.includes("betekent") ||
      lowerMessage.includes("uitleg") ||
      lowerMessage.includes("wat is") ||
      lowerMessage.includes("specificatie")
    ) {
      return [
        {
          id: Date.now(),
          sender: "assistant",
          type: "specification",
          data: {
            term: "Capaciteit 10x1/1 GN",
            explanation:
              "Dit betekent dat de combisteamer plaats heeft voor 10 gastronormbakken van het formaat 1/1 GN (530 x 325 mm). Dit is het standaardformaat in de professionele horeca.",
            practical:
              "In de praktijk betekent dit dat u bijvoorbeeld:\n• 10 grote bakplaten tegelijk kunt gebruiken\n• Ongeveer 80-100 porties in één keer kunt bereiden\n• Perfect geschikt is voor een middelgroot restaurant of cateringbedrijf",
          },
          suggestions: [
            "Vergelijk de producten",
            "Wat is de beste keuze?",
            "Toon andere opties",
          ],
        },
      ];
    }

    // Job Story 5: Context-based recommendation
    if (
      lowerMessage.includes("welke") ||
      lowerMessage.includes("beste") ||
      lowerMessage.includes("aanraden")
    ) {
      return [
        {
          id: Date.now(),
          text: 'Op basis van uw situatie (middelgroot restaurant, 100 couverts per dag) raad ik u de **Rational iCombi Pro** aan:\n\n**Voordelen voor uw situatie:**\n• Het grootste touchscreen (7") maakt bediening makkelijker tijdens drukke diensten\n• Hoogste vermogen betekent sneller opwarmen en meer producties per dag\n• Rational staat bekend om betrouwbaarheid en lange levensduur\n• iCookingControl past automatisch tijd en temperatuur aan\n\n**Prijs-kwaliteit overwegingen:**\nHoewel deze €1.200,- duurder is dan de Convotherm, verdient u dit terug door:\n• Lagere energiekosten door efficiënter vermogen\n• Minder trainingtijd personeel door intuïtieve bediening\n• Minder onderhoud en langere garantie',
          sender: "assistant",
          type: "text",
          suggestions: [
            "Bekijk alternatieven",
            "Uitleg specificaties",
            "Waar kan ik dit kopen?",
          ],
        },
      ];
    }

    // Job Story 6: Alternatives
    if (
      lowerMessage.includes("alternatieven") ||
      lowerMessage.includes("andere") ||
      lowerMessage.includes("iets anders")
    ) {
      return [
        {
          id: Date.now(),
          text: "Ik begrijp dat u ook andere opties wilt bekijken. Hier zijn relevante alternatieven die ook passen bij uw situatie:",
          sender: "assistant",
          type: "alternatives",
          data: {
            original: mockProducts[0],
            alternatives: [
              {
                product: mockProducts[2],
                reason:
                  "Budget-vriendelijker optie (€2.600,- goedkoper) met vergelijkbare prestaties",
                tradeoff:
                  "Minder geavanceerde bediening, maar perfect functioneel",
              },
              {
                product: {
                  id: 4,
                  name: "Rational iCombi Pro 6x1/1",
                  price: "€8.999,-",
                  category:
                    "Keukenapparatuur › Ovens & Combisteamers",
                },
                reason:
                  "Kleinere versie als u toch minder capaciteit nodig heeft",
                tradeoff:
                  "40% minder capaciteit, maar ook 30% goedkoper en compacter",
              },
            ],
          },
          suggestions: [
            "Vergelijk deze opties",
            "Welke past het best?",
            "Terug naar originele producten",
          ],
        },
      ];
    }

    // Default response
    return [
      {
        id: Date.now(),
        text: "Ik help u graag! Kunt u wat meer vertellen over:\n\n• Wat voor type apparaat zoekt u?\n• Wat is uw situatie? (type bedrijf, grootte, etc.)\n• Heeft u al iets specifieks op het oog?\n\nHoe meer u vertelt, hoe beter ik u kan adviseren!",
        sender: "assistant",
        type: "text",
        suggestions: [
          "Zoek combisteamer",
          "Zoek koelkast",
          "Zoek friteuse",
        ],
      },
    ];
  };

  const handleQuickAction = (question: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: question,
      sender: "user",
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);

    // Check if this is part of the comparison flow
    if (comparisonFlowState.isActive) {
      handleComparisonFlow(question);
      return;
    }

    // Check if this is part of the questionnaire flow
    if (questionnaireState.isActive) {
      handleQuestionnaireFlow(question);
      return;
    }

    // Simulate assistant thinking
    setIsThinking(true);
    setTimeout(() => {
      const responses = getAssistantResponse(question);
      setMessages((prev) => [...prev, ...responses]);
      setIsThinking(false);

      // If product suggestions are made, call the onRecommendProducts callback
      if (
        responses.some(
          (response) => response.type === "product-suggestion",
        )
      ) {
        const products = responses.find(
          (response) => response.type === "product-suggestion",
        )?.data.products;
        if (products && onRecommendProducts) {
          onRecommendProducts(products);
          setHasRecommendedProducts(true);
        }
      }
    }, 800);
  };

  const handleQuestionnaireFlow = (answer: string) => {
    setIsThinking(true);
    setTimeout(() => {
      const { currentStep, answers } = questionnaireState;

      // Step 1: Oven type
      if (currentStep === 1) {
        setQuestionnaireState((prev) => ({
          ...prev,
          currentStep: 2,
          apparaatType: "oven",
          answers: { ...prev.answers, ovenType: answer },
        }));

        const question2Messages = getQuestion2();
        setMessages((prev) => [...prev, ...question2Messages]);
        setIsThinking(false);
        return;
      }

      // Step 2: Horeca type
      if (currentStep === 2) {
        setQuestionnaireState((prev) => ({
          ...prev,
          currentStep: 3,
          answers: { ...prev.answers, horecaType: answer },
        }));

        const question3Messages = getQuestion3(answer);
        setMessages((prev) => [...prev, ...question3Messages]);
        setIsThinking(false);
        return;
      }

      // Step 3: Capaciteit
      if (currentStep === 3) {
        setQuestionnaireState((prev) => ({
          ...prev,
          currentStep: 4,
          answers: { ...prev.answers, capaciteit: answer },
        }));

        const question4Messages = getQuestion4(
          questionnaireState.answers.horecaType || "",
        );
        setMessages((prev) => [...prev, ...question4Messages]);
        setIsThinking(false);
        return;
      }

      // Step 4: Either "gebruik" (for hotel) or "budget" (for other types)
      if (currentStep === 4) {
        const isHotelKitchen =
          questionnaireState.answers.horecaType?.includes(
            "Hotel",
          );

        if (isHotelKitchen) {
          // For hotel kitchens, this is the "gebruik" step
          setQuestionnaireState((prev) => ({
            ...prev,
            currentStep: 5,
            answers: { ...prev.answers, gebruik: answer },
          }));

          const question5Messages = getQuestion5();
          setMessages((prev) => [
            ...prev,
            ...question5Messages,
          ]);
          setIsThinking(false);
          return;
        } else {
          // For other types, this is the budget step - final step
          setQuestionnaireState((prev) => ({
            ...prev,
            isActive: false,
            answers: { ...prev.answers, budget: answer },
          }));

          const finalAnswers = { ...answers, budget: answer };
          const recommendationMessages = getRecommendations(
            questionnaireState.apparaatType,
            finalAnswers,
          );
          setMessages((prev) => [
            ...prev,
            ...recommendationMessages,
          ]);
          setIsThinking(false);

          // Call onRecommendProducts
          if (
            onRecommendProducts &&
            recommendationMessages.some(
              (msg) => msg.type === "product-suggestion",
            )
          ) {
            const products = recommendationMessages.find(
              (msg) => msg.type === "product-suggestion",
            )?.data.products;
            if (products) {
              onRecommendProducts(products);
              setHasRecommendedProducts(true);
            }
          }

          // Reset questionnaire
          setQuestionnaireState({
            isActive: false,
            currentStep: 1,
            apparaatType: "",
            answers: {},
          });
          return;
        }
      }

      // Step 5: Budget (only for hotel kitchens) - Final step
      if (currentStep === 5) {
        setQuestionnaireState((prev) => ({
          ...prev,
          isActive: false,
          answers: { ...prev.answers, budget: answer },
        }));

        const finalAnswers = { ...answers, budget: answer };
        const recommendationMessages = getRecommendations(
          questionnaireState.apparaatType,
          finalAnswers,
        );
        setMessages((prev) => [
          ...prev,
          ...recommendationMessages,
        ]);
        setIsThinking(false);

        // Call onRecommendProducts
        if (
          onRecommendProducts &&
          recommendationMessages.some(
            (msg) => msg.type === "product-suggestion",
          )
        ) {
          const products = recommendationMessages.find(
            (msg) => msg.type === "product-suggestion",
          )?.data.products;
          if (products) {
            onRecommendProducts(products);
            setHasRecommendedProducts(true);
          }
        }

        // Reset questionnaire
        setQuestionnaireState({
          isActive: false,
          currentStep: 1,
          apparaatType: "",
          answers: {},
        });
      }
    }, 800);
  };

  const handleComparisonFlow = (answer: string) => {
    setIsThinking(true);
    setTimeout(() => {
      const { currentStep, products, searchQuery } =
        comparisonFlowState;

      // Step 1: Search query
      if (currentStep === 1) {
        setComparisonFlowState((prev) => ({
          ...prev,
          currentStep: 2,
          searchQuery: answer,
        }));

        // For now, just show the first two products as comparison
        const selectedProducts = [
          mockProducts[0],
          mockProducts[1],
        ];

        const comparisonMessages =
          getComparison(selectedProducts);
        setMessages((prev) => [...prev, ...comparisonMessages]);
        setIsThinking(false);

        // Call onCompareProducts
        if (onCompareProducts) {
          onCompareProducts(selectedProducts, {
            searchQuery: answer,
          });
        }

        // Reset comparison flow
        setComparisonFlowState({
          isActive: false,
          currentStep: 1,
          products: [],
          searchQuery: "",
        });
        return;
      }
    }, 800);
  };

  const getQuestion2 = (): Message[] => {
    return [
      {
        id: Date.now(),
        text: "Wat voor type Horeca is het?",
        sender: "assistant",
        type: "text",
        suggestions: [
          "Klein restaurant/café",
          "Groot restaurant",
          "Catering bedrijf",
          "Hotel keuken",
          "Anders",
        ],
      },
    ];
  };

  const getQuestion3 = (horecaType: string): Message[] => {
    // Special handling for Hotel keuken
    if (horecaType.includes("Hotel")) {
      return [
        {
          id: Date.now(),
          text: "Perfect! Voor een hotelkeuken is een combi-oven ideaal vanwege de veelzijdigheid en capaciteit die je nodig hebt.\n\nVoor hotelkeukens zijn dit belangrijke overwegingen bij combi-ovens:\n\nCapaciteit & Formaat:\n- Hoeveel gasten bedien je gemiddeld per dag?\n- Heb je beperkte ruimte of juist veel plaats?",
          sender: "assistant",
          type: "text",
          suggestions: [
            "50-100 gasten per dag",
            "100-200 gasten per dag",
            "200+ gasten per dag",
          ],
        },
      ];
    }

    // Default questions for other horeca types
    return [
      {
        id: Date.now(),
        text: "Hoeveel couverts (porties) bereidt u gemiddeld per dag?",
        sender: "assistant",
        type: "text",
        suggestions: [
          "< 50 porties/dag",
          "50-100 porties/dag",
          "100-200 porties/dag",
          "> 200 porties/dag",
        ],
      },
    ];
  };

  const getQuestion4 = (horecaType: string): Message[] => {
    // For hotel kitchens, ask about usage type
    if (horecaType.includes("Hotel")) {
      return [
        {
          id: Date.now(),
          text: "Wat is het primaire gebruik van de oven?",
          sender: "assistant",
          type: "text",
          suggestions: [
            "Ontbijt (broodjes, croissants)",
            "À la carte gerechten",
            "Banqueting/groepsmaaltijden",
            "Gemengd gebruik",
          ],
        },
      ];
    }

    // For other types, go straight to budget
    return [
      {
        id: Date.now(),
        text: "Wat is uw budgetbereik?",
        sender: "assistant",
        type: "text",
        suggestions: [
          "< €5.000",
          "€5.000 - €10.000",
          "€10.000 - €15.000",
          "> €15.000",
        ],
      },
    ];
  };

  const getQuestion5 = (): Message[] => {
    return [
      {
        id: Date.now(),
        text: "Wat is uw budgetbereik?",
        sender: "assistant",
        type: "text",
        suggestions: [
          "< €5.000",
          "€5.000 - €10.000",
          "€10.000 - €15.000",
          "> €15.000",
        ],
      },
    ];
  };

  const getRecommendations = (
    apparaatType: string,
    answers: any,
  ): Message[] => {
    // Specific response for "Groot restaurant" with "200+ porties/dag" and "€10.000 - €15.000"
    if (
      answers.horecaType === "Groot restaurant" &&
      (answers.capaciteit === "> 200 porties/dag" ||
        answers.capaciteit === "200+ gasten per dag") &&
      answers.budget === "€10.000 - €15.000"
    ) {
      const summaryText = `Dank je wel!\nOp basis van jouw situatie een groot restaurant met een dagelijkse capaciteit van ongeveer 200 couverts en een budget tussen €10.000 en €15.000 raad ik een professionele combisteamer aan die geschikt is voor intensief en continu gebruik.\n\nVoor dit volume is het belangrijk dat de oven beschikt over een ruime capaciteit, betrouwbare stoom- en hete-luchtfuncties en een stabiele temperatuurregeling. Hiermee kun je grote hoeveelheden gerechten gelijktijdig bereiden, zonder in te leveren op kwaliteit of consistentie. Binnen dit budget zijn er modellen beschikbaar met automatische programma's en reinigingsfuncties, wat tijd bespaart tijdens piekmomenten in de keuken.\n\nIk laat je nu een selectie zien van combisteamers die goed aansluiten bij jouw gebruik, keukenformaat en budget.`;

      return [
        {
          id: Date.now(),
          text: summaryText,
          sender: "assistant",
          type: "text",
        },
        {
          id: Date.now() + 1,
          sender: "assistant",
          type: "product-suggestion",
          data: { products: mockProducts },
          suggestions: [
            "Vergelijk deze producten",
            "Zijn er alternatieven?",
          ],
        },
      ];
    }

    // Default summary text for other scenarios
    const summaryText = `Bedankt voor uw antwoorden!\n\nOp basis van uw wensen heb ik de volgende ${apparaatType === "oven" ? "ovens" : apparaatType === "koelkast" ? "koelkasten" : apparaatType === "werkbank" ? "werkbanken" : "vaatwassers"} voor u geselecteerd. U gaf aan te zoeken naar ${answers.apparaatType} voor een ${answers.horecaType}, met een gewenste capaciteit van ${answers.capaciteit} en een budget van ${answers.budget}. Deze selectie sluit perfect aan bij uw eisen:`;

    return [
      {
        id: Date.now(),
        text: summaryText,
        sender: "assistant",
        type: "text",
      },
      {
        id: Date.now() + 1,
        sender: "assistant",
        type: "product-suggestion",
        data: { products: mockProducts },
        suggestions: [
          "Vergelijk deze producten",
          "Zijn er alternatieven?",
        ],
      },
    ];
  };

  const getComparison = (products: any[]): Message[] => {
    const summaryText = `Bedankt voor uw antwoorden!\n\nOp basis van uw selectie heb ik de volgende producten voor u geselecteerd:`;

    const differences = [
      {
        spec: "Capaciteit",
        product1: products[0].specs.Capaciteit,
        product2: products[1].specs.Capaciteit,
        winner:
          products[0].specs.Capaciteit >
          products[1].specs.Capaciteit
            ? 1
            : 2,
      },
      {
        spec: "Vermogen",
        product1: products[0].specs.Vermogen,
        product2: products[1].specs.Vermogen,
        winner:
          products[0].specs.Vermogen >
          products[1].specs.Vermogen
            ? 1
            : 2,
      },
      {
        spec: "Aansluitwaarde",
        product1: products[0].specs.Aansluitwaarde,
        product2: products[1].specs.Aansluitwaarde,
        winner:
          products[0].specs.Aansluitwaarde >
          products[1].specs.Aansluitwaarde
            ? 1
            : 2,
      },
      {
        spec: "Afmetingen",
        product1: products[0].specs.Afmetingen,
        product2: products[1].specs.Afmetingen,
        winner:
          products[0].specs.Afmetingen >
          products[1].specs.Afmetingen
            ? 1
            : 2,
      },
      {
        spec: "Type bediening",
        product1: products[0].specs["Type bediening"],
        product2: products[1].specs["Type bediening"],
        winner:
          products[0].specs["Type bediening"] >
          products[1].specs["Type bediening"]
            ? 1
            : 2,
      },
    ];

    return [
      {
        id: Date.now(),
        text: summaryText,
        sender: "assistant",
        type: "text",
      },
      {
        id: Date.now() + 1,
        sender: "assistant",
        type: "comparison",
        data: { products, differences },
        suggestions: [
          "Vergelijk deze producten",
          "Wat is de beste optie?",
          "Zijn er alternatieven?",
        ],
      },
    ];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // "clear" command — reset chat to initial state
    if (inputValue.trim().toLowerCase() === "clear") {
      setInputValue("");
      setIsThinking(false);
      setHasRecommendedProducts(false);
      setQuestionnaireState({ isActive: false, currentStep: 1, apparaatType: "", answers: {} });
      setMessages([
        {
          id: Date.now(),
          text: "Welkom bij HorecaGrootKeukenshop.nl\n\nIk ben de HGS Buddy, jouw digitale shoppingassistent.\n\nTwijfel je tussen producten of weet je niet waar je moet beginnen?\n\nIk help je stap voor stap bij het kiezen van de juiste horeca-apparatuur.\n\nBeschrijf je situatie, zoals het type keuken, het gebruik of de beschikbare ruimte. Ik vergelijk opties voor je en geef gericht advies dat past bij jouw situatie.",
          sender: "assistant",
          type: "text",
          suggestions: [
            "Ik ben op zoek naar een oven",
            "Is dit product geschikt voor mijn situatie",
            "Ik wil producten vergelijken",
            "Leg de specificaties uit",
          ],
        },
      ]);
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate assistant thinking
    setIsThinking(true);
    setTimeout(() => {
      const responses = getAssistantResponse(inputValue);
      setMessages((prev) => [...prev, ...responses]);
      setIsThinking(false);

      // If product suggestions are made, call the onRecommendProducts callback
      if (
        responses.some(
          (response) => response.type === "product-suggestion",
        )
      ) {
        const products = responses.find(
          (response) => response.type === "product-suggestion",
        )?.data.products;
        if (products && onRecommendProducts) {
          onRecommendProducts(products);
          setHasRecommendedProducts(true);
        }
      }
    }, 800);
  };

  const renderMessage = (message: Message) => {
    if (message.type === "product-suggestion") {
      return (
        <div className="space-y-3">
          {message.data.products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {product.category}
                  </p>
                </div>
                <span className="text-[#86a201] font-semibold">
                  {product.price}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-500">
                        {key}:
                      </span>
                      <span className="ml-1 text-gray-700">
                        {value as string}
                      </span>
                    </div>
                  ))}
              </div>
              <button className="mt-2 text-xs text-[#86a201] hover:text-[#6d8301] font-medium flex items-center gap-1">
                Bekijk details{" "}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      );
    }

    if (message.type === "comparison") {
      const { products, differences } = message.data;
      return (
        <div className="bg-white border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-[#86a201]" />
            <h4 className="font-medium text-sm">
              Vergelijking
            </h4>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 text-xs font-medium pb-2 border-b">
              <div className="text-gray-600">Specificatie</div>
              <div className="text-gray-900 truncate">
                {products[0].name.split("-")[0].trim()}
              </div>
              <div className="text-gray-900 truncate">
                {products[1].name.split("-")[0].trim()}
              </div>
            </div>

            {differences.map((diff: any, idx: number) => (
              <div
                key={idx}
                className="grid grid-cols-3 gap-2 text-xs"
              >
                <div className="text-gray-600">{diff.spec}</div>
                <div
                  className={
                    diff.winner === 1
                      ? "text-[#86a201] font-medium"
                      : "text-gray-700"
                  }
                >
                  {diff.product1}
                </div>
                <div
                  className={
                    diff.winner === 2
                      ? "text-[#86a201] font-medium"
                      : "text-gray-700"
                  }
                >
                  {diff.product2}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-600 mt-3 pt-3 border-t">
            <span className="font-medium text-[#86a201]">
              Groen gemarkeerd
            </span>{" "}
            betekent de betere waarde voor die specificatie.
          </p>
        </div>
      );
    }

    if (message.type === "specification") {
      const { term, explanation, practical } = message.data;
      return (
        <div className="bg-white border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-[#86a201]" />
            <h4 className="font-medium text-sm">{term}</h4>
          </div>

          <p className="text-sm text-gray-700 mb-3">
            {explanation}
          </p>

          <div className="bg-gray-50 rounded p-2">
            <p className="text-xs font-medium text-gray-700 mb-1">
              In de praktijk:
            </p>
            <p className="text-xs text-gray-600 whitespace-pre-line">
              {practical}
            </p>
          </div>
        </div>
      );
    }

    if (message.type === "alternatives") {
      const { alternatives } = message.data;
      return (
        <div className="space-y-3">
          {alternatives.map((alt: any, idx: number) => (
            <div
              key={idx}
              className="bg-white border rounded-lg p-3"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900">
                    {alt.product.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    + {alt.reason}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    - {alt.tradeoff}
                  </p>
                </div>
                <span className="text-[#86a201] font-semibold text-sm">
                  {alt.product.price}
                </span>
              </div>
              <button className="mt-2 text-xs text-[#86a201] hover:text-[#6d8301] font-medium flex items-center gap-1">
                Bekijk dit alternatief{" "}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      );
    }

    if (message.type === "recommendation") {
      const recommendation = message.data;
      return (
        <div className="bg-white border-2 border-[#86a201] rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-[#86a201] rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                {recommendation.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {recommendation.conclusion}
              </p>
            </div>
          </div>

          {/* Reasons - Compact 2 column layout */}
          <div className="space-y-2 mb-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Waarom deze keuze?
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {recommendation.reasons.map(
                (reason: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg p-2"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-[#86a201] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 mb-0.5 text-xs">
                          {reason.title}
                        </h5>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Considerations - Compact */}
          {recommendation.considerations &&
            recommendation.considerations.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  Aandachtspunten:
                </h4>
                {recommendation.considerations.map(
                  (consideration: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-2 border border-[#86a201] border-opacity-30"
                    >
                      <h5 className="font-semibold text-gray-900 mb-0.5 text-xs">
                        {consideration.title}
                      </h5>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {consideration.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}
        </div>
      );
    }

    // Default text message
    return (
      <div className="text-sm whitespace-pre-line">
        {message.text
          ?.replace(/\*\*/g, "")
          .replace(/^[•\-\*]\s+/gm, "")}
      </div>
    );
  };

  useEffect(() => {
    if (externalQuery) {
      handleQuickAction(externalQuery);
      if (onExternalQueryHandled) {
        onExternalQueryHandled();
      }
    }
  }, [externalQuery, onExternalQueryHandled]);

  useEffect(() => {
    if (externalRecommendation) {
      const recommendationMessage: Message = {
        id: Date.now(),
        sender: "assistant",
        type: "recommendation",
        data: externalRecommendation,
        suggestions: [
          "Bekijk alternatieven",
          "Uitleg specificaties",
          "Waar kan ik dit kopen?",
        ],
      };
      setMessages((prev) => [...prev, recommendationMessage]);
      if (onExternalRecommendationHandled) {
        onExternalRecommendationHandled();
      }
    }
  }, [externalRecommendation, onExternalRecommendationHandled]);

  return (
    <div className="h-full flex flex-col bg-white shadow-2xl">
      {/* Header */}
      <div className="bg-[#86a201] text-white p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6">
            <Group />
          </div>
          <div>
            <h2 className="font-semibold">HGS Buddy</h2>
            <p className="text-sm opacity-90">
              Uw Shopping Assistent
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#6d8301] rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[90%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-[#86a201] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {renderMessage(message)}
            </div>
            {/* Suggestions outside the message bubble */}
            {message.suggestions &&
              message.suggestions.length > 0 &&
              message.sender === "assistant" && (
                <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                  {message.suggestions.map(
                    (suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleQuickAction(suggestion)
                        }
                        className="text-xs bg-[#86a201] border-2 border-transparent hover:bg-white hover:border-solid hover:border-[#86a201] text-white hover:text-[#86a201] rounded-full px-3 py-1.5 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ),
                  )}
                </div>
              )}
          </div>
        ))}

        {/* Thinking Animation */}
        {isThinking && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              {/* HGS Buddy Logo */}
              <div className="w-8 h-8 flex-shrink-0 text-[#86a201]">
                <Group />
              </div>

              {/* Bouncing dots */}
              <div className="flex gap-1.5">
                <motion.div
                  className="w-2 h-2 bg-[#86a201] rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#86a201] rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#86a201] rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                />
              </div>
            </div>

            {/* Animated text that fades and moves up */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{
                opacity: [1, 1, 0.7, 1],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-sm text-gray-600 mt-2 ml-1"
            >
              HGS Buddy denkt na...
            </motion.div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && handleSend()
            }
            placeholder="Stel uw vraag..."
            className="flex-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86a201] text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-[#86a201] hover:bg-[#6d8301] text-white px-4 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}