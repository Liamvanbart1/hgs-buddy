# HGS Buddy

> Afstudeerproject Communicatie en Multimedia Design (CMD) — Hogeschool van Amsterdam
> In opdracht van **BOLD Commerce**, voor de webshop **horecagrootkeukenshop.nl** (HGS).
> **Afgerond met eindcijfer 7,5.**

**HGS Buddy** is een digitale shopping assistent die gebruikers van horecagrootkeukenshop.nl begeleidt bij het zoeken, vergelijken en begrijpen van horeca-apparatuur. De buddy is op meerdere momenten in de customer journey aanwezig en helpt gebruikers sneller en met meer vertrouwen tot een aankoopbeslissing te komen in een assortiment van meer dan 30.000 artikelen.

Dit prototype bestaat uit twee samenwerkende onderdelen:

- een **visueel prototype** (deze repository) dat laat zien hoe de buddy op meerdere plekken in de webshop is geïntegreerd;
- een **functioneel prototype** gebouwd in **Voiceflow v4**, gekoppeld aan een productdatabase in Google Sheets, dat de conversatielogica aandrijft.

---

## Inhoudsopgave

- [Context](#context)
- [Design Challenge](#design-challenge)
- [Onderzoek in het kort](#onderzoek-in-het-kort)
- [Design principes](#design-principes)
- [Het eindproduct](#het-eindproduct)
- [Versies](#versies)
- [Tech stack](#tech-stack)
- [Projectstructuur](#projectstructuur)
- [Installatie](#installatie)
- [Voiceflow-prototype](#voiceflow-prototype)
- [Deployment](#deployment)
- [Validatie](#validatie)
- [Student en begeleiding](#student-en-begeleiding)
- [Licentie en attributies](#licentie-en-attributies)

---

## Context

**BOLD Commerce** is een Amsterdams e-commerce bureau dat hoogwaardige Magento 2-, Shopify Plus- en headless-webshops bouwt. In februari 2023 heeft BOLD de webshop **horecagrootkeukenshop.nl** (HGS) overgenomen — een online groothandel in professionele horeca-apparatuur met meer dan **30.000 artikelen**, verdeeld over 7 menu-items, 72 categorieën en 323 subcategorieën.

Omdat klantenservice momenteel door één persoon wordt afgehandeld en veel gebruikers moeite hebben om in dat enorme aanbod het juiste product te vinden, vroeg BOLD om een oplossing die de gebruiker actief begeleidt zonder dat een volledige re-design of back-end aanpassing nodig is.

## Design Challenge

> **"Hoe kan een digitale assistent gebruikers van HGS op een gebruiksvriendelijke en betrouwbare manier ondersteunen bij het zoeken, vergelijken en informeren over producten en andere vragen?"**

## Onderzoek in het kort

De oplossing is gebouwd op vier onderzoekssporen:

| Methode | Omvang | Wat het opleverde |
|---|---|---|
| **Usability test + Thinking Aloud** | 3 horecaprofessionals op de live webshop | Concrete knelpunten: te veel opties, onduidelijke filters, geen vergelijkmogelijkheid, specs zonder context |
| **Online Analytics — klantenservice** | 175 HelpScout-tickets geanalyseerd | Terugkerende thema's: productspecificaties, alternatieven, advies op maat |
| **Survey** | 47 respondenten | Vertrouwen is de belangrijkste voorwaarde om een AI-assistent te gebruiken |
| **Stakeholder-analyse** | BOLD, HGS, klantenservice, developers, eindgebruikers | Belangen in kaart, gebruikt om ontwerpkeuzes te prioriteren |

Aanvullend zijn benchmarks onderzocht (Coolblue Jeffrey, Amazon Rufus, ChatGPT Shopping) en Need-Based Profiles en Job Stories opgesteld.

## Design principes

Zes principes vormen het fundament van het ontwerp, onderbouwd door het onderzoek en verankerd in de **HAX Design Library voor Human-AI Interaction van Microsoft (2024)**:

1. **Begeleid het keuzeproces stap voor stap** — de assistent stelt relevante vervolgvragen en biedt informatie gedoseerd aan.
2. **Communiceer in natuurlijke en begrijpelijke taal** — geen vakjargon zonder uitleg.
3. **Adviseer transparant en objectief** — aanbevelingen worden altijd toegelicht, alternatieven worden expliciet genoemd, geen commerciële sturing.
4. **Maak verschillen tussen producten direct inzichtelijk** — vergelijken in één overzicht, focus op relevante verschillen.
5. **Vertaal technische data naar betekenisvolle informatie** — specificaties krijgen context (bijv. kW vertaald naar kosten per uur).
6. **Ondersteun verschillende kennisniveaus binnen één interface** — extra uitleg is optioneel, experts worden niet geblokkeerd.

## Het eindproduct

De HGS Buddy is op drie zichtbare plekken in de webshop geïntegreerd, plus twee contextuele touchpoints:

- **Navigatiebalk** — vaste knop linksboven, altijd bereikbaar.
- **Zoekbalk-dropdown** — "Vraag het aan HGS Buddy" als eerste suggestie bij het typen van een zoekopdracht.
- **Floating button rechtsonder** — niet-opdringerig, altijd beschikbaar, met een "peeking"-animatie bij hover.
- **Vergelijk-checkbox** op productkaarten in categoriepagina's — selecteer twee producten, open de vergelijking in de chat.
- **Tekst-selectie popup** op productpagina's — selecteer een term (bijv. "Vermogen") en laat HGS Buddy de betekenis in context uitleggen.

Binnen de chat kan de buddy:

- de gebruiker via een **vraaggestuurde flow met quick replies** leiden naar een passend product,
- producten **naast elkaar vergelijken** met voor- en nadelen en een situatiegerichte aanbeveling,
- **technische specs uitleggen** in praktijktermen (bijv. energieverbruik omgezet naar kosten per dag/maand/jaar),
- **alternatieven tonen** als een product niet past,
- en **doorverwijzen naar de HGS-klantenservice** bij defecten, garantie of retourvragen.

## Versies

Het prototype is in meerdere iteraties ontwikkeld. Elke iteratie staat op een eigen branch:

| Branch  | Versie     | Omschrijving                                             |
|---------|------------|----------------------------------------------------------|
| `main`  | v1         | Eerste release van het prototype                         |
| `v2`    | v2         | Figma-update met nieuwe Voiceflow-integratie             |
| `v3`    | v3         | Figma-update met Voiceflow widget en toon/verberg toggle |
| `final` | Eindversie | Definitieve versie met bijgewerkte Voiceflow widget (v4) |

De `final`-branch bevat de versie die ter validatie is voorgelegd aan gebruikers, opdrachtgever en expert.

## Tech stack

| Categorie | Technologie |
|---|---|
| Bundler / dev server | [Vite 6](https://vitejs.dev/) |
| UI-framework | [React 18](https://react.dev/) + TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` |
| Componenten | [shadcn/ui](https://ui.shadcn.com/) bovenop [Radix UI](https://www.radix-ui.com/) |
| Iconen | [lucide-react](https://lucide.dev/) |
| Animaties | [Framer Motion / motion](https://motion.dev/) |
| Formulieren | [react-hook-form](https://react-hook-form.com/) |
| Grafieken | [Recharts](https://recharts.org/) |
| Conversational AI | [Voiceflow](https://www.voiceflow.com/) v4 (widget geladen in `index.html`) |
| Productdatabase (Voiceflow) | Google Sheets |

**Branding:** huisstijlkleur `#86A201` (HGS-groen), met donkerder accent `#6B8201`. Typografie: Open Sans.

## Projectstructuur

```
HGS BUDDY/
├── index.html              # Entry-point + Voiceflow widget script
├── vite.config.ts          # Vite-config (base path, aliassen, build)
├── package.json
├── testplan_hgs_buddy.docx # Testplan voor het prototype
├── build/                  # Productie-output (na `npm run build`)
└── src/
    ├── main.tsx            # React entry-point
    ├── App.tsx             # Root-component, routing tussen home/categorie/product
    ├── index.css           # Tailwind entry
    ├── styles/             # Globale styles
    ├── assets/             # Afbeeldingen uit Figma
    ├── imports/            # Uit Figma gegenereerde SVG-componenten
    ├── guidelines/         # Design guidelines
    └── components/
        ├── WebshopHeader.tsx         # Header met zoekbalk + HGS Buddy-knop
        ├── CategoryCard.tsx          # Categorie-tegel op de homepagina
        ├── CategoryPage.tsx          # Categoriepagina met vergelijk-checkbox
        ├── ProductCard.tsx
        ├── CompactProductCard.tsx
        ├── ProductPage.tsx           # Productpagina met spec-tooltips
        ├── ComparisonView.tsx        # Vergelijkingstabel (2 producten)
        ├── DigitalAssistant.tsx      # HGS Buddy zij-paneel
        ├── SpecTooltip.tsx           # Tooltip-uitleg bij specificaties
        ├── TextSelectionPopup.tsx    # Popup bij tekstselectie
        ├── specExplanationKeys.ts    # Mappings voor spec-uitleg
        ├── figma/                    # Helpers (o.a. ImageWithFallback)
        └── ui/                       # shadcn/ui componenten
```

## Installatie

Vereisten: **Node.js 18+** en **npm**.

```bash
# 1. Repository clonen
git clone https://github.com/Liamvanbart1/hgs-buddy.git
cd hgs-buddy

# 2. Schakel naar de eindversie
git switch final

# 3. Dependencies installeren
npm i

# 4. Development server starten
npm run dev
```

De dev-server draait op [http://localhost:3000](http://localhost:3000) en opent automatisch in je browser.

## Voiceflow-prototype

Het conversationele deel van de HGS Buddy is gebouwd in **Voiceflow v4** en bestaat uit:

- **Intentiedetectie** — herkent of de gebruiker een product zoekt, wil vergelijken, uitleg wil, alternatieven zoekt, of contact wil met klantenservice.
- **Optionele ophelderingsstap** — als de intentie onduidelijk is, vraagt de buddy gericht door.
- **Kern-agents** — afzonderlijke modules voor *zoeken & voorstellen*, *vergelijken*, *specificaties uitleggen* en *alternatieven tonen*. Agents kunnen naar elkaar terugverwijzen.
- **Advieslaag** — levert een gepersonaliseerd advies op basis van situatie en specificaties.
- **Klantenservice-routing** — nieuw in v4: actief bij defecten, garantie of retourvragen, verwijst de gebruiker netjes door.

De Voiceflow widget wordt geladen in `index.html` (project-ID `69c1dabd8407c8436434a5fe`).

Flow bekijken of bewerken: [Voiceflow project](https://creator.voiceflow.com/share/69c1dabd8407c8436434a5fe/development).

## Deployment

Het project is geconfigureerd voor hosting op **GitHub Pages** onder het pad `/HGS-Buddy_Final/`. Dit is ingesteld in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/HGS-Buddy_Final/',
  // ...
});
```

Build en publiceer:

```bash
npm run build
# Inhoud van build/ uploaden naar GitHub Pages of een andere statische host
```

Host je onder een andere URL? Pas dan `base` aan (bijv. naar `'/'` voor root-hosting).

## Validatie

Het eindproduct is gevalideerd in drie rondes:

- **Drie testrondes met gebruikers** — Thinking Aloud-methode, op basis waarvan het prototype driemaal iteratief is aangepast.
- **Expert review** — Joske Sambros (UX-expert).
- **Opdrachtgever-validatie** — Bart Pit (Co-Founder/CTO BOLD) en Mark (horeca, eerder usability-deelnemer) gaven akkoord; Mark gaf aan dat HGS Buddy duidelijker en overzichtelijker was dan de assistent van Coolblue.
- **Technische validatie** — Niels van Oeffel (front-end developer bij BOLD) bevestigde dat het prototype klaar is voor implementatie.

Het testplan staat in `testplan_hgs_buddy.docx` in de projectroot.

Het afstudeerproject is uiteindelijk beoordeeld met een **eindcijfer van 7,5**.

## Student en begeleiding

- **Student:** Liam van Bart (500857313) — [liam.van.bart@hva.nl](mailto:liam.van.bart@hva.nl)
- **Opleiding:** Communicatie en Multimedia Design, afstudeerjaar — Hogeschool van Amsterdam
- **Begeleider HvA:** Vincent Vijn
- **Opdrachtgever:** Bart Pit, Co-Founder & CTO — [BOLD Commerce](https://boldcommerce.nl/)

## Licentie en attributies

Dit is een afstudeerproject en niet bedoeld voor productiegebruik. Zie `src/Attributions.md` voor attributies:

- UI-componenten van [shadcn/ui](https://ui.shadcn.com/) onder [MIT-licentie](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).
- Foto's van [Unsplash](https://unsplash.com) onder de [Unsplash License](https://unsplash.com/license).
- Design principes geïnspireerd op de [HAX Design Library](https://www.microsoft.com/en-us/haxtoolkit/) van Microsoft (2024).
