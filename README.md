# Shopping App

## Application Overview

This is a modern e-commerce web application built with React and Redux, featuring full support for internationalization (i18n) and accessibility (a11y). Users can browse products, search, add items to the cart, switch language (English/Serbian), change theme (light/dark), and perform login/logout. The app is ready for deployment on Azure Static Web Apps.

## Features

- Product catalog display
- Product detail view
- Add and remove products from cart
- View and edit cart
- Product search (with a11y support)
- Login form with validation
- Logout modal
- Language switcher (EN/SR) with selection saved in localStorage
- Theme switcher (light/dark)
- Accessibility: all texts and aria-labels are translated and screen reader friendly
- 404 Not Found page

## Used Libraries

- **React** – UI framework
- **Redux Toolkit** – global state (cart, theme, auth)
- **react-redux** – React/Redux integration
- **react-router-dom** – routing
- **react-i18next** – internationalization
- **i18next-browser-languagedetector** – automatic language persistence
- **react-hook-form** and **zod** – form validation
- **FontAwesome** – icons
- **Sass (SCSS)** – styling

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Deploy to Azure Static Web Apps

The app is hosted as an Azure Static Web App at:

**Live URL:** [https://orange-coast-0bdc52f1e.6.azurestaticapps.net/](https://orange-coast-0bdc52f1e.6.azurestaticapps.net/)

The app is ready for deployment on Azure Static Web Apps. Recommended build command:

```bash
npm run build
```

Then deploy the `dist/` folder to Azure Static Web Apps.

More info: [Azure Static Web Apps documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)

## Project Structure

- `src/components` – all UI components (Cart, Header, Footer, ProductCard, etc.)
- `src/pages` – pages (Products, ProductDetails, Cart, Login, NotFound)
- `src/locales` – translations for EN and SR
- `src/slices` – Redux slices
- `src/api` – API calls
- `src/hooks` – custom React hooks
- `src/styles` – global and modular SCSS

## API

The app uses [Fake Store API](https://fakestoreapi.com/) for product data.

## Notes

- All texts (visible and accessibility) are translated and centralized in i18n files.
- Language selection is saved in localStorage and automatically applied on every app load.
- Accessibility is a priority: all elements have appropriate aria-labels and screen reader support.
