# Wireframe 03 — Upload House Manual (Property Detail Page)

**Route:** `/host/properties/{id}`  
**Component:** `resources/js/Pages/Host/Properties/Show.jsx`  
**Design:** Property info card + manual list + upload form · max-w-3xl

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCREEN: 1440 × 900                                                          │
│                                                                             │
│ ┌──────┐ ┌─────────────────────────────────────────────────────────────┐   │
│ │      │ │  TOP BAR                                       ┌────┐ NA   │   │
│ │  🏠  │ │  Beach House                                   │    │      │   │
│ │      │ └─────────────────────────────────────────────────────────────┘   │
│ │  ─── │                                                                    │
│ │      │  Properties  >  Beach House                                        │
│ │      │  [warm-gray]    [gray-800 font-medium]                            │
│ │      │                                                                    │
│ │  👤  │  ┌────────────────────────────────────────────────────────────┐   │
│ │  ─── │  │ PROPERTY INFO  [bg-white rounded-xl shadow-sm p-6]        │   │
│ │  ↪   │  │                                                           │   │
│ │      │  │  Beach House                          [✏ Edit]            │   │
│ └──────┘  │  📍 123 Ocean Drive, Miami, FL                            │   │
│           │                                                           │   │
│           │  A lovely beachfront property with ocean views…           │   │
│           └────────────────────────────────────────────────────────────┘   │
│                                                                             │
│           ┌────────────────────────────────────────────────────────────┐   │
│           │ HOUSE MANUALS  [bg-white rounded-xl shadow-sm p-6]        │   │
│           │                                                           │   │
│           │  House Manuals                                            │   │
│           │  Guests will use these to get AI-powered answers.         │   │
│           │  [text-sm text-warm-gray]                                 │   │
│           │                                                           │   │
│           │  ┌──────────────────────────────────────────────────────┐ │   │
│           │  │ [bg-gray-50 rounded-xl border p-4]                   │ │   │
│           │  │  ┌────────┐  guest-welcome.txt          [🗑 Delete]  │ │   │
│           │  │  │ 📄     │  1,240 characters                        │ │   │
│           │  │  │[sage]  │                                          │ │   │
│           │  │  └────────┘                                          │ │   │
│           │  └──────────────────────────────────────────────────────┘ │   │
│           │                                                           │   │
│           │  ┌──────────────────────────────────────────────────────┐ │   │
│           │  │ [bg-gray-50 rounded-xl border p-4]                   │ │   │
│           │  │  ┌────────┐  house-rules.txt            [🗑 Delete]  │ │   │
│           │  │  │ 📄     │  890 characters                          │ │   │
│           │  │  └────────┘                                          │ │   │
│           │  └──────────────────────────────────────────────────────┘ │   │
│           │                                                           │   │
│           │  ─────────────────────────────────────────────────────── │   │
│           │  UPLOAD FORM  [pt-4 border-t]                            │   │
│           │                                                           │   │
│           │  Upload house manual (.txt)                               │   │
│           │  [text-sm font-medium text-gray-700]                     │   │
│           │                                                           │   │
│           │  ┌──────────────────────────────────┐  ┌────────────┐   │   │
│           │  │  [Choose file]  No file chosen   │  │  Upload    │   │   │
│           │  │  .txt files only, max 5MB        │  │ [sage-500] │   │   │
│           │  └──────────────────────────────────┘  └────────────┘   │   │
│           │                                                           │   │
│           │  Plain text files only (.txt), max 5 MB.                 │   │
│           │  [text-xs text-warm-gray]                                 │   │
│           └────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Layout Specs

| Element | Value |
|---|---|
| Max width | `max-w-3xl` |
| Manual item | `bg-gray-50 rounded-xl border border-gray-100 p-4` |
| Manual icon | `w-9 h-9 bg-sage-100 rounded-lg` with file SVG |
| File input | `file:bg-sage-100 file:text-sage-700 file:rounded-lg` |
| Upload btn | `bg-sage-500 text-white rounded-lg disabled:opacity-50` |

## States

| State | Visual |
|---|---|
| No manuals | Dashed border box, "No manuals uploaded yet." centered |
| File selected | Filename shown, Upload button enabled (sage-500) |
| Uploading | Button shows "Uploading…", disabled |
| Success | Flash banner: "House manual uploaded successfully." (sage-50 bg) |
| Error (wrong type) | Red inline error: "The manual must be a text file." |

## Interactions

- Upload → POST `/host/properties/{id}/manuals` (multipart/form-data)
- Delete → DELETE `/host/properties/{id}/manuals/{manualId}` with confirm dialog
- Redirect back to this same Show page after both actions
