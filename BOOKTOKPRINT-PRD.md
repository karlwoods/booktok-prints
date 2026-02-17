# BookTokPrint Website PRD

**For use with Claude Code — Financiary Template Adaptation**

---

## 1. Context

You are adapting an existing **Financiary** website template into a direct-to-customer storefront for **BookTokPrint**, a print shop selling book-themed wall art to the BookTok community. The fulfilment partner is **PrintShrimp**.

The guiding principle is **minimal structural change**. Keep the template's layout, components, and responsive behaviour intact. Changes are limited to branding, copy, colour tokens, navigation labels, and catalogue data rendering.

---

## 2. Goals

- Preserve the Financiary layout to minimise development scope.
- Re-skin all branding to BookTokPrint identity.
- Allow customers to browse prints by collection.
- Drive purchases via Etsy deep-links (Phase 1).
- Structure the codebase so native checkout can replace Etsy links later (Phase 2).

---

## 3. Non-Goals (V1)

- No layout or component redesign.
- No custom print editor or personalisation tool.
- No multi-language or multi-currency.
- No About page.
- No native cart or checkout (Etsy handles transactions in V1).

---

## 4. Tech Stack Assumptions

> **Important:** Confirm these assumptions against the actual Financiary template before starting work. If the template uses a different stack, adapt the implementation notes below accordingly.

| Concern | Assumption |
|---------|------------|
| Framework | React / Next.js (or whatever the Financiary template ships with) |
| Styling | CSS variables / Tailwind tokens — whichever the template uses |
| Hosting | Vercel, Netlify, or static export |
| Product data | Local JSON file (`/data/products.json`) — no external CMS in V1 |
| Responsive | Use the template's existing responsive behaviour unchanged |

---

## 5. Brand Colour System

### 5.1 Colour Tokens

Define these as CSS custom properties (or Tailwind theme tokens if applicable) and map **every** existing primary colour reference in the template to these values.

```css
:root {
  --color-primary: #235c5f;
  --color-primary-hover: #1c4a4c;
  --color-primary-active: #163b3d;
  --color-primary-soft: #e9f0f0;
  --color-on-primary: #ffffff;
}
```

### 5.2 Application Rules

- Replace the template's default primary colour **everywhere**: buttons, links, icon accents, highlight elements, selection states.
- Hover states → `--color-primary-hover`.
- Active / pressed states → `--color-primary-active`.
- Use `--color-primary-soft` sparingly for subtle section backgrounds or callout blocks.
- Text rendered on top of primary-coloured surfaces → `--color-on-primary`.
- Do a global search for any hardcoded hex values from the original template's primary palette and replace them.

---

## 6. Information Architecture

### 6.1 Core Pages

| Route | Purpose |
|-------|---------|
| `/` | Home |
| `/shop` | Shop Prints — all prints, filterable |
| `/collections/[slug]` | Collection page (e.g. `/collections/dark-academia`) |
| `/prints/[slug]` | Product detail page |

### 6.2 Support Pages

| Route | Purpose |
|-------|---------|
| `/faq` | FAQ |
| `/contact` | Contact |
| `/shipping` | Shipping & Returns |
| `/size-guide` | Size Guide |

### 6.3 Legal Pages

| Route | Purpose |
|-------|---------|
| `/privacy` | Privacy Policy |
| `/cookies` | Cookie Policy |
| `/terms` | Terms & Conditions |

### 6.4 Taxonomy

There is **one** taxonomy: **Collections**. Collections represent thematic groupings (e.g. "Dark Academia", "Romantasy", "Classics"). Terms like "vibe" or "category" used in UI copy are user-facing synonyms — they all resolve to the same `collection` field in the data model.

---

## 7. Product Data Model

Store product data in `/data/products.json`. Each product follows this schema:

```json
{
  "id": "string — unique slug, e.g. 'pride-prejudice-01'",
  "title": "string",
  "description": "string — short product description",
  "collections": ["string — collection slugs, e.g. 'classics', 'romantasy'"],
  "variants": [
    {
      "size": "string — e.g. 'A5', 'A4', 'A3'",
      "finish": "string — e.g. 'Matte', 'Glossy'",
      "price": "number — in GBP",
      "etsyUrl": "string — deep-link to this specific Etsy listing"
    }
  ],
  "images": ["string — paths to product images, first is hero"],
  "featured": "boolean — true for Best Sellers",
  "createdAt": "string — ISO date for 'newest' sorting"
}
```

Store collection metadata in `/data/collections.json`:

```json
{
  "slug": "string",
  "title": "string",
  "description": "string",
  "image": "string — collection cover image path"
}
```

> **Note:** This local data approach means product updates require a code change or redeploy. This is acceptable for V1 given a small catalogue. If the catalogue grows beyond ~50 products, consider migrating to a headless CMS.

---

## 8. Template Adaptation — Section-by-Section

### 8.1 Header

| Element | Change |
|---------|--------|
| Logo text | Replace "Financiary" → **BookTokPrint** |
| Logo link | Links to `/` |
| Nav items | `Shop Prints` · `Collections` · `Best Sellers` · `FAQ` · `Contact` |
| CTA button | Change "Become a Partner" → **Contact** (links to `/contact`) |
| Mobile nav | Keep template hamburger behaviour unchanged |

`Best Sellers` links to `/shop?filter=best-sellers` (or an anchor/filtered view — keep it simple).

### 8.2 Hero Section

Keep layout identical. Replace copy only.

| Element | Value |
|---------|-------|
| Headline | *Your walls deserve better stories.* (placeholder — replace with final copy) |
| Subheadline | *Book-inspired prints for readers, dreamers, and shelf-decorators.* (placeholder) |
| Primary CTA | **Shop Prints** → links to `/shop` |
| Secondary CTA | **Browse Collections** → links to `/collections` or scrolls to collections section |
| Hero image | Replace with BookTokPrint hero image (to be provided as `/public/images/hero.jpg`) |

### 8.3 Three Feature Cards (Below Hero)

Keep same card component and layout. Repurpose content:

| Card | Title | Description | Link |
|------|-------|-------------|------|
| 1 | Best Sellers | Our most-loved prints | `/shop?filter=best-sellers` |
| 2 | Shop by Vibe | Dark academia, romantasy, cottagecore & more | `/collections` |
| 3 | Gifts for Readers | Curated picks that make perfect gifts | `/collections/gifts` |

Each card should display an image (to be provided). If the template cards have icons instead, replace with images.

### 8.4 "Why Choose Us" → "Why Choose Our Prints?"

Keep the same component layout. Replace all content:

| Point | Heading | Description |
|-------|---------|-------------|
| 1 | High-Quality Printing | Crisp detail, rich colour, premium paper stock. |
| 2 | Multiple Sizes | Available in A5, A4, and A3 to fit any space. |
| 3 | Carefully Packaged | Sturdy packaging so your print arrives in perfect condition. |
| 4 | Fulfilled by PrintShrimp | Reliable dispatch and consistent quality from our print partner. |

If the template supports more than 4 items, optionally add:

| 5 | Giftable by Default | Every order is print-ready to gift. |
| 6 | Friendly Support | Questions? We're here to help. |

### 8.5 Footer

| Element | Change |
|---------|--------|
| Brand name | BookTokPrint |
| Link columns | **Shop:** Shop Prints, Collections, Best Sellers |
| | **Help:** FAQ, Contact, Shipping & Returns, Size Guide |
| | **Legal:** Privacy Policy, Cookie Policy, Terms |

---

## 9. Page Specifications

### 9.1 Shop Prints (`/shop`)

- Displays all products in a grid.
- **Must support:** filtering by collection, sorting by featured / newest / price (low-high, high-low).
- **Should support (V1 stretch):** keyword search.
- Each product card shows: hero image, title, starting price ("From £X.XX"), collection badge(s).
- Clicking a card navigates to `/prints/[slug]`.

### 9.2 Collection Page (`/collections/[slug]`)

- Displays collection title, description, and cover image.
- Shows a filtered product grid (same component as Shop Prints, filtered to this collection).
- Collections index at `/collections` shows all collections as a card grid.

### 9.3 Product Detail Page (`/prints/[slug]`)

- Image gallery (first image is hero; remaining images shown as thumbnails).
- Product title and description.
- Variant selectors: size dropdown, finish dropdown.
- Price updates dynamically based on selected variant.
- **"Buy on Etsy" button** — links to the `etsyUrl` for the selected variant. Opens in a new tab.
- Related products section at the bottom (same collection, excluding current product, max 4).

### 9.4 Support & Legal Pages

- Use a simple content page template (title + body text).
- Content will be provided as markdown or plain text to be inserted.

---

## 10. Checkout Strategy

### Phase 1 (V1 — implement now)

- Every product detail page has a **"Buy on Etsy"** button instead of an "Add to Cart" button.
- The button links to the `etsyUrl` from the selected variant.
- The link opens in a new tab (`target="_blank"` with `rel="noopener noreferrer"`).
- No cart, no checkout, no payment integration.

### Phase 2 (Future — do not implement, but design for)

- The `etsyUrl` approach should be isolated so it can be swapped for a native cart/checkout later.
- Suggestion: abstract the purchase action behind a single component (e.g. `<BuyButton />`) so Phase 2 only requires changing that component's internals.

---

## 11. Cookie Consent

- Include a UK/GDPR-compliant cookie consent banner.
- Use a lightweight solution (e.g. cookie-consent library or a simple custom banner).
- The banner must appear on first visit, allow accept/reject, and persist the choice.
- No cookies should be set before consent is granted (if any tracking is added later).

---

## 12. Content Dependencies

The following assets must be provided before the site can launch. **Do not block development** — use placeholder images and copy, then swap before deploy.

| Asset | Status | Notes |
|-------|--------|-------|
| Hero image | Pending | `/public/images/hero.jpg` — landscape, high-res |
| Card images (×3) | Pending | For the three feature cards |
| Collection cover images | Pending | One per collection |
| Product photography | Pending | Minimum 2 images per product |
| Product copy (titles + descriptions) | Pending | Populate `products.json` |
| Collection copy | Pending | Populate `collections.json` |
| FAQ content | Pending | Markdown or plain text |
| Legal page content | Pending | Privacy, Cookies, Terms |
| Shipping & Returns copy | Pending | Markdown or plain text |
| Size Guide content | Pending | Dimensions, visual reference |

---

## 13. Acceptance Criteria

The project is complete when:

### Branding
- [ ] All primary colour references use BookTokPrint tokens (`#235c5f` and derivatives).
- [ ] Hover and active states darken correctly.
- [ ] Logo reads "BookTokPrint" and links to `/`.
- [ ] No remnants of "Financiary" branding anywhere in the UI or meta tags.

### Navigation & Layout
- [ ] Header nav shows: Shop Prints, Collections, Best Sellers, FAQ, Contact.
- [ ] CTA button reads "Contact" and links to `/contact`.
- [ ] Template layout and responsive behaviour are unchanged.
- [ ] Footer contains all required links, grouped correctly.

### Catalogue
- [ ] Products load from `/data/products.json`.
- [ ] Shop page displays all products in a grid with collection filter and sort options.
- [ ] Collection pages display filtered product grids.
- [ ] Product detail pages show image gallery, variant selectors, dynamic pricing, and "Buy on Etsy" button.
- [ ] "Buy on Etsy" opens the correct Etsy listing for the selected variant in a new tab.
- [ ] Related products appear on product detail pages.

### Content Sections
- [ ] Hero section displays updated copy and CTAs.
- [ ] Three feature cards show Best Sellers / Shop by Vibe / Gifts for Readers.
- [ ] "Why Choose Our Prints?" section displays all four (or six) points.

### Technical
- [ ] Purchase action is abstracted behind a single component for future Phase 2 swap.
- [ ] Cookie consent banner is present and functional.
- [ ] All internal links resolve correctly (no 404s).
- [ ] Page metadata (title, description) is set per page.

---

## 14. Out of Scope Reminder

Do **not** implement any of the following in V1:

- Native cart or checkout
- Payment processing
- User accounts or wishlists
- About page
- Custom print editor
- Multi-language or multi-currency
- Analytics or event tracking

---

*End of PRD*
