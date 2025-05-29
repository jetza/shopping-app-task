# Shopping App

## Application Overview

This is a modern e-commerce web application built with React and Redux, featuring full support for internationalization (i18n) and accessibility (a11y). Users can browse products, search, add items to the cart, switch language (English/Serbian), change theme (light/dark), and perform login/logout. The app is ready for deployment on Azure Static Web Apps.

---

**Bundler/Dev Server:**

- **Vite** is used as the build tool and development server for this project. Vite provides extremely fast startup and hot module replacement (HMR) for a smooth development experience. It also optimizes and bundles the app for production, resulting in fast load times and efficient builds.

---

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
- **Live product search modal** with React Query (shows results after 3+ characters, live filtering, loading/error states, i18n, and a11y)
- **Responsive category/product grid** (no carousel, modern grid layout)
- **Redux-powered cart actions** (add, remove, increase, decrease, clear)
- **Custom Toast notifications** (animated, no external libs):
  - Green for add to cart
  - Red for remove from cart (minus or remove button)
  - Orange for info (e.g. cart cleared, security code sent)
- **Toasts are fully internationalized** (i18n)
- **Toasts work everywhere** (Products, Product Details, Category, Cart, User Settings)
- **User Settings**:
  - Change password with security code (shows orange toast when code is sent)
  - Add credit card (with validation)
- **All unused code, classes, and translations cleaned up**

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
- **@tanstack/react-query** – data fetching and caching

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

## Chatbot Assistant (AI)

A built-in AI chatbot assistant is available in the app. The chatbot was created in Microsoft Copilot Studio and then embedded directly into the code as a modal panel.

You can open the chatbot by clicking the robot icon in the footer. The chatbot opens as a modal panel and can answer questions about products, categories, and how to use the site (in both English and Serbian). It is embedded via Microsoft Copilot Studio and supports:

- Product and category Q&A
- Help with using the cart, search, language/theme switch, and user settings
- General information about the store

**How to use:**

- Click the robot icon in the footer (bottom right)
- The chatbot will open as a sidebar/modal
- You can close it by clicking the X or pressing Escape

The chatbot uses the latest product data and help documentation as its knowledge base.
