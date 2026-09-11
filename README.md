# Supply Catalog

React implementation of the frontend live coding challenge: a category catalog backed by a mocked REST API.

## Requirements

| Assignment | Implementation |
| --- | --- |
| Mock an API from `data.json` | Vite middleware serves `GET` / `PATCH` `/api/categories` from the seed file |
| Category list page | `/` loads the collection and renders cards |
| Search by `pageTitle` | Text input filters the list (case-insensitive) |
| Filter active objects | Checkbox keeps only `isActive: true` |
| Toggle `isActive` + server call | Switch sends `PATCH /api/categories/:id` with `{ isActive }` |
| Detail route per object | `/categories/:id` loads one record |

Three extra catalog nodes were added so search and filters have more to work with.

## API

The UI never imports `data.json` directly. It talks to a session-scoped mock:

```http
GET    /api/categories
GET    /api/categories/:id
PATCH  /api/categories/:id
Content-Type: application/json

{ "isActive": true }
```

`PATCH` is used because only one field changes. The mock returns the updated resource so the client can stay in sync. A real backend would persist the same payload to a database.

Toggles update the UI immediately and roll back if the request fails.

## Run

```bash
npm install
npm run dev
```

Open the printed local URL, search, filter, toggle status, and click a card for its detail page.
