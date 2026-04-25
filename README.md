# VueTube

VueTube is a YouTube-inspired video browsing platform built using React, Vite, and Tailwind CSS. It provides a smooth and modern user experience with features like video search, category-based navigation, subscriptions view, dark mode, settings modal, help modal, and infinite scroll. The project is designed with reusable components and clean architecture to make development scalable and easy to manage.

## Tech Stack

React 19
Vite
Tailwind CSS
JavaScript
Material Symbols
YouTube Data API

React is used for building the user interface, Vite provides fast development and build performance, and Tailwind CSS helps create a responsive and premium design system. The YouTube Data API is used to fetch videos dynamically.

## Project Structure

```bash
VueTube/
│
├── public/                     # Static assets served directly
│
├── src/                        # Main source code
│   │
│   ├── assets/                 # Images, icons, logos
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Header.jsx          # Search bar and profile actions
│   │   ├── Sidebar.jsx         # Navigation categories and dashboard links
│   │   ├── CategoryChips.jsx   # Horizontal category filter tags
│   │   ├── VideoCard.jsx       # Video thumbnail, title, and channel info
│   │   ├── SubscriptionsView.jsx # Shorts and subscriptions page
│   │   ├── SettingsModal.jsx   # Dark mode, name, and email settings
│   │   ├── HelpModal.jsx       # FAQ and help popup
│   │   └── VideoModal.jsx      # Video player popup
│   │
│   ├── App.jsx                 # Main controller handling state and logic
│   ├── App.css                 # App-specific styling
│   ├── index.css               # Global styles and Tailwind setup
│   │
│   └── main.jsx                # Application entry point
│
├── .env                        # Private API keys
├── .env.example                # Example environment variables
├── index.html                  # Main HTML entry file
├── package.json                # Dependencies and npm scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind design system
├── eslint.config.js            # Code quality and linting rules
└── README.md                   # Project documentation
```

The src folder contains the complete application logic. App.jsx acts as the main controller where global state, API handling, dark mode, search logic, and modal management are controlled. main.jsx is the entry point where React starts and renders the App component. index.css handles global styles and Tailwind initialization, while App.css contains specific styling adjustments for the main layout.

The components folder contains reusable UI sections. Header.jsx manages the search bar and profile actions, Sidebar.jsx handles navigation between categories, and CategoryChips.jsx provides quick filtering options. VideoCard.jsx displays video thumbnails and channel details. SubscriptionsView.jsx manages the subscriptions page with Shorts and regular videos. SettingsModal.jsx allows users to change dark mode, name, and email preferences, while HelpModal.jsx provides FAQs and guidance. VideoModal.jsx handles popup video playback.

Each component is separated properly to keep the project modular, scalable, and easy to maintain.

## How Buttons Work

Buttons in VueTube are created using standard HTML button tags inside React components and are directly connected to the application state managed in App.jsx.

For example, when a user clicks a category button inside Sidebar.jsx, the onClick event calls a function passed from App.jsx such as onSelectCategory. This updates the activeCategory state, and React automatically re-renders the UI to show the correct video feed.

The same logic is used for dark mode. When the dark mode button is clicked inside SettingsModal.jsx, it triggers the toggleDarkMode function from App.jsx, which updates the dark mode state and applies the dark theme across the entire application.

Tailwind CSS classes are used for hover effects, click animations, active states, and dark mode styling to create a smooth and premium user experience.

## Run Project

Install dependencies and start the development server using:

npm install
npm run dev

This starts the project locally and allows real-time updates during development.

## Build Project

To create an optimized production build, run:

npm run build

This prepares the project for deployment.

## Summary

VueTube follows clean React architecture with reusable components, centralized state management, and Tailwind-based UI design. It combines functionality, responsiveness, and maintainability to create a professional frontend project that feels like a real-world video platform instead of just a simple clone.
