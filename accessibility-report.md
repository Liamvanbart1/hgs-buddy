# HGS BUDDY — WCAG 2.1 AA Accessibility Audit

**Date:** March 12, 2026
**Scope:** Full codebase review (App.tsx, WebshopHeader, ProductCard, CategoryCard, ComparisonView, TextSelectionPopup, DigitalAssistant, index.html)
**Standard:** WCAG 2.1 Level AA

---

## Summary

| Principle | Issues Found | Severity |
|---|---|---|
| Perceivable | 6 | 🔴 Critical / 🟡 Moderate |
| Operable | 5 | 🔴 Critical |
| Understandable | 2 | 🟡 Moderate |
| Robust | 6 | 🔴 Critical |

---

## 1. Perceivable

### 🔴 P1 — Wrong Page Language (`index.html`)
**WCAG 3.1.1 | Critical**

`<html lang="en">` is set, but the entire application is in Dutch. Screen readers will mispronounce all Dutch content.

```html
<!-- Current -->
<html lang="en">

<!-- Fix -->
<html lang="nl">
```

---

### 🔴 P2 — Brand Color Fails Contrast on White
**WCAG 1.4.3 | Critical**

`#86a201` (the brand olive-green) is used for text in several places on white (`#ffffff`) backgrounds. Its contrast ratio is approximately **2.7:1**, failing both:
- Normal text requirement of 4.5:1
- Large text requirement of 3:1

Affected locations:
- Product names in search dropdown (`text-[#86a201]` on white)
- "Op voorraad" (in-stock) label in `ProductCard`
- Prices in `ComparisonView` (`text-[#86a201]`)
- Category label badge in `ProductCard` (white text on `#86a201` bg — this direction passes, but the reverse is used elsewhere)

**Fix:** Use a darker tint of the brand color for text on white, e.g. `#5a6e00` (approx 5.8:1 on white). Keep `#86a201` for large/bold decorative uses where contrast can be 3:1.

---

### 🟡 P3 — Strikethrough Old Prices Use `text-gray-400`
**WCAG 1.4.3 | Moderate**

`text-gray-400` (`#9ca3af`) on white yields approximately **2.5:1**, failing the 4.5:1 threshold. This appears on old/crossed-out prices in search results and product cards.

While these are secondary/decorative prices, if they convey information (original cost) they must still meet contrast.

**Fix:** Use at least `text-gray-500` (`#6b7280`, ~4.8:1 on white) for all meaningful text.

---

### 🔴 P4 — Icon-Only Buttons Have No Accessible Names
**WCAG 1.1.1 | Critical**

Three icon buttons in `WebshopHeader` have no visible label or `aria-label`:

```tsx
// Current — no accessible name
<button className="p-2 hover:bg-gray-100 rounded-full">
  <Phone className="w-5 h-5" />
</button>
<button className="p-2 hover:bg-gray-100 rounded-full">
  <User className="w-5 h-5" />
</button>
<button className="p-2 hover:bg-gray-100 rounded-full relative">
  <ShoppingCart className="w-5 h-5" />
</button>
```

The Home icon in the nav bar has the same issue.

**Fix:** Add `aria-label` to each:
```tsx
<button aria-label="Bel ons" className="..."><Phone /></button>
<button aria-label="Mijn account" className="..."><User /></button>
<button aria-label="Winkelwagen" className="..."><ShoppingCart /></button>
// Nav home button:
<button aria-label="Terug naar homepagina" onClick={onNavigateHome}>
  <Home className="w-4 h-4" />
</button>
```

Also the Voiceflow toggle button in `index.html` has no `aria-label` describing what it shows/hides.

---

### 🟡 P5 — Star Ratings Not Exposed to Screen Readers
**WCAG 1.1.1 | Moderate**

Star ratings in `WebshopHeader`, `ProductCard`, and `ComparisonView` are rendered as a series of SVG icons with no accessible equivalent. A screen reader user gets no information about the product rating.

```tsx
// Current — no screen reader output
{[1, 2, 3, 4].map((i) => (
  <Star key={i} className="w-4 h-4 fill-current" />
))}
<span className="text-xs text-gray-600">8.9 op basis van</span>
```

**Fix:** Add a visually hidden text label:
```tsx
<div role="img" aria-label="Beoordeling: 8.9 van de 5, op basis van 3840 klanten">
  {/* star icons with aria-hidden="true" */}
</div>
```

---

### 🟡 P6 — Hero Background Image Has Descriptive Alt Text
**WCAG 1.1.1 | Minor/Informational**

The hero background (`alt="Hero background"`) is purely decorative. Using `alt=""` signals to screen readers to skip it entirely.

```tsx
// Fix
<img src={imgHeroBackground} alt="" role="presentation" ... />
```

---

## 2. Operable

### 🔴 O1 — `CategoryCard` is Not Keyboard Accessible
**WCAG 2.1.1 | Critical**

`CategoryCard` is a `<div>` with a `cursor-pointer` class but no `role`, `tabIndex`, or `onKeyDown` handler. Keyboard-only users cannot navigate to or activate these cards.

```tsx
// Current
<div className="relative group cursor-pointer overflow-hidden ...">

// Fix: convert to a button or add keyboard support
<button
  className="relative group overflow-hidden ..."
  aria-label={`Bekijk categorie: ${title}`}
>
```

---

### 🔴 O2 — Product Cards in Search Dropdown are Not Keyboard Accessible
**WCAG 2.1.1 | Critical**

Product result cards in both `App.tsx` and `WebshopHeader.tsx` search dropdowns are `<div className="group cursor-pointer">` elements — no keyboard event handling.

**Fix:** Replace with `<button>` or `<a>` elements so they're naturally focusable and activatable via keyboard.

---

### 🔴 O3 — Mega Menu Only Opens on Hover (No Keyboard Support)
**WCAG 2.1.1 | Critical**

The navigation mega menu in `WebshopHeader` opens only via `onMouseEnter` on the `<li>` elements. There is no keyboard mechanism (focus, Enter/Space key) to open the menu.

```tsx
// Current — mouse-only
<li onMouseEnter={() => setActiveMenu("Keukenapparatuur")} className="relative">
```

**Fix:** Add keyboard open/close to the nav items. The button inside should toggle the menu on Enter/Space, and the menu should close on Escape or when focus leaves.

---

### 🟡 O4 — Icon Buttons Are Below 44×44px Touch Target Size
**WCAG 2.5.5 | Moderate**

Phone, User, and ShoppingCart buttons use `p-2` (8px padding) around a 20px icon = 36×36px total. The WCAG 2.5.5 minimum is 44×44px.

**Fix:** Use `p-3` (12px padding) to reach 44×44px, or set explicit `min-w-[44px] min-h-[44px]`.

---

### 🔴 O5 — No Focus Management When Assistant Panel Opens
**WCAG 2.4.3 | Critical**

When the `DigitalAssistant` panel slides in (a modal-like overlay), focus remains on the triggering button behind the backdrop. Users should not be able to interact with content behind the overlay.

**Fix:**
- When the panel opens, move focus to the first focusable element inside it (e.g., the close button or chat input).
- Trap focus within the panel while it is open (Tab/Shift+Tab should cycle only within the panel).
- When the panel closes, return focus to the button that opened it.
- Add an Escape key handler to close the panel.

---

## 3. Understandable

### 🔴 U1 — Search Inputs Have No Labels
**WCAG 3.3.2 | Critical**

Both search fields (hero and header) rely only on `placeholder` text. Placeholders disappear when typing and are not announced as labels by all screen readers.

```tsx
// Current — no label
<input
  type="text"
  placeholder="Zoek naar een product of merk..."
  className="..."
/>
```

**Fix:** Add a `<label>` or `aria-label`:
```tsx
<input
  type="text"
  aria-label="Zoek naar een product of merk"
  placeholder="Zoek naar een product of merk..."
  className="..."
/>
```

---

### 🟡 U2 — Search Dropdown is Not a Proper ARIA Combobox
**WCAG 4.1.2 | Moderate**

The search input + results dropdown pattern should follow the ARIA combobox pattern so screen readers understand the relationship between the input and the suggestions list.

**Fix:**
```tsx
<input
  role="combobox"
  aria-expanded={showSearchResults}
  aria-haspopup="listbox"
  aria-controls="search-results-listbox"
  aria-autocomplete="list"
  ...
/>
<div id="search-results-listbox" role="listbox">
  {/* suggestions as role="option" */}
</div>
```

---

## 4. Robust

### 🔴 R1 — Modal Overlay Missing Dialog Role and ARIA
**WCAG 4.1.2 | Critical**

The DigitalAssistant panel slides in as a modal overlay (with a backdrop that blocks the page) but has no `role="dialog"`, `aria-modal="true"`, or `aria-labelledby`. Screen readers won't understand it as a modal context.

**Fix:**
```tsx
<motion.div
  role="dialog"
  aria-modal="true"
  aria-labelledby="assistant-panel-title"
  ...
>
  <h2 id="assistant-panel-title">HGS Buddy</h2>
  ...
</motion.div>
```

---

### 🟡 R2 — Comparison Table Has Empty `<th>` Cells
**WCAG 1.3.1 | Moderate**

In `ComparisonView`, the two product column header cells are empty:

```tsx
<th className="w-[32%] bg-gray-50 border-r border-gray-200" />
<th className="w-[32%] bg-gray-50" />
```

Screen readers reading the table will announce these as blank column headers, losing the association between column data and the product.

**Fix:** Add visually hidden (or visible) product names as `<th scope="col">`:
```tsx
<th scope="col" className="...">
  <span className="sr-only">{product1?.name}</span>
</th>
```

---

### 🟡 R3 — `TextSelectionPopup` Only Works for Mouse Users
**WCAG 2.1.1 | Moderate**

The text selection popup listens to `mouseup` events only. Keyboard users who select text using Shift+arrow keys will not trigger the popup.

**Fix:** Also listen to `keyup` and `selectionchange` to detect keyboard-driven selections, or replace `mouseup` with `selectionchange` which fires for both.

---

### 🟡 R4 — No Live Region for Dynamic Content Updates
**WCAG 4.1.3 | Moderate**

When the assistant returns product recommendations or the comparison view updates, there is no `aria-live` region to announce changes to screen reader users. They will receive no notification that new content has appeared.

**Fix:** Add an `aria-live="polite"` region in the product results area:
```tsx
<div aria-live="polite" aria-atomic="false">
  {/* product grid content */}
</div>
```

---

### 🟡 R5 — Decorative Icons Not Hidden from Screen Readers
**WCAG 1.1.1 | Minor**

Icons used purely as visual decoration (e.g., the `Search` icon inside the input field, the `Check` icons in spec lists, arrow icons in buttons that already have text) are rendered without `aria-hidden="true"`. Screen readers may announce them, creating noise.

**Fix:** Add `aria-hidden="true"` to decorative icons:
```tsx
<Search className="absolute left-4 ..." aria-hidden="true" />
<Check className="w-4 h-4 ..." aria-hidden="true" />
<ArrowRight className="w-4 h-4" aria-hidden="true" />
```

---

### 🟡 R6 — Non-Text UI Contrast for Border-Based Comparison Toggle
**WCAG 1.4.11 | Moderate**

The "Vergelijk met de HGS Buddy" button uses `border-[#86a201]` on white — the border contrast is ~2.7:1, below the 3:1 requirement for UI component boundaries.

**Fix:** Use a darker border color, e.g., `border-[#5a6e00]`, or ensure the button has a filled/sufficient background that communicates its interactive state.

---

## Priority Fix List

| # | Issue | Effort | Impact |
|---|---|---|---|
| 1 | Change `lang="en"` → `lang="nl"` | 🟢 Trivial | All screen reader users |
| 2 | Add `aria-label` to icon buttons | 🟢 Low | Screen reader + voice control users |
| 3 | Add `aria-label` to search inputs | 🟢 Low | Screen reader users |
| 4 | Convert `CategoryCard` div → `<button>` | 🟢 Low | Keyboard users |
| 5 | Fix `#86a201` text contrast on white | 🟡 Medium | Low vision users |
| 6 | Fix `text-gray-400` on white | 🟢 Low | Low vision users |
| 7 | Add ARIA dialog role to assistant panel | 🟡 Medium | Screen reader users |
| 8 | Add focus trap + focus management to modal | 🟡 Medium | Keyboard + screen reader users |
| 9 | Add keyboard support to mega menu | 🟡 Medium | Keyboard users |
| 10 | Add ARIA combobox pattern to search | 🔴 High effort | Screen reader users |
| 11 | Fix comparison table `<th>` headers | 🟢 Low | Screen reader users |
| 12 | Increase icon button touch targets to 44px | 🟢 Low | Mobile/touch users |
| 13 | Add `aria-hidden="true"` to decorative icons | 🟢 Low | Screen reader users |
| 14 | Add `aria-live` region for product results | 🟡 Medium | Screen reader users |

---

*Generated by WCAG 2.1 AA static code audit. Estimated automated tool coverage: ~30%. Manual keyboard + screen reader testing recommended to catch runtime/dynamic issues.*
