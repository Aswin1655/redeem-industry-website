# Redeem Industry Website

Responsive company website for Redeem Industry, a manufacturer of biodegradable packaging and disposable products.

## Features (v2)
- Filterable, searchable product catalog (category chips, live search, sizes, custom-print info)
- Production process timeline: enquiry, sample, production, testing, delivery
- Enquiry form saves leads in the browser; `leads.html` lists them and exports CSV
- Request-a-quote button on each product pre-selects it in the form

## Features
- Product showcase generated from a JavaScript data list
- Services section
- Plastic-savings calculator (items, plastic weight, and CO2 avoided per year)
- Quote request form with validation
- Responsive layout, keyboard focus styles, reduced-motion support

## Tech
HTML5, CSS3, vanilla JavaScript. No build step.

## Run locally
Open `index.html` in a browser.

## Deploy on GitHub Pages
Repository Settings > Pages > Deploy from branch > `main` / root.

## Notes
The calculator uses assumed averages (5 g plastic per item, 6 kg CO2 per kg plastic) and gives estimates only. Leads are stored in the browser's localStorage for demo purposes; a production version would send them to a backend or email service.
