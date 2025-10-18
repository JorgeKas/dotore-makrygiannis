# CardioCenter – static first page

A lightweight, framework-free landing page for a cardiology clinic. Built with semantic HTML, modern CSS, and a tiny vanilla JS file.

## Structure

- `index.html` – main landing page
- `assets/css/style.css` – styles with CSS variables for easy theming
- `assets/js/main.js` – mobile nav, hero slider, testimonial rotator
- `assets/img/*` – SVG icons, logo, and placeholders (no third-party assets)

## How to run (Windows/Apache)

If Apache is installed at `C:\Apache24` (default on Windows), this folder is already under `htdocs`. Open:

- http://localhost/Dotore/Dotore-medicenter/

Alternatively, open `index.html` directly in a browser.

## Theming

Adjust colors or fonts in `:root` inside `assets/css/style.css`:

- `--brand-primary`, `--brand-primary-700`, `--brand-accent`, `--muted`, etc.
- `--ff-headings`, `--ff-body` for font families (Google Fonts are preloaded)

## Notes

- No CSS/JS frameworks used.
- All code and SVGs are original. Imagery uses placeholders.
- Layout covers: topbar, sticky header/nav, hero slider with CTA, services grid, appointment strip, about/doctor, opening hours, testimonials, blog preview, and footer columns.
