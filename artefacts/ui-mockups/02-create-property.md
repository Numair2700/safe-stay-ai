# Wireframe 02 — Create Property (Form with Breadcrumb)

**Route:** `/host/properties/create`  
**Component:** `resources/js/Pages/Host/Properties/Create.jsx`  
**Design:** max-w-2xl form · white card · breadcrumb nav · sage green CTA

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCREEN: 1440 × 900                                                          │
│                                                                             │
│ ┌──────┐ ┌─────────────────────────────────────────────────────────────┐   │
│ │      │ │  TOP BAR                                       ┌────┐ NA   │   │
│ │  🏠  │ │  Add Property                                  │    │      │   │
│ │      │ │                                                └────┘      │   │
│ │  ─── │ └─────────────────────────────────────────────────────────────┘   │
│ │      │                                                                    │
│ │      │  CONTENT  [p-8]                                                   │
│ │      │                                                                    │
│ │      │  Properties  >  New Property                                       │
│ │  👤  │  [warm-gray]    [gray-800 font-medium]                            │
│ │  ─── │                                                                    │
│ │  ↪   │  ┌────────────────────────────────────────────────────────┐       │
│ │      │  │ [bg-white rounded-xl shadow-sm border p-8]             │       │
│ └──────┘  │                                                        │       │
│           │  Property Name  *                                       │       │
│           │  ┌──────────────────────────────────────────────────┐  │       │
│           │  │  e.g. Seaside Cottage                            │  │       │
│           │  └──────────────────────────────────────────────────┘  │       │
│           │  [border rounded-lg px-3.5 py-2.5 focus:ring-sage-500] │       │
│           │                                                        │       │
│           │  Address  *                                            │       │
│           │  ┌──────────────────────────────────────────────────┐  │       │
│           │  │  e.g. 12 Ocean Drive, Brighton, BN1 1AA          │  │       │
│           │  └──────────────────────────────────────────────────┘  │       │
│           │                                                        │       │
│           │  Description                                           │       │
│           │  ┌──────────────────────────────────────────────────┐  │       │
│           │  │                                                  │  │       │
│           │  │  Briefly describe the property…                  │  │       │
│           │  │                                                  │  │       │
│           │  │                                                  │  │       │
│           │  └──────────────────────────────────────────────────┘  │       │
│           │  [textarea rows-4 resize-none]                         │       │
│           │                                                        │       │
│           │  ┌──────────────────┐  ┌──────────────┐               │       │
│           │  │ Create Property  │  │    Cancel    │               │       │
│           │  │ [bg-sage-500]    │  │ [bg-white    │               │       │
│           │  │ [text-white]     │  │  border]     │               │       │
│           │  └──────────────────┘  └──────────────┘               │       │
│           └────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Layout Specs

| Element | Value |
|---|---|
| Form max-width | `max-w-2xl` |
| Card | `bg-white rounded-xl shadow-sm border border-gray-100 p-8` |
| Input | `px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm` |
| Input focus | `focus:ring-2 focus:ring-sage-500 focus:border-transparent` |
| Label | `text-sm font-medium text-gray-700` |
| Primary CTA | `bg-sage-500 text-white rounded-lg px-5 py-2.5 hover:bg-sage-600` |
| Secondary CTA | `bg-white text-gray-600 border border-gray-200 rounded-lg` |
| Breadcrumb | `text-sm text-warm-gray` with `>` chevron separator |

## Validation States

```
Property Name  *
┌──────────────────────────────────────────────────┐
│  [empty — red border on submit]                  │
└──────────────────────────────────────────────────┘
⚠ The name field is required.   ← [text-xs text-red-500]
```

## Interactions

- Submit → POST `/host/properties` → redirect to Dashboard with flash "Property created"
- Cancel → navigate back to `/host/properties`
- Processing state: button shows "Creating…" and is disabled
