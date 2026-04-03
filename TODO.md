# Claude Code To-Do List: Safe-Stay AI MVP

This is a step-by-step checklist based on `INSTRUCTIONS.md. we will do these batches one by one to keep focused and maintain code quality through TDD.

## Preparation Phase
- [ ] Read `INSTRUCTIONS.md` and `README.md` thoroughly.
- [ ] Note down the tech stack: Laravel + React + Inertia.js + Tailwind CSS.
- [ ] Understand the TDD requirement: write feature tests before every controller method.

---

## 🏃 Sprint 1 (April 1–14)

### Batch 1: Database Setup
- [ ] Create migration for `properties` table: `id, user_id (foreign key to users), name, address, description, timestamps`.
- [ ] Create migration for `house_manuals` table: `id, property_id (foreign key), content (text), filename, timestamps`.
- [ ] Create migration for `qa_logs` table: `id, property_id (foreign key), question, answer, timestamps`.
- [ ] Create migration for `maintenance_issues` table: `id, property_id (foreign key), description, status (enum/string: open/resolved), timestamps`.
- [ ] Ensure all respective Eloquent Models (`Property`, `HouseManual`, `QaLog`, `MaintenanceIssue`) are created with correct relationships and `$fillable` properties.
- [ ] Run tests and migrations.

### Batch 2: Authentication & Roles
- [ ] Configure or install Laravel Breeze (React with Inertia) if not already done.
- [ ] Add `role` column to the `users` table via a new migration (roles: `host`, `guest`, `admin`).
- [ ] Update registration logic to assign default roles.
- [ ] Create role-based middleware to restrict access to Host, Guest, and Admin routes.
- [ ] Write Feature tests covering role-based access control.

### Batch 3: Host Role - Property CRUD
- [ ] Create `PropertyController` and write feature tests for property creation, reading, updating, and listing.
- [ ] Implement `PropertyController` methods. Ensure strictly thin controllers!
- [ ] Build the `Host/Dashboard.jsx` React component using Inertia.
- [ ] Apply the specified minimal warm design system (Sage green #6B8F71, off-white #F5F0EB, etc.).

### Batch 4: House Manual Management
- [ ] Create `ManualService` to handle parsing and storing uploaded text manuals.
- [ ] Create `ManualController` with feature tests for uploading and storing manuals.
- [ ] Build React frontend component in Host Dashboard for linking and uploading manuals to Properties.

### Batch 5: Guest Portal Setup
- [ ] Implement a publicly accessible controller route for guests using a property-linked URL (e.g., `/property/{id}/portal`). No login required.
- [ ] Build the `Guest/Portal.jsx` React UI layout following the minimalist aesthetics.

---

## 🏃 Sprint 2 (April 15–25)

### Batch 6: AI Tooling Preparation
- [ ] Follow README.md to install Laravel Boost: `composer require laravel/boost --dev` and `php artisan boost:install`.
- [ ] Set up the `groq` configuration in `config/services.php`.

### Batch 7: Concierge Service (The AI Core)
- [ ] Create `ConciergeServiceTest` (Unit/Feature) checking mock AI interactions and prompt generation functionality.
- [ ] Create `ConciergeService` handling Groq/OpenAI API requests, mapping the user question alongside the `house_manual` text payload.
- [ ] Implement fallback conditions in the service ("I'm sorry, I don't have information about that...").
- [ ] Create `ConciergeController` that connects to the service and returns JSON/Inertia responses.

### Batch 8: Guest Q&A Chat UI
- [ ] Build the chat interface inside the `Guest/Portal.jsx`.
- [ ] Connect the Chat UI to the `ConciergeController`. Ensure logs are securely mapped and populated in the `qa_logs` database table.

### Batch 9: Maintenance Reporting (Guest Side)
- [ ] Create `MaintenanceServiceTest` and `MaintenanceService`.
- [ ] Build `MaintenanceController` for Guest submissions.
- [ ] Add a Maintenance reporting form in the `Guest/Portal.jsx` interface.

### Batch 10: Host & Maintenance View / Q&A Logs
- [ ] Update Host Dashboard to display a property's `qa_logs` entries.
- [ ] Update Host Dashboard to display `maintenance_issues` grouped by status (open/resolved).
- [ ] Add ability for Hosts to switch maintenance issues from "Open" to "Resolved".
- [ ] Final visual polish ensuring UI strictly complies with design guidelines (no heavy sidebars, correct fonts, rounded-xl cards).
