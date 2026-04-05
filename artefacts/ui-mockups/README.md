# Safe-Stay AI — UI Wireframe Mockups

**Design System:** Minimal warm SaaS  
**Generated:** April 2026  

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `sage-500` | `#6B8F71` | Primary CTA, sidebar bg, active states, AI bubbles border |
| `sage-50/100` | `#EFF4F0 / #D5E4D7` | Badge backgrounds, AI chat bubbles, icon containers |
| `cream` | `#F5F0EB` | Page background |
| `warm-gray` | `#8C8377` | Subtext, placeholders, breadcrumbs |
| `white` | `#FFFFFF` | Cards, top bar, modals |
| `rounded-xl` | `12px` | All cards and inputs |
| Shadows | `shadow-sm` | Cards at rest; `shadow-md` on hover |
| Font | Figtree (sans-serif) | All text |

---

## Screens

| # | Screen | Route | Status |
|---|---|---|---|
| [01](01-host-dashboard.md) | Host Dashboard — property cards grid | `/host/properties` | ✅ Built |
| [02](02-create-property.md) | Create Property — form with breadcrumb | `/host/properties/create` | ✅ Built |
| [03](03-upload-house-manual.md) | Upload House Manual — property detail | `/host/properties/{id}` | ✅ Built |
| [04](04-guest-portal.md) | Guest Portal — AI chat interface | `/property/{id}/portal` | ⏳ Batch 5 |
| [05](05-guest-maintenance-report.md) | Guest Maintenance Report — issue form | `/property/{id}/portal` | ⏳ Batch 9 |

---

## Layout Pattern (Host screens)

```
[Icon sidebar 80px][Top bar full-width]
                  [Content area — bg-cream p-8]
```

## Layout Pattern (Guest screens)

```
[Guest header — property name + nav]
[Content — bg-cream, centered cards, no sidebar]
```
