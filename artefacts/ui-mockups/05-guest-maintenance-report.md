# Wireframe 05 — Guest Maintenance Report (Issue Submission Form)

**Route:** `/property/{id}/portal` (same page, scrolled) or `/property/{id}/maintenance`  
**Component:** Section within `resources/js/Pages/Guest/Portal.jsx`  
**Access:** Public — no login required  
**Design:** White card · max-w-2xl · inline form · status badge

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCREEN: 1440 × 900                                                          │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  GUEST HEADER  [bg-white border-b]                                      │ │
│ │  ┌────┐  Beach House                    [💬 Ask AI Concierge]          │ │
│ │  │ 🏠 │  123 Ocean Drive, Miami, FL     [border sage-500 text-sage]    │ │
│ │  └────┘                                                                 │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ MAINTENANCE CARD  [max-w-2xl mx-auto bg-white rounded-xl shadow]    │   │
│  │                                                                     │   │
│  │  CARD HEADER                                                        │   │
│  │  ┌──────────────────────────────────────────────────────────────┐   │   │
│  │  │  ┌──────────────┐                                           │   │   │
│  │  │  │  🔧 [icon]   │  Report a Maintenance Issue               │   │   │
│  │  │  │ [sage-100 bg]│  Let us know what needs attention         │   │   │
│  │  │  └──────────────┘  [text-sm text-warm-gray]                 │   │   │
│  │  └──────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  FORM  [p-6 flex flex-col gap-5]                                    │   │
│  │                                                                     │   │
│  │  Describe the issue  *                                              │   │
│  │  ┌──────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                              │   │   │
│  │  │  e.g. The kitchen tap is leaking and water is dripping       │   │   │
│  │  │  onto the floor…                                             │   │   │
│  │  │                                                              │   │   │
│  │  │                                                              │   │   │
│  │  └──────────────────────────────────────────────────────────────┘   │   │
│  │  [textarea rows-5 border rounded-xl px-4 py-3 text-sm resize-none] │   │
│  │                                                                     │   │
│  │  ┌────────────────────────────────────────┐                        │   │
│  │  │  Submit Report                         │                        │   │
│  │  │  [bg-sage-500 text-white rounded-xl]   │                        │   │
│  │  │  [w-full py-3 font-medium]             │                        │   │
│  │  └────────────────────────────────────────┘                        │   │
│  │                                                                     │   │
│  │  ─────────────────────────────────────────                          │   │
│  │  YOUR SUBMITTED REPORTS                                             │   │
│  │  [text-sm font-semibold text-gray-800 mt-4]                        │   │
│  │                                                                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐   │   │
│  │  │ [bg-gray-50 rounded-xl border p-4]                           │   │   │
│  │  │                                                              │   │   │
│  │  │  Kitchen tap leaking            ┌───────────┐               │   │   │
│  │  │  Reported 2 Apr 2026            │  🔴 Open  │               │   │   │
│  │  │  [text-xs text-warm-gray]       └───────────┘               │   │   │
│  │  └──────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐   │   │
│  │  │ [bg-gray-50 rounded-xl border p-4]                           │   │   │
│  │  │                                                              │   │   │
│  │  │  Bedroom window won't close     ┌─────────────────┐         │   │   │
│  │  │  Reported 28 Mar 2026           │  ✅ Resolved    │         │   │   │
│  │  │  [text-xs text-warm-gray]       └─────────────────┘         │   │   │
│  │  └──────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Layout Specs

| Element | Value |
|---|---|
| Card max-width | `max-w-2xl mx-auto` |
| Card | `bg-white rounded-xl shadow-sm border border-gray-100 p-6` |
| Textarea | `border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none rows-5` |
| Submit btn | `bg-sage-500 text-white rounded-xl w-full py-3 font-medium` |
| Status: Open | `bg-red-100 text-red-600 rounded-full text-xs px-2.5 py-0.5` |
| Status: Resolved | `bg-sage-100 text-sage-700 rounded-full text-xs px-2.5 py-0.5` |
| Issue item | `bg-gray-50 rounded-xl border border-gray-100 p-4` |

## States

| State | Visual |
|---|---|
| Empty textarea | Placeholder text, submit disabled / grayed |
| Filled | Submit button active (sage-500) |
| Submitting | Button shows "Submitting…", disabled |
| Success | Green flash banner: "Your report has been submitted. Your host will be in touch." |
| No prior reports | "No issues reported yet." in muted text |

## Interactions

- Submit → POST `/property/{id}/maintenance` (no auth needed)
- Issue saved to `maintenance_issues` table with `status = 'open'`
- Page shows guest's own submitted issues (session or property-scoped)
- Host sees same issues in their dashboard (Batch 10)
- "Ask AI Concierge" button in header scrolls back up / links to chat
