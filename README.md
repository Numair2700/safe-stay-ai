# Safe-Stay AI
### SWE6011 Agile Programming — Assignment 2
**Student:** Numair Alsaleh (ID: 2529226)
**Submission Deadline:** 25 April 2026
**Institution:** Western International College London / University of Greater Manchester

---

## Project Overview

Safe-Stay AI is a multi-tenant Property Management SaaS that automates guest support and property maintenance through an AI-powered Digital Concierge. Hosts upload their property house manuals; guests ask questions and receive instant, property-specific AI responses. Maintenance issues are logged and tracked through the platform.

**Tech Stack:**
- Backend: Laravel 11 (PHP)
- Frontend: React + Inertia.js
- Database: MySQL
- AI: OpenAI API (GPT)
- Testing: PHPUnit (TDD) + Zephyr (Jira)
- CI: GitHub Actions
- Project Management: Jira (Scrum)
- Version Control: GitHub

---

## Agile Methodology

This project follows the **Scrum** framework with **Test-Driven Development (TDD)** and **Given-When-Then** acceptance testing. Each sprint concludes with a Heartbeat Retrospective.

### Sprint Plan

| Sprint | Dates | Goal | Key Deliverables |
|--------|-------|------|-----------------|
| Sprint 1 | 1 Apr – 14 Apr 2026 | Foundation & Core Auth | Auth, Property Setup, House Manual Upload |
| Sprint 2 | 15 Apr – 25 Apr 2026 | AI Concierge & Testing | Guest Q&A, Maintenance Reporting, Zephyr Tests, Risk Review |

---

## MVP Scope

**In Scope:**
- User authentication (Host, Guest, Admin roles)
- Property creation and management
- House manual upload and storage
- AI-powered guest Q&A (Digital Concierge)
- Maintenance issue reporting and tracking
- Host dashboard

**Out of Scope:**
- Payment processing
- Booking/calendar management
- Mobile application
- Multi-language support
- Third-party reservation platform integrations

---

## Repository Structure

```
safe-stay-ai/
├── app/                    # Laravel application logic
│   ├── Http/Controllers/
│   ├── Models/
│   └── Services/           # AI Concierge service
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── js/                 # React components (Inertia)
│   └── views/
├── tests/
│   ├── Unit/               # TDD unit tests
│   └── Feature/            # Feature/acceptance tests
├── artefacts/              # All Assignment 2 artefacts
│   ├── workflow-diagrams/
│   ├── backlog/
│   ├── sprint-screenshots/
│   ├── risk-log/
│   ├── ui-mockups/
│   ├── er-diagram/
│   └── zephyr-tests/
├── .github/
│   └── workflows/          # CI/CD (GitHub Actions)
├── .env.example
├── composer.json
└── README.md
```

---

## Artefacts Index (Assignment 2 Evidence)

All artefacts are stored in the `/artefacts` folder and referenced in the project report.

| Artefact | Location | Status |
|----------|----------|--------|
| Vision Statement | Report Section 2 | ✅ Done |
| Agile Justification | Report Section 1 | ✅ Done |
| Workflow Diagram (Host) | artefacts/workflow-diagrams/ | 🔄 In Progress |
| Workflow Diagram (Guest) | artefacts/workflow-diagrams/ | 🔄 In Progress |
| Product Backlog (Excel) | artefacts/backlog/ | ⬜ Pending |
| Jira Backlog Screenshot | artefacts/sprint-screenshots/ | ⬜ Pending |
| Sprint 1 Plan Screenshot | artefacts/sprint-screenshots/ | ⬜ Pending |
| Sprint 2 Plan Screenshot | artefacts/sprint-screenshots/ | ⬜ Pending |
| ER Diagram | artefacts/er-diagram/ | ⬜ Pending |
| UI Mockups | artefacts/ui-mockups/ | ⬜ Pending |
| Risk Log (RMMM) | artefacts/risk-log/ | ⬜ Pending |
| Sprint 1 Review Notes | artefacts/sprint-screenshots/ | ⬜ Pending |
| Sprint 1 Retrospective | artefacts/sprint-screenshots/ | ⬜ Pending |
| Zephyr Test Screenshots | artefacts/zephyr-tests/ | ⬜ Pending |
| Burndown Chart | artefacts/sprint-screenshots/ | ⬜ Pending |
| Working App Screenshots | artefacts/sprint-screenshots/ | ⬜ Pending |

---

## Key Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| AI hallucinations (OpenAI returns inaccurate property responses) | Medium | High | Prompt engineering, response validation, fallback messages |
| Time constraint (25-day delivery window) | High | High | Strict MVP scope, 2-sprint plan, daily progress tracking |
| OpenAI API rate limits or costs | Low | Medium | Cache frequent responses, mock API in tests |
| Laravel/React integration issues | Low | Medium | TDD catches early, CI runs on every push |

---

## How to Run Locally

> Setup instructions will be added during Sprint 1.

```bash
# Clone repository
git clone https://github.com/[your-username]/safe-stay-ai.git
cd safe-stay-ai

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database
php artisan migrate --seed

# Start development server
php artisan serve
npm run dev
```

---

## Testing

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage
```

Test cases are also documented in **Zephyr (Jira)** with step-by-step execution records per sprint.

---

## Module Information

- **Module:** SWE6011 Agile Programming
- **Tutor:** Renuka Nyayadhish
- **Framework Used:** Scrum
- **Jira Project:** Safe-Stay AI (Scrum board)
- **GitHub Repo:** [To be linked]

---

## AI Usage Declaration

In accordance with the module's Category B AI policy, Generative AI tools were used to assist with:
- Generating initial project ideas
- Exploring risk management strategies
- Evaluating hardware/software requirements

All final content, code, and analysis represent the student's own work and understanding, verified during the demo/viva session.

---

*Last updated: 31 March 2026*
