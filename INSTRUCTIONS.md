# INSTRUCTIONS.md — Safe-Stay AI

## Project Overview

Safe-Stay AI is a multi-tenant Property Management SaaS. Hosts upload property house manuals. Guests ask questions and receive instant AI-generated answers based on those manuals. Hosts can also view and manage maintenance reports submitted by guests.

This is an MVP — scope is strictly limited to what is described here. Do not add features not listed.

---

## Tech Stack

- **Backend:** Laravel (PHP) — routing, controllers, models, migrations, services
- **Frontend:** React with Inertia.js — no full SPA routing, Inertia handles page transitions
- **Styling:** Tailwind CSS
- **Database:** MySQL
- **AI:** Groq API (primary) or OpenAI API — for Digital Concierge responses
- **Testing:** PHPUnit — TDD, write tests before implementation
- **Build tool:** Vite
- **Version control:** Git + GitHub
- **Local server:** Laravel Herd

---

## Architecture

### Pattern
Modern monolith. Laravel handles all backend logic. React components are served via Inertia. No separate API — Inertia passes props directly from controllers to React pages.

### Folder structure
```
app/
  Http/
    Controllers/
      Auth/
      Host/
      Guest/
      Admin/
  Models/
  Services/
    ConciergeService.php      ← handles Groq/OpenAI API calls
    ManualService.php         ← handles house manual parsing and storage
    MaintenanceService.php    ← handles maintenance issue logic
resources/
  js/
    Pages/
      Auth/
      Host/
      Guest/
      Admin/
    Components/
      ui/                     ← reusable UI components
    Layouts/
      HostLayout.jsx
      GuestLayout.jsx
tests/
  Unit/
  Feature/
```

### Service layer rule
Controllers must be thin. All business logic goes in Service classes. Controllers call services, services return data, controllers pass to Inertia.

---

## User Roles

| Role | Description |
|---|---|
| Host | Creates properties, uploads house manuals, views Q&A logs, manages maintenance reports |
| Guest | Accesses property portal via link, asks questions, reports maintenance issues |
| Admin | Manages all users and roles |

---

## Database Schema

### Tables
- `users` — id, name, email, password, role (host/guest/admin), timestamps
- `properties` — id, user_id (host), name, address, description, timestamps
- `house_manuals` — id, property_id, content (text), filename, timestamps
- `qa_logs` — id, property_id, question, answer, timestamps
- `maintenance_issues` — id, property_id, description, status (open/resolved), timestamps

---

## Features — MVP Scope

### Epic 1: Authentication & User Management
- Host registration and login
- Guest portal access via property-specific link (no login required)
- Admin role management
- Role-based middleware

### Epic 2: Property & Manual Management
- Host creates, edits, views properties
- Host uploads house manual (text content stored in DB)
- Manual linked to property

### Epic 3: AI Digital Concierge
- Guest types question into chat interface
- System sends question + manual content to Groq/OpenAI API
- AI response returned and displayed
- Response constrained to manual content only — no general knowledge
- Fallback message if answer not found in manual
- Q&A log saved to database
- Host can view Q&A log per property

### Epic 4: Maintenance & Reporting
- Guest submits maintenance issue via form
- Issue saved to DB linked to property
- Host views open maintenance reports
- Host marks issue as resolved
- Host views resolved issue history

---

## Design Direction

Reference: warm minimal SaaS dashboard (property management aesthetic)

- **Colour palette:** off-white background (#F5F0EB), sage green primary (#6B8F71), warm gray (#8C8377), white cards
- **Typography:** clean sans-serif, generous line height
- **Layout:** icon-only sidebar, card-based content area, breadcrumb navigation
- **Cards:** soft shadows, rounded corners (rounded-xl), subtle borders
- **Buttons:** sage green primary, white secondary with border
- **Tables:** clean, alternating row colours, no heavy borders
- **Forms:** generous padding, clear labels above inputs, inline validation

Do NOT use: generic blue/purple SaaS colour schemes, heavy dark sidebars, dense information layouts.

---

## Development Rules

### TDD — always write tests first
1. Write a failing test (red)
2. Write minimum code to pass (green)
3. Refactor (refactor)

Every controller method must have a corresponding feature test.

### Given-When-Then format for acceptance tests
```php
// Given a host is logged in
// When they upload a house manual
// Then the system stores it and returns success
```

### Naming conventions
- Controllers: `PropertyController`, `ManualController`, `ConciergeController`
- Services: `ConciergeService`, `ManualService`, `MaintenanceService`
- React pages: PascalCase, match controller name — `Host/Dashboard.jsx`, `Guest/Portal.jsx`
- Tests: `PropertyControllerTest`, `ConciergeServiceTest`

### Inertia responses
Always return Inertia responses from controllers:
```php
return Inertia::render('Host/Dashboard', [
    'properties' => $properties
]);
```

### AI integration rules
- Always use `ConciergeService` — never call Groq/OpenAI directly from a controller
- Prompt must include: system instruction to answer only from the manual, the manual content, and the guest question
- Always include a fallback if the AI cannot find the answer in the manual
- Log every Q&A exchange to the `qa_logs` table

### Error handling
- Use Laravel's built-in exception handler
- Return user-friendly error messages via Inertia flash messages
- Never expose stack traces to the frontend

---

## API Integration

### Groq API (preferred — free)
```php
// config/services.php
'groq' => [
    'key' => env('GROQ_API_KEY'),
    'model' => 'llama3-8b-8192',
    'base_url' => 'https://api.groq.com/openai/v1',
]
```

### Prompt template for Digital Concierge
```
You are a helpful assistant for a property called {property_name}.
Answer questions ONLY based on the house manual provided below.
If the answer is not in the manual, say: "I'm sorry, I don't have information about that. Please contact your host directly."

House Manual:
{manual_content}

Guest Question:
{question}
```

---

## Out of Scope

Do NOT build:
- Payment processing
- Booking or calendar management
- Email notifications
- Mobile app
- Analytics dashboards
- Multi-language support
- Third-party reservation platform integrations

---

## Testing Requirements

- Every user story must have at least one feature test
- Use `RefreshDatabase` trait in all feature tests
- Test both happy path and error cases
- Zephyr test cases mirror PHPUnit tests — one Zephyr test case per user story

---
## Git Workflow

- One commit per completed feature or subtask
- Commit message format: "feat: description" for features, "test: description" for tests, "fix: description" for fixes
- Always run php artisan test before committing
- Push to main branch after every commit

## Sprint Plan

### Sprint 1 (1–14 April) — build in this order:
1. Database migrations (properties, house_manuals, qa_logs, maintenance_issues)
2. Authentication — register, login, logout, roles
3. Property CRUD — create, edit, view all
4. House manual upload and storage
5. Host dashboard UI
6. Guest portal UI

### Sprint 2 (15–25 April) — build in this order:
1. Groq API integration and ConciergeService
2. Guest Q&A chat interface
3. Maintenance issue reporting — guest side
4. Host maintenance view — list, resolve, history
5. Q&A log for host

## Running Tests

After every task run:
php artisan test

All tests must pass before committing.

## Deadline

25 April 2026. MVP only. Ship working software over perfect software.
