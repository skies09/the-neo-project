# NEO Project (neo-project)

Front-end web app for dog adoption, breed discovery, kennel partners, a merchandise shop, and supporting content (blog, FAQ, contact). It talks to a separate backend API and is built with **React 18**, **TypeScript**, and **Create React App**.

## Prerequisites

- **Node.js** (LTS recommended)
- **npm** (comes with Node)

## Setup

1. Clone the repository and open the app directory:

   ```bash
   cd neo-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables (see [Environment variables](#environment-variables)).

4. Start the dev server:

   ```bash
   npm start
   ```

   The app runs at [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env` and set values as needed:

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_NEO_PROJECT_BASE_URL` | Yes (for API features) | Backend API origin, e.g. `https://api.example.com/` (trailing slash is recommended). |
| `REACT_APP_LOCAL` | No | Optional absolute origin for static/media URLs (e.g. CDN) used in some dog imagery. |

Create React App only exposes variables prefixed with `REACT_APP_`. Restart the dev server after changing `.env`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server with hot reload. |
| `npm run build` | Production build output in `build/`. |
| `npm test` | Jest test runner (interactive watch mode by default). |
| `npm run eject` | Irreversibly ejects from CRA’s single dependency — only if you need full control of webpack/Babel. |

## Tech stack

- **UI:** React 18, TypeScript, Tailwind CSS, Framer Motion, Font Awesome
- **Data & forms:** Redux Toolkit, Redux Thunk, Formik, Yup
- **HTTP:** Axios with token refresh (`axios-auth-refresh`) for kennel auth
- **Routing:** React Router v6 with lazy-loaded routes and protected kennel areas

## Main routes (overview)

| Path | Area |
|------|------|
| `/` | Home |
| `/all-dogs`, `/adopt` | Adoption listings and adoption calculator |
| `/breed-calculator`, `/breeds`, `/breeds/:breedSlug` | Breed tools and breed detail |
| `/blog`, `/blog/:id` | Blog |
| `/shop`, `/shop/products/:id`, `/shop/cart`, `/shop/checkout` | Shop |
| `/kennel-account`, `/kennel-admin`, `/kennel-partnership`, `/password-reset` | Kennel partner flows |
| `/contact`, `/faq`, `/donate`, `/support` | Site pages |

## Deployment

Production builds are static files in `build/`. The repo includes **Firebase Hosting** config (`firebase.json`) with SPA rewrites so client-side routes work in production. Deploy the `build` folder according to your hosting setup.

## Tests

Unit tests live next to source (e.g. `*.test.ts`). Run `npm test`.

## Learn more

- [Create React App documentation](https://create-react-app.dev/docs/getting-started/)
- [React documentation](https://react.dev/)
