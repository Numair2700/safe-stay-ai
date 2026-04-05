# Wireframe 04 — Guest Portal (AI Chat Interface)

**Route:** `/property/{id}/portal`  
**Component:** `resources/js/Pages/Guest/Portal.jsx`  
**Access:** Public — no login required  
**Design:** No sidebar · GuestLayout · off-white bg · chat bubbles · sage send button

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCREEN: 1440 × 900                                                          │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  GUEST HEADER  [bg-white border-b shadow-sm]                            │ │
│ │                                                                         │ │
│ │  ┌────┐  Beach House                    [🔧 Report Issue]              │ │
│ │  │ 🏠 │  123 Ocean Drive, Miami, FL     [border sage-500 text-sage]    │ │
│ │  └────┘  [text-warm-gray text-sm]                                       │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  MAIN  [bg-cream min-h-screen]                                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ AI CONCIERGE CARD  [max-w-3xl mx-auto bg-white rounded-xl shadow]   │   │
│  │                                                                     │   │
│  │  CHAT HEADER                                                        │   │
│  │  ┌──────────────────────────────────────────────────────────────┐   │   │
│  │  │ ┌─────┐  AI Concierge                                        │   │   │
│  │  │ │ ✨  │  Ask me anything about Beach House                   │   │   │
│  │  │ │sage │  [text-xs text-warm-gray]                            │   │   │
│  │  │ └─────┘                                                      │   │   │
│  │  └──────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  CHAT MESSAGES  [h-96 overflow-y-auto p-4 flex flex-col gap-3]     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                              │   │   │
│  │  │  ┌─────────────────────────────────────┐                    │   │   │
│  │  │  │ [bg-sage-50 rounded-xl rounded-tl-sm│                    │   │   │
│  │  │  │  p-4 max-w-md text-sm]              │                    │   │   │
│  │  │  │                                     │                    │   │   │
│  │  │  │  Hi! I'm your AI concierge for      │                    │   │   │
│  │  │  │  Beach House. Ask me anything        │                    │   │   │
│  │  │  │  about your stay!                   │                    │   │   │
│  │  │  └─────────────────────────────────────┘                    │   │   │
│  │  │  [AI bubble — left aligned]                                  │   │   │
│  │  │                                                              │   │   │
│  │  │              ┌──────────────────────────────────────┐       │   │   │
│  │  │              │ [bg-sage-500 text-white rounded-xl   │       │   │   │
│  │  │              │  rounded-tr-sm p-4 max-w-md text-sm]│       │   │   │
│  │  │              │                                      │       │   │   │
│  │  │              │  What is the WiFi password?          │       │   │   │
│  │  │              └──────────────────────────────────────┘       │   │   │
│  │  │              [Guest bubble — right aligned]                  │   │   │
│  │  │                                                              │   │   │
│  │  │  ┌─────────────────────────────────────┐                    │   │   │
│  │  │  │ [bg-sage-50 rounded-xl p-4 max-w-md]│                    │   │   │
│  │  │  │                                     │                    │   │   │
│  │  │  │  The WiFi network is "BeachHouse5G" │                    │   │   │
│  │  │  │  and the password is "ocean2024".   │                    │   │   │
│  │  │  └─────────────────────────────────────┘                    │   │   │
│  │  │  [AI bubble — left aligned]                                  │   │   │
│  │  │                                                              │   │   │
│  │  │  ┌─────────────────────────────────────┐                    │   │   │
│  │  │  │ [animate-pulse skeleton]             │  ← AI Typing…     │   │   │
│  │  │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓             │                    │   │   │
│  │  │  └─────────────────────────────────────┘                    │   │   │
│  │  └──────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  INPUT BAR  [border-t p-4]                                          │   │
│  │  ┌──────────────────────────────────────────────────┐ ┌──────────┐ │   │
│  │  │  Ask about check-in, WiFi, house rules…          │ │  Send    │ │   │
│  │  │  [border rounded-xl px-4 py-3 text-sm]           │ │ [sage]   │ │   │
│  │  └──────────────────────────────────────────────────┘ └──────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Layout Specs

| Element | Value |
|---|---|
| Layout | `GuestLayout` — no sidebar, no auth |
| Chat container | `max-w-3xl mx-auto bg-white rounded-xl shadow-sm` |
| Chat scroll area | `h-96 overflow-y-auto flex flex-col gap-3 p-4` |
| AI bubble | `bg-sage-50 text-gray-800 rounded-xl rounded-tl-sm p-4 max-w-md` |
| Guest bubble | `bg-sage-500 text-white rounded-xl rounded-tr-sm p-4 max-w-md ml-auto` |
| Input | `border border-gray-200 rounded-xl px-4 py-3 text-sm flex-1` |
| Send button | `bg-sage-500 text-white rounded-xl px-5 py-3 hover:bg-sage-600` |
| Typing indicator | `animate-pulse` skeleton dots |

## States

| State | Visual |
|---|---|
| Initial | Welcome message from AI in first bubble |
| Typing (guest) | Input grows with text |
| Loading (AI) | Skeleton pulse bubble on left |
| AI response | New bubble animates in on left |
| Error / fallback | AI bubble: "I'm sorry, I don't have information about that. Please contact your host directly." |

## Interactions

- Send question → POST `/property/{id}/ask` → stream or return AI answer
- Answer stored in `qa_logs` table
- Enter key submits form
- "Report Issue" button → scrolls to / opens Maintenance Report (Screen 5)
- No login required — property ID in URL identifies the property
