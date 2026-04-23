# Safe-Stay AI
### SWE6011 Agile Programming — Assignment 2
**Student:** Numair Alsaleh (ID: 2529226)
**Submission Deadline:** 25 April 2026
**Institution:** Western International College London / University of Greater Manchester

---

## ⭐ FINAL SUBMISSION

> **The final report (Word document) is in the [`FINAL_SUBMISSION/`](FINAL_SUBMISSION/) folder.**
> File: `SWE6011_A2_2529226_Numair_Alsaleh_FINAL_SUBMISSION.docx`

---

## Project Overview

Safe-Stay AI is a multi-tenant Property Management SaaS that automates guest support and property maintenance through an AI-powered Digital Concierge. Hosts upload their property house manuals; guests ask questions and receive instant, property-specific AI responses. Maintenance issues are logged and tracked through the platform.

**Tech Stack:**
- Backend: Laravel 13 (PHP 8.4)
- Frontend: React 19 + Inertia.js v3
- Database: MySQL
- AI: Groq API (mixtral-8x7b-32768)
- Testing: PHPUnit v12 (TDD) + Zephyr (Jira)
- CI: GitHub Actions
- Project Management: Jira (Scrum)
- Version Control: GitHub

---

## Agile Methodology

This project follows the **Scrum** framework with **Test-Driven Development (TDD)** and **Given-When-Then** acceptance testing. Each sprint concludes with a Heartbeat Retrospective.

### Sprint Plan

| Sprint | Dates | Goal | Key Deliverables |
|--------|-------|------|-----------------|
| Sprint 1 | 1 Apr – 14 Apr 2026 | Foundation & Core Auth | Auth, Role Middleware, Property CRUD, House Manual Upload, Guest Portal |
| Sprint 2 | 15 Apr – 25 Apr 2026 | AI Concierge & Maintenance | Groq AI Concierge, Guest Q&A Chat UI, Maintenance Reporting, Host Maintenance & Q&A Views, Admin Role Management |

---

## MVP Scope

**In Scope:**
- User authentication (Host, Guest, Admin roles)
- Property creation and management
- House manual upload and storage
- AI-powered guest Q&A (Digital Concierge via Groq)
- Maintenance issue reporting and tracking
- Host dashboard with maintenance and Q&A log views
- Admin user role management

**Out of Scope:**
- Payment processing
- Booking/calendar management
- Mobile application
- Multi-language support
- Third-party reservation platform integrations
- Admin UI (admin role management is backend/API only)

---

## Repository Structure

```
safe-stay-ai/
├── app/
│   ├── Http/Controllers/
│   │   ├── Admin/          # Admin user management
│   │   ├── Guest/          # Guest portal, concierge, maintenance
│   │   └── Host/           # Host property, manual, maintenance, Q&A
│   ├── Models/
│   └── Services/           # ConciergeService, PropertyService, ManualService, UserService
├── database/
│   ├── migrations/
│   └── factories/
├── resources/
│   └── js/
│       ├── Layouts/        # HostLayout
│       └── Pages/
│           ├── Admin/      # Admin user management UI
│           ├── Guest/      # Guest portal
│           └── Host/       # Host dashboard, properties, maintenance, Q&A logs
├── tests/
│   ├── Unit/
│   └── Feature/
│       ├── Admin/
│       ├── Guest/
│       └── Host/
├── FINAL_SUBMISSION/       # ⭐ FINAL REPORT (Word document)
├── artefacts/              # All Assignment 2 artefacts
│   ├── backlog/
│   ├── burndown-charts/
│   ├── dev-progress/
│   ├── sprint-screenshots/
│   └── zephyr-tests/
└── .github/
    └── workflows/          # CI/CD (GitHub Actions)
```

---

## Artefacts Index

All artefacts are stored in the `/artefacts` folder.

| Artefact | Location | Status |
|----------|----------|--------|
| Product Backlog (Excel) | artefacts/backlog/ | ✅ Done |
| Risk Log (after Sprint 1 & 2) | artefacts/backlog/ | ✅ Done |
| Burndown Charts (Sprint 1 & 2) | artefacts/burndown-charts/ | ✅ Done |
| ER Diagram | artefacts/er-diagram/ | ✅ Done |
| UI Mockups | artefacts/ui-mockups/ | ✅ Done |
| Workflow Diagrams | artefacts/workflow-diagrams/ | ✅ Done |
| Sprint 1 Screenshots | artefacts/sprint-screenshots/Sprint1/ | ✅ Done |
| Sprint 2 Screenshots | artefacts/sprint-screenshots/Sprint2/ | ✅ Done |
| UI Screenshots (Batches 8–10) | artefacts/dev-progress/UI/ | ✅ Done |
| Test Results Screenshots | artefacts/dev-progress/tests/ | ✅ Done |
| CI/GitHub Actions Screenshots | artefacts/dev-progress/github/ | ✅ Done |
| Zephyr Cycle 1 Evidence | artefacts/zephyr-tests/cycle1/ | ✅ Done |
| Zephyr Cycle 2 Evidence | artefacts/zephyr-tests/cycle2/ | ✅ Done |

---

## Test Coverage

The full test suite covers all implemented features across both sprints.

```bash
# Run all tests
php artisan test --compact

# Run a specific test file
php artisan test --compact tests/Feature/Host/PropertyControllerTest.php
```

| Area | Tests |
|------|-------|
| Auth & Registration | ✅ |
| Role Middleware | ✅ |
| Property CRUD | ✅ |
| House Manual Upload | ✅ |
| Guest Portal | ✅ |
| AI Concierge (Groq) | ✅ |
| Guest Maintenance Submission | ✅ |
| Host Maintenance View & Resolve | ✅ |
| Host Q&A Log View | ✅ |
| Admin User Management | ✅ |

Test cases are also documented in **Zephyr (Jira)** with step-by-step execution records for both sprints.

---

## How to Run Locally

```bash
# Clone repository
git clone https://github.com/Numair2700/safe-stay-ai.git
cd safe-stay-ai

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database
php artisan migrate

# Build frontend assets
npm run build

# Start development server
php artisan serve
```

---

## Key Risks

| # | Risk Description | Probability | Impact | Mitigation |
|---|-----------------|------------|--------|------------|
| R1 | AI hallucinations — model returns inaccurate property-specific answers | Low | High | Prompt engineering to constrain responses to manual content only; fallback message if answer not found; tested every sprint |
| R2 | Time constraint — 25-day delivery window with no prior code written | Low | High | Strict MVP scope; 2-sprint plan; daily progress tracking; no scope creep permitted |
| R3 | OpenAI API cost or rate limits during development | Very Low | Medium | Use Groq free tier during development; mock API responses in PHPUnit tests; switch to real API for demo only |
| R4 | Laravel/React/Inertia integration issues causing delays | Very Low | Medium | TDD catches integration errors early; GitHub Actions CI runs full test suite on every commit |
| R5 | Loss of artefact evidence (screenshots, Jira data) | Very Low | High | All screenshots committed to GitHub artefacts folder immediately after capture; never rely on Jira alone |

---

## Module Information

- **Module:** SWE6011 Agile Programming
- **Tutor:** Renuka Nyayadhish
- **Framework:** Scrum
- **Jira Project:** Safe-Stay AI (Scrum board)
- **GitHub Repo:** https://github.com/Numair2700/safe-stay-ai

---

## AI Usage Declaration

In accordance with the module's Category B AI policy, Generative AI tools were used to assist with:
- Generating initial project ideas
- Exploring risk management strategies
- Code scaffolding and debugging assistance

All final content, code, and analysis represent the student's own work and understanding, verified during the demo/viva session.

---

*Last updated: 23 April 2026*
