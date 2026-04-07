# Safe-Stay AI Technical Report

## 1. Executive Summary

Safe-Stay AI is a Laravel + Inertia + React SaaS for short-stay property hosts. The intended MVP is:

- hosts manage properties and upload house manuals
- guests open a public property portal
- guests ask AI questions based on the manual
- guests report maintenance issues
- hosts review Q&A logs and maintenance items

The current codebase implements the foundation and early host/guest flows well, but the AI and maintenance parts are not built yet.

In practice, the product currently works as a:

- role-based host dashboard for property management
- house manual upload system for `.txt` files
- public guest portal shell for each property

It does **not** yet work as a full AI concierge SaaS.

## 2. What The Plan Said vs What Actually Happened

### Planned in `TODO.md`

`TODO.md` describes Batches 1 through 10, covering:

- database schema
- authentication and roles
- host property CRUD
- house manual upload
- guest portal
- AI concierge
- chat UI
- maintenance reporting
- host maintenance and Q&A views

Every checkbox in `TODO.md` is still unchecked, but the codebase shows that several of those items were completed anyway.

### Confirmed from Git history

The Git history shows a clear implementation sequence:

1. Laravel app scaffolded
2. core database tables and model tests added
3. auth with roles and middleware added
4. host property CRUD added
5. house manual upload and property detail page added
6. public guest portal page added

Recent commits stop at the guest portal milestone. There are no later commits for AI concierge, maintenance workflows, or admin management features.

## 3. Current Product State

### Working today

#### Authentication and role base

The app uses Laravel Breeze-style auth with registration, login, profile, password reset, and email verification flows already present in the repo.

Custom role support is also implemented:

- `users.role` exists with `host`, `guest`, and `admin`
- new users register as `host` by default
- `RoleMiddleware` blocks access when the current user's role does not match the route requirement

Current host routes are protected by:

- `auth`
- `verified`
- `role:host`

#### Host property management

Hosts can:

- view a dashboard of their own properties
- create a property
- edit a property
- delete a property
- open a property detail page

This is implemented through:

- `PropertyController`
- `PropertyService`
- `PropertyPolicy`
- Inertia pages under `resources/js/Pages/Host`

Authorization is handled correctly at the property level. A host cannot edit or delete another host's property.

#### House manual management

Hosts can upload a house manual to a property.

Current behavior:

- only text files are accepted
- max size is 5 MB
- uploaded content is read directly into the database
- filename is stored
- manuals can be deleted

This is implemented through:

- `ManualController`
- `ManualService`
- `StoreManualRequest`
- `house_manuals` table

Important detail: manuals are stored as database text content, not as files on disk.

#### Public guest portal

There is a public route:

`/property/{property}/portal`

Guests do not need to log in to view it.

The portal currently shows:

- property name
- address
- description
- whether manuals exist
- placeholder cards for AI concierge and maintenance reporting

So the guest portal exists visually, but its interactive business features are still placeholders.

### Not working yet

The following planned SaaS features are not implemented in the codebase:

- AI concierge service
- Groq or OpenAI integration
- concierge controller or chat submission endpoint
- Q&A logging flow
- maintenance issue submission
- host maintenance dashboard
- resolving maintenance issues
- host Q&A log viewer
- admin management area

The database tables for `qa_logs` and `maintenance_issues` exist, but no user-facing workflow currently writes to or reads from them.

## 4. Actual Architecture in the Code

### Backend structure

The application follows a simple Laravel monolith structure:

- controllers handle web requests
- service classes hold light business logic
- Eloquent models represent the main entities
- Inertia passes data to React pages

Implemented backend classes:

- `PropertyController`
- `ManualController`
- `PortalController`
- `PropertyService`
- `ManualService`
- `PropertyPolicy`
- `RoleMiddleware`

This means the project is partially following the intended "thin controllers + service layer" rule, but only for the completed property/manual areas.

### Frontend structure

The frontend is server-driven through Inertia:

- host dashboard page
- property create/edit/show pages
- guest portal page
- host layout with minimal warm visual design

The design direction from `INSTRUCTIONS.md` is mostly reflected:

- sage green palette
- off-white background
- rounded cards
- lightweight dashboard feel

### Data model

Implemented tables:

- `users`
- `properties`
- `house_manuals`
- `qa_logs`
- `maintenance_issues`

Implemented relationships:

- `User hasMany Property`
- `Property belongsTo User`
- `Property hasMany HouseManual`
- `Property hasMany QaLog`
- `Property hasMany MaintenanceIssue`
- each child model belongs to `Property`

This means the schema is ready for the remaining MVP work even though the workflows are not.

## 5. User Journeys That Exist Today

### Host journey

1. A user registers.
2. They are created as a `host`.
3. After login, they land in the host property area.
4. They can create a property.
5. They can open that property's detail page.
6. They can upload one or more text manuals.
7. They can delete manuals or edit the property later.

### Guest journey

1. Someone opens the public property portal URL.
2. They can view property details.
3. They can see that AI concierge and maintenance features are planned.
4. They cannot yet chat with AI or submit an issue.

## 6. Testing Status

The repo currently has automated test coverage for the completed areas.

On April 7, 2026, the current suite passed with:

- `69 passed`
- `229 assertions`

Covered areas include:

- auth registration behavior
- default host role assignment
- role middleware access control
- property CRUD behavior
- manual upload and deletion
- guest portal visibility and property/manual exposure rules
- model relationship tests

This is a good sign: the implemented scope is stable.

## 7. Important Gaps and Observations

### The app is ahead of the checklist

`TODO.md` makes it look like nothing is done because every item is unchecked. That is misleading. Based on the code and Git history, Batches 1 to 5 are largely implemented.

### The MVP is only partially finished

The original product vision depends on AI answers and maintenance handling. Those are still missing, so the app is currently more of a property/manual management prototype than a complete concierge SaaS.

### Some documentation is out of sync with the code

There are version and stack mismatches between the planning docs and the real project files:

- `INSTRUCTIONS.md` says `inertiajs/inertia-laravel` v3, but `composer.json` requires `^2.0`
- `INSTRUCTIONS.md` says Tailwind v4, but `package.json` also includes Tailwind v3-era setup
- `README.md` says Laravel 11 and OpenAI, while `composer.json` shows Laravel 13 and the implemented app has no AI integration yet

So the source of truth should be the codebase, not the planning docs.

### There is no real multi-tenancy isolation beyond ownership

The app behaves as a multi-tenant SaaS by ownership boundaries in the database and authorization rules, not by isolated databases or teams/workspaces. For the MVP, that is completely reasonable.

## 8. What The SaaS Has Right Now

If you want the simplest possible summary, the SaaS currently has:

- user authentication
- role field on users
- host-only property dashboard
- property create, edit, delete, and view
- text-based house manual upload per property
- public guest-facing property portal
- clean MVP UI for host and guest pages
- tested access control and ownership rules

It does **not** yet have:

- AI chat
- AI answer generation from manuals
- Q&A logs in use
- maintenance report submission
- issue resolution workflow
- admin dashboard or admin role tools

## 9. Recommended Next Build Steps

To complete the intended MVP, the most logical next order is:

1. build `ConciergeService`
2. add a guest chat submission endpoint
3. save every Q&A exchange into `qa_logs`
4. add guest maintenance submission
5. build host views for maintenance and Q&A history
6. decide whether admin functionality is actually required for MVP delivery

## 10. Bottom Line

Safe-Stay AI currently has a solid Laravel/Inertia foundation with working host property management and manual upload flows. The product has reached the point where hosts can prepare property data and guests can access a branded portal.

The main unfinished part is the thing that makes the product special: the AI concierge and maintenance workflow. Once those are added, the app will match the original SaaS idea much more closely.
