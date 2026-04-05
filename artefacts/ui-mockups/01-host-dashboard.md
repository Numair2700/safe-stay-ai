# Wireframe 01 — Host Dashboard (Property Cards Grid)

**Route:** `/host/properties`  
**Component:** `resources/js/Pages/Host/Dashboard.jsx`  
**Design:** Sage green #6B8F71 sidebar · Off-white #F5F0EB bg · White cards · rounded-xl

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCREEN: 1440 × 900                                                          │
│                                                                             │
│ ┌──────┐ ┌─────────────────────────────────────────────────────────────┐   │
│ │      │ │  TOP BAR  [bg-white border-b]                               │   │
│ │  🏠  │ │                                        ┌────┐ Numair A.    │   │
│ │      │ │  My Properties                         │ NA │               │   │
│ │      │ │                                        └────┘               │   │
│ │  ─── │ └─────────────────────────────────────────────────────────────┘   │
│ │      │                                                                    │
│ │      │  CONTENT  [bg-cream p-8]                                          │
│ │      │                                                                    │
│ │  ─── │  ┌──────────────────────────────────────────┐  ┌── + Add ──┐     │
│ │      │  │  3 properties                            │  │  Property │     │
│ │      │  └──────────────────────────────────────────┘  └───────────┘     │
│ │  👤  │                                                                    │
│ │      │  ┌──────────────────────┐  ┌──────────────────────┐               │
│ │  ─── │  │ [bg-white rounded-xl]│  │ [bg-white rounded-xl]│               │
│ │      │  │                      │  │                      │               │
│ │  ↪   │  │  Beach House     [●] │  │  City Flat       [●] │               │
│ │      │  │  Active              │  │  Active              │               │
│ └──────┘  │                      │  │                      │               │
│ [bg:      │  📍 123 Ocean Dr…   │  │  📍 45 King St…     │               │
│  sage-500]│                      │  │                      │               │
│           │  A lovely beachfront │  │  Modern studio in    │               │
│           │  property with…      │  │  the city centre…    │               │
│           │                      │  │                      │               │
│           │ ─────────────────── │  │ ─────────────────── │               │
│           │  [✏ Edit]  [🗑 Del] │  │  [✏ Edit]  [🗑 Del] │               │
│           └──────────────────────┘  └──────────────────────┘               │
│                                                                             │
│           ┌──────────────────────┐                                          │
│           │ [bg-white rounded-xl]│  ← 3rd card (xl:grid-cols-3)            │
│           │  Garden Cottage  [●] │                                          │
│           │  Active              │                                          │
│           │  📍 12 Rose Lane…   │                                          │
│           │  ─────────────────── │                                          │
│           │  [✏ Edit]  [🗑 Del] │                                          │
│           └──────────────────────┘                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Layout Specs

| Element | Value |
|---|---|
| Sidebar width | `w-20` (80px) fixed |
| Sidebar bg | `bg-sage-500` (#6B8F71) |
| Page bg | `bg-cream` (#F5F0EB) |
| Top bar height | `h-16` (64px) `bg-white` |
| Content padding | `p-8` |
| Card grid | `grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5` |
| Card bg | `bg-white rounded-xl shadow-sm border border-gray-100` |
| Card padding | `p-6` |
| Badge (Active) | `bg-sage-100 text-sage-700 rounded-full text-xs` |

## States

- **Empty state:** Centered illustration + "No properties yet" + "Add Property" CTA
- **Loading:** Skeleton pulse cards (3 placeholders)
- **Hover card:** `hover:shadow-md transition-shadow`

## Interactions

- Click property **name** → navigate to `/host/properties/{id}` (Show page)
- Click **Edit** → navigate to `/host/properties/{id}/edit`
- Click **Delete** → confirm dialog → DELETE request
- Click **+ Add Property** → navigate to `/host/properties/create`
