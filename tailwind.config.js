/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "secondary-fixed-dim": "#b4c8e2",
        "primary-container": "#42b883",
        "error-container": "#ffdad6",
        "on-surface-variant": "#3d4a42",
        "secondary": "#4c6076",
        "tertiary": "#505f76",
        "surface-container-low": "#f3f3f3",
        "tertiary-fixed-dim": "#b7c8e1",
        "on-secondary": "#ffffff",
        "on-surface": "#1a1c1c",
        "primary-fixed": "#86f9be",
        "on-secondary-fixed-variant": "#34485d",
        "on-error-container": "#93000a",
        "on-primary-fixed-variant": "#005234",
        "surface-tint": "#006c47",
        "tertiary-container": "#95a5be",
        "on-primary-container": "#00432a",
        "on-secondary-container": "#52667c",
        "on-secondary-fixed": "#061d30",
        "primary-fixed-dim": "#69dca4",
        "on-error": "#ffffff",
        "surface-dim": "#dadada",
        "inverse-primary": "#69dca4",
        "inverse-surface": "#2f3131",
        "on-background": "#1a1c1c",
        "outline-variant": "#bdcabf",
        "on-primary": "#ffffff",
        "surface-container-high": "#e8e8e8",
        "surface": "#f9f9f9",
        "on-tertiary-container": "#2b3b50",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "inverse-on-surface": "#f1f1f1",
        "background": "#f9f9f9",
        "surface-variant": "#e2e2e2",
        "on-primary-fixed": "#002112",
        "tertiary-fixed": "#d3e4fe",
        "secondary-fixed": "#cfe5ff",
        "on-tertiary-fixed-variant": "#38485d",
        "secondary-container": "#cfe5ff",
        "surface-container": "#eeeeee",
        "surface-container-highest": "#e2e2e2",
        "error": "#ba1a1a",
        "primary": "#006c47",
        "outline": "#6d7a71",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#0b1c30"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "md": "24px",
        "max_content_width": "1600px",
        "sidebar_width": "260px",
        "sm": "16px",
        "base": "4px",
        "xs": "8px",
        "xl": "48px",
        "lg": "32px"
      },
      "fontFamily": {
        "body-md": ["Inter"],
        "display-lg": ["Inter"],
        "label-sm": ["Inter"],
        "headline-md": ["Inter"],
        "title-sm": ["Inter"]
      },
      "fontSize": {
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "display-lg": ["48px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-sm": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "title-sm": ["18px", {"lineHeight": "1.4", "fontWeight": "600"}]
      }
    }
  },
  plugins: [],
}
