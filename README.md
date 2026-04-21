# HGS Buddy

HGS Buddy is een interactief webshop-prototype voor **Horeca Groothandel Specialist (HGS)**, ontwikkeld als afstudeerproject. Het prototype laat zien hoe een digitale AI-assistent bezoekers van een horeca-webshop kan helpen bij het zoeken, begrijpen en vergelijken van professionele keuken- en horeca-apparatuur.

Het oorspronkelijke ontwerp is gemaakt in Figma en in code gezet met Vite, React en Tailwind CSS. De conversational AI wordt aangestuurd via een ingebedde **Voiceflow** chatbot.

---

## Inhoudsopgave

- [Over het project](#over-het-project)
- [Versies](#versies)
- [Belangrijkste features](#belangrijkste-features)
- [Tech stack](#tech-stack)
- [Projectstructuur](#projectstructuur)
- [Installatie](#installatie)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Ontwerp en assets](#ontwerp-en-assets)
- [Testplan](#testplan)
- [Licentie en attributies](#licentie-en-attributies)

---

## Over het project

HGS Buddy simuleert een webshop met vier hoofdcategorieën (**Keuken**, **Café**, **Koelen**, **Accessoires**) en integreert een digitale assistent die:

- productaanbevelingen geeft op basis van gebruikersvragen,
- technische specificaties uitlegt in begrijpelijke taal,
- producten met elkaar vergelijkt,
- en gebruikers door een korte vragenlijst leidt om het juiste apparaat te vinden.

Het doel is om te onderzoeken hoe conversational AI de zoek- en keuzeprocessen in een B2B-webshop voor de horeca kan verbeteren.

## Versies

Het project bestaat uit meerdere iteraties, elk op een eigen branch:

| Branch  | Versie     | Omschrijving                                             |
|---------|------------|----------------------------------------------------------|
| `main`  | v1         | Eerste release van het prototype                         |
| `v2`    | v2         | Figma-update met nieuwe Voiceflow-integratie             |
| `v3`    | v3         | Figma-update met Voiceflow widget en toon/verberg toggle |
| `final` | Eindversie | Definitieve versie met bijgewerkte Voiceflow widget (v4) |

## Belangrijkste features

- **Home-pagina** met hero, categoriekaarten en een uitklappende zoekbalk met populaire suggesties, categorieën en productresultaten.
- **Categoriepagina** en **productpagina** met volledige productdetails.
- **Digitale assistent (HGS Buddy)** als zij-paneel, aangestuurd door Voiceflow. Ondersteunt:
  - vrije vragen,
  - een gestuurde vragenlijst (type apparaat, capaciteit, gebruik, budget),
  - productsuggesties, alternatieven en vergelijkingen.
- **Vergelijkingsweergave** waarin twee producten naast elkaar worden gezet met uitleg bij specs.
- **Spec-uitleg-tooltips** en een *text selection popup*: selecteer een term op de pagina en vraag de assistent om uitleg.
- Volledig Nederlandstalige interface, passend bij het klantsegment.

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
| Conversational AI | [Voiceflow](https://www.voiceflow.com/) (widget geladen in `index.html`) |

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
        ├── WebshopHeader.tsx
        ├── CategoryCard.tsx
        ├── CategoryPage.tsx
        ├── ProductCard.tsx
        ├── CompactProductCard.tsx
        ├── ProductPage.tsx
        ├── ComparisonView.tsx
        ├── DigitalAssistant.tsx     # HGS Buddy zij-paneel
        ├── SpecTooltip.tsx
        ├── TextSelectionPopup.tsx
        ├── specExplanationKeys.ts   # Mappings voor spec-uitleg
        ├── figma/                   # Helpers (o.a. ImageWithFallback)
        └── ui/                      # shadcn/ui componenten
```

## Installatie

Vereisten: **Node.js 18+** en **npm**.

```bash
# 1. Repository clonen
git clone https://github.com/Liamvanbart1/hgs-buddy.git
cd hgs-buddy

# 2. Schakel naar de gewenste versie (bijv. de eindversie)
git checkout final

# 3. Dependencies installeren
npm install

# 4. Development server starten
npm run dev
```

De dev-server draait standaard op [http://localhost:3000](http://localhost:3000) en opent automatisch in je browser (zie `vite.config.ts`).

## Scripts

| Script | Beschrijving |
|---|---|
| `npm run dev` | Start de Vite dev-server met hot-reload. |
| `npm run build` | Bouwt de productieversie naar de map `build/`. |

## Deployment

Het project is geconfigureerd voor hosting op **GitHub Pages** onder het pad `/HGS-Buddy_Final/`. Dit is ingesteld in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/HGS-Buddy_Final/',
  // ...
});
```

Als je het project onder een andere URL wilt hosten, pas dan `base` aan (bijvoorbeeld naar `'/'` voor een root-deployment).

Build en publiceer:

```bash
npm run build
# Inhoud van build/ uploaden naar GitHub Pages of een andere statische host
```

## Ontwerp en assets

- Het originele ontwerp staat in Figma: [HGS BUDDY op Figma](https://www.figma.com/design/MMaPt6w94ivc2B1rfuJPqM/HGS-BUDDY).
- Figma-assets worden via aliassen (`figma:asset/...`) geresolved naar bestanden in `src/assets/` (zie `vite.config.ts`).
- SVG-iconen uit het ontwerp zijn omgezet naar React-componenten in `src/imports/`.

## Testplan

Het testplan voor het prototype staat in `testplan_hgs_buddy.docx` in de projectroot. Hierin zijn de scenario's en acceptatiecriteria beschreven waarmee de werking van zowel de webshop als de digitale assistent gevalideerd wordt.

## Licentie en attributies

Dit is een afstudeerproject en niet bedoeld voor productiegebruik. Zie `src/Attributions.md` voor attributies:

- UI-componenten van [shadcn/ui](https://ui.shadcn.com/) onder [MIT-licentie](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).
- Foto's van [Unsplash](https://unsplash.com) onder de [Unsplash License](https://unsplash.com/license).
