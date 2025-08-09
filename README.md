# Michael Olaoye — Portfolio

A fast, accessible, static portfolio to highlight computer science and game development projects.

## Structure
- `portfolio/index.html`: Main page
- `portfolio/styles.css`: Styles
- `portfolio/script.js`: Interactivity and project data

## How to run locally
No build is required.

- Option 1: Open `portfolio/index.html` in your browser.
- Option 2: Serve the folder on a local server:

```bash
cd /workspace/portfolio
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## Edit projects
Update the `projects` array in `portfolio/script.js`. Each project has:

```js
{
  id: 'unique-id',
  title: 'Project Title',
  description: 'Short description',
  tags: ['Tag1', 'Tag2'],
  year: 2025,
  link: 'https://example.com',
  image: 'https://images.unsplash.com/...'
}
```

## Customize content
- Change headings and text in `index.html` under the relevant sections (`About`, `Skills`, `Contact`).
- Add/remove skills in the `Skills` list in `index.html`.
- Replace external image URLs with your own images (local files in an `assets/` folder or hosted images).

## Deploy
- GitHub Pages: push this repo and set Pages to serve the `portfolio/` folder.
- Netlify/Vercel: drag-and-drop the `portfolio/` folder, or set it as the publish directory.

## License
MIT